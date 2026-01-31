# ConvoMundo

ConvoMundo is a website for language teachers. It hosts conversation questions, lesson plans, and other resources. The site currently supports four languages, with plans to add more over time.

## Architecture

This repository is a monorepo with three main areas:

| Folder | Description |
|--------|-------------|
| **api** | Express (Node.js) backend with a small set of REST endpoints consumed by the frontend. Uses MongoDB via Mongoose. |
| **app** | Vite + React frontend with React Router and Tailwind CSS. TypeScript. |
| **infra** | Terraform configuration for AWS (VPC, EC2, S3, CloudFront, Route53, ACM, etc.). |

You should be comfortable with React, Express, MongoDB, Terraform, and common AWS services (e.g. EC2, S3) to run and modify the project.

---

## Prerequisites

- **Node.js** (v20 or similar; used by both api and app)
- **MongoDB** (local instance or a connection string for a remote database)
- **npm** (or another Node package manager)

For infrastructure work:

- **Terraform**
- **AWS CLI** and credentials

---

## Local development

### 1. API (backend)

1. **Install dependencies**

   ```bash
   cd api
   npm install
   ```

2. **Environment variables**

   Create `api/.env` with at least:

   ```env
   MONGODB_URI=mongodb://localhost:27017/your-db-name
   ```

   Optional:

   - `PORT` – server port (default: 3000)

3. **CORS (for local frontend)**

   The API is configured in `api/index.js` to allow requests from `https://convomundo.com`. To run the frontend locally, temporarily set the CORS `origin` to your Vite dev server URL, for example:

   - `http://localhost:5173` (Vite default)

   Change it back to the production domain before committing.

4. **Run the API**

   ```bash
   node index.js
   ```

   The API listens on the port from `PORT` or 3000. Health check: `GET http://localhost:3000/health`.

### 2. App (frontend)

1. **Install dependencies**

   ```bash
   cd app
   npm install
   ```

2. **API URL**

   The app uses the API base URL from `app/src/constants/api.ts`:

   - Production: `https://api.convomundo.com`
   - Development: `http://localhost:3000`

   For local full-stack development, ensure the app uses the development URL (e.g. by switching to `development_api_url` or using a dev check in that file) so it talks to your local API.

3. **Run the dev server**

   ```bash
   npm run dev
   ```

   Vite serves the app on its default port (typically 5173). Other commands:

   - `npm run build` – production build
   - `npm run preview` – preview production build locally
   - `npm run lint` – run ESLint

---

## Environment variables summary

| Location | Variable | Required | Description |
|----------|----------|----------|-------------|
| api/.env | MONGODB_URI | Yes | MongoDB connection string |
| api/.env | PORT | No | API port (default 3000) |

---

## Infrastructure (Terraform)

The `infra` folder defines AWS resources for hosting the API and frontend. Key variables (see `infra/variables.tf` and `infra/terraform.tfvars`) include:

- `aws_region` – e.g. `eu-north-1`
- `my_ip_cidr` – your public IP in CIDR form (for SSH access)
- `ec2_key_name` – existing EC2 key pair name
- `github_repo_https` – repo clone URL used by deployment

Copy `terraform.tfvars.example` to `terraform.tfvars` if present, or create `terraform.tfvars` and set these before running `terraform plan` / `terraform apply` in `infra`.

---

## Deployment

- **Backend:** Pushes to `main` that touch `api/` trigger the "Deploy Backend" workflow. It uses AWS SSM to run commands on the EC2 instance (e.g. pull latest, `npm ci`, restart the API service). Requires `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` in the repo secrets.
- **Frontend:** Pushes to `main` that touch `app/` trigger the "Deploy Frontend" workflow. It builds the app, syncs `app/dist` to S3, and invalidates the CloudFront distribution. Requires the same AWS secrets plus `CLOUDFRONT_DISTRIBUTION_ID`.

Workflow files: `.github/workflows/deploy-backend.yaml`, `.github/workflows/deploy-frontend.yaml`.
