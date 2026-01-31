#!/bin/bash
set -euxo pipefail

REPO_HTTPS="${repo_https}"
API_PORT="${api_port}"
APP_ROOT="${app_root}"
AWS_REGION="${aws_region}"

API_DOMAIN="${api_domain}"
CERTBOT_EMAIL="${certbot_email}"

API_DIR="$APP_ROOT/api"

export DEBIAN_FRONTEND=noninteractive

apt-get update -y
apt-get install -y git nginx awscli jq curl snapd

# Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install Certbot (snap)
snap install core
snap refresh core
snap install --classic certbot
ln -sf /snap/bin/certbot /usr/bin/certbot

# Clone repo fresh
rm -rf "$APP_ROOT"
git clone "$REPO_HTTPS" "$APP_ROOT"

# Install API deps
cd "$API_DIR"
npm install

# Write env file from SSM
mkdir -p /etc/convomundo

MONGODB_URI="$(aws ssm get-parameter \
  --name "/convomundo/prod/MONGODB_URI" \
  --with-decryption \
  --region "$AWS_REGION" \
  --query "Parameter.Value" \
  --output text)"

cat >/etc/convomundo/api.env <<EOF
MONGODB_URI=$MONGODB_URI
PORT=$API_PORT
NODE_ENV=production
EOF

chmod 600 /etc/convomundo/api.env
chown root:root /etc/convomundo/api.env

# systemd service for API
cat >/etc/systemd/system/infinite-convo-api.service <<EOF
[Unit]
Description=ConvoMundo API (Express)
After=network.target

[Service]
Type=simple
User=ubuntu
WorkingDirectory=$API_DIR
EnvironmentFile=/etc/convomundo/api.env
ExecStart=/usr/bin/node $API_DIR/index.js
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable --now infinite-convo-api

# nginx reverse proxy (HTTP)
cat >/etc/nginx/sites-available/api <<EOF
server {
  listen 80;
  server_name $API_DOMAIN;

  location / {
    proxy_pass http://127.0.0.1:$API_PORT;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
  }
}
EOF

rm -f /etc/nginx/sites-enabled/default
ln -sf /etc/nginx/sites-available/api /etc/nginx/sites-enabled/api
nginx -t
systemctl restart nginx

# Request + install LetsEncrypt cert (retry a few times)
set +e
for i in 1 2 3 4 5; do
  certbot --nginx \
    -d "$API_DOMAIN" \
    -m "$CERTBOT_EMAIL" \
    --agree-tos \
    --no-eff-email \
    --redirect \
    --non-interactive

  if [ $? -eq 0 ]; then
    echo "✅ Certbot installed certificate for $API_DOMAIN"
    break
  fi
  echo "⚠️ Certbot attempt $i failed. Retrying in 20s..."
  sleep 20
done
set -e

nginx -t
systemctl restart nginx

echo "✅ Bootstrapping complete. API available on 80/443."
