# ConvoMundo

ConvoMundo is a website for language teachers. It hosts conversation questions, lesson plans, and other useful resources.

## Repository layout

This repository is a monorepo with three main areas:

| Folder | What it is |
|--------|------------|
| `api/` | Express (Node.js) backend API. MongoDB via Mongoose. |
| `app/` | Vite + React + React Router frontend. TypeScript + Tailwind CSS. |
| `infra/` | Terraform for AWS (VPC, EC2, S3, CloudFront, Route53, ACM, etc.). |

## Prerequisites

- **Node.js**: v20 (or similar)
- **npm**: used in both `api/` and `app/`
- **MongoDB**: local instance or hosted MongoDB connection string

For infrastructure work:

- **Terraform**
- **AWS CLI** (and configured credentials)

## Quick start (local)

In two terminals:

### 1) Start the API

```bash
cd api
npm install
```

Create `api/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/convomundo
PORT=3000
```

Run the API:

```bash
node index.js
```

Useful endpoints:

- `GET /health`
- `GET /api/topics?lang=English`
- `GET /api/topics/:id`
- `GET /api/languages`

### 2) Start the frontend

```bash
cd app
npm install
npm run dev
```

Vite will print the dev URL in the terminal (commonly `http://localhost:5173`).

## Local development notes

### CORS

The API restricts allowed origins in `api/index.js` (production domains are whitelisted). If you want the local frontend to talk to the local API, add your Vite dev origin (for example `http://localhost:5173`) to the `allowedOrigins` set.

### Frontend API base URL

The frontend currently defines API URLs in `app/src/constants/api.ts`:

- **production**: `https://api.convomundo.com`
- **development**: `http://localhost:3000`

For local full-stack development, ensure the frontend is actually using the development URL when running locally.

### Common scripts

Frontend (`app/`):

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

Backend (`api/`):

- Run with `node index.js` (there is no `npm start` script currently)

## Environment variables

Backend (`api/.env`):

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGODB_URI` | Yes | MongoDB connection string |
| `PORT` | No | API port (default `3000`) |

## Infrastructure (Terraform)

The `infra/` folder defines AWS resources for hosting the API and frontend. Key variables (see `infra/variables.tf`) include:

- `aws_region` (default `eu-north-1`)
- `my_ip_cidr` (your public IP in CIDR format for SSH access)
- `ec2_key_name` (existing EC2 key pair name)
- `github_repo_https` (repo clone URL used by deployment)
- `api_port` (default `3000`)
- `app_root` (the server path where the repo is cloned)

To work with Terraform:

```bash
cd infra
terraform init
terraform plan
terraform apply
```

## Deployment (GitHub Actions)

Workflows live in `.github/workflows/`:

- **Backend** (`deploy-backend.yaml`)
  - Trigger: pushes to `main` that touch `api/**`
  - Uses AWS SSM to run commands on the EC2 instance (pull latest, install deps, restart `infinite-convo-api`)
- **Frontend** (`deploy-frontend.yaml`)
  - Trigger: pushes to `main` that touch `app/**`
  - Builds the app, syncs `app/dist` to S3, and invalidates CloudFront

Required GitHub secrets:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `CLOUDFRONT_DISTRIBUTION_ID` (frontend only)

## Production notes (how the API runs)

The EC2 bootstrap (`infra/user_data.sh`) sets up:

- A systemd service: `infinite-convo-api`
- An env file at: `/etc/convomundo/api.env`
- `MONGODB_URI` sourced from SSM Parameter Store at: `/convomundo/prod/MONGODB_URI`
