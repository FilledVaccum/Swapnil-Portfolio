# Deployment Guide

This site builds to a `dist/` folder of pure static HTML/CSS/JS. It can be hosted anywhere that serves static files.

## Prerequisites

Before deploying, ensure the site builds locally:

```bash
npm run build
```

This produces the `dist/` folder. All deployment methods serve this folder.

---

## Option 1: AWS S3 + CloudFront

Best for: Full control, custom domain, global CDN, fits your AWS background.

### Step 1: Create an S3 Bucket

```bash
aws s3 mb s3://your-site-bucket-name --region us-east-1
```

### Step 2: Configure Bucket for Static Hosting

```bash
aws s3 website s3://your-site-bucket-name \
  --index-document index.html \
  --error-document 404.html
```

### Step 3: Set Bucket Policy for Public Read

Create a file `bucket-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-site-bucket-name/*"
    }
  ]
}
```

Apply it:

```bash
aws s3api put-bucket-policy \
  --bucket your-site-bucket-name \
  --policy file://bucket-policy.json
```

### Step 4: Upload the Build

```bash
aws s3 sync dist/ s3://your-site-bucket-name --delete
```

### Step 5: Create a CloudFront Distribution

```bash
aws cloudfront create-distribution \
  --origin-domain-name your-site-bucket-name.s3-website-us-east-1.amazonaws.com \
  --default-root-object index.html
```

Or use the AWS Console:
1. Go to CloudFront → Create Distribution
2. Origin domain: `your-site-bucket-name.s3-website-us-east-1.amazonaws.com`
3. Viewer protocol policy: Redirect HTTP to HTTPS
4. Default root object: `index.html`
5. Create

### Step 6: Custom Domain (Optional)

1. Register/transfer domain in Route 53 (or use existing DNS)
2. Request an ACM certificate in `us-east-1` for your domain
3. Add the domain as an alternate domain name (CNAME) in CloudFront
4. Attach the ACM certificate
5. Create a Route 53 A record (Alias) pointing to the CloudFront distribution

### Step 7: Automate Deploys

Add to `.github/workflows/build.yml`:

```yaml
- name: Deploy to S3
  if: github.ref == 'refs/heads/main' && github.event_name == 'push'
  env:
    AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
    AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
    AWS_REGION: us-east-1
  run: |
    aws s3 sync dist/ s3://your-site-bucket-name --delete
    aws cloudfront create-invalidation \
      --distribution-id YOUR_DIST_ID \
      --paths "/*"
```

Store `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and distribution ID as GitHub repository secrets.

---

## Option 2: Netlify

Best for: Zero-config, automatic deploys, free tier, custom domain included.

### Method A: Connect GitHub Repo

1. Go to [netlify.com](https://netlify.com) → Sign up / Log in
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub account, select your repo
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click "Deploy site"

Every push to `main` triggers an automatic rebuild and deploy.

### Method B: Manual Deploy (Drag & Drop)

1. Build locally: `npm run build`
2. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
3. Drag the `dist/` folder onto the page
4. Site is live instantly

### Custom Domain on Netlify

1. Go to Site settings → Domain management
2. Add custom domain
3. Netlify provides free HTTPS via Let's Encrypt
4. Point your DNS CNAME to `your-site.netlify.app`

---

## Option 3: Vercel

Best for: Fast deploys, automatic preview URLs for PRs, generous free tier.

### Method A: Connect GitHub Repo

1. Go to [vercel.com](https://vercel.com) → Sign up / Log in
2. Click "Add New Project" → Import your GitHub repo
3. Framework preset: Select "Astro"
4. Build settings (auto-detected, but verify):
   - Build command: `npm run build`
   - Output directory: `dist`
5. Click "Deploy"

Every push to `main` deploys automatically. PRs get preview URLs.

### Method B: CLI Deploy

```bash
npm install -g vercel
vercel login
vercel --prod
```

### Custom Domain on Vercel

1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS: Add a CNAME record pointing to `cname.vercel-dns.com`
4. HTTPS is automatic

---

## Option 4: GitHub Pages

Best for: Simplest setup, free, no external service needed.

### Step 1: Update Astro Config

Edit `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://yourusername.github.io',
  base: '/your-repo-name',  // Remove this line if using a custom domain
});
```

### Step 2: Create GitHub Actions Workflow

Replace `.github/workflows/build.yml` with:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### Step 3: Enable GitHub Pages

1. Go to your repo → Settings → Pages
2. Source: GitHub Actions
3. Push to `main` — the workflow builds and deploys automatically

### Custom Domain on GitHub Pages

1. Go to Settings → Pages → Custom domain
2. Enter your domain
3. Add DNS records:
   - A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - Or CNAME: `yourusername.github.io`
4. Check "Enforce HTTPS"
5. Remove the `base` line from `astro.config.mjs`

---

## Option 5: Cloudflare Pages

Best for: Fast global CDN, generous free tier, DDoS protection included.

### Step 1: Connect GitHub Repo

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages → Create
2. Connect your GitHub account, select your repo
3. Build settings:
   - Framework preset: Astro
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Click "Save and Deploy"

Every push to `main` deploys automatically. PRs get preview URLs.

### Custom Domain on Cloudflare Pages

1. Go to your Pages project → Custom domains
2. Add your domain (easiest if DNS is already on Cloudflare)
3. HTTPS is automatic

---

## Option 6: Any Static File Server

The `dist/` folder is self-contained. You can serve it from anywhere:

### Nginx

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/your-site/dist;
    index index.html;

    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }
}
```

### Docker

Create a `Dockerfile` in the project root:

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

Build and run:

```bash
docker build -t my-portfolio .
docker run -p 8080:80 my-portfolio
```

### Python (Quick Local Test)

```bash
cd dist && python3 -m http.server 8080
```

---

## Comparison

| Platform | Auto Deploy | Custom Domain | HTTPS | Free Tier | Setup Effort |
|----------|------------|---------------|-------|-----------|-------------|
| AWS S3 + CloudFront | With GitHub Actions | Route 53 / any DNS | ACM certificate | ~Free at low traffic | Medium |
| Netlify | Yes (connect repo) | Yes, free | Yes, free | 100GB bandwidth/mo | Low |
| Vercel | Yes (connect repo) | Yes, free | Yes, free | 100GB bandwidth/mo | Low |
| GitHub Pages | Yes (GitHub Actions) | Yes, free | Yes, free | 100GB bandwidth/mo | Low |
| Cloudflare Pages | Yes (connect repo) | Yes, free | Yes, free | Unlimited bandwidth | Low |
| Nginx / Docker | Manual or CI/CD | Your server | Your config | Self-hosted | High |

## Recommended Path

1. **Starting out?** → Netlify or Vercel (connect repo, done in 2 minutes)
2. **Want AWS experience?** → S3 + CloudFront (more setup, full control)
3. **Already on Cloudflare?** → Cloudflare Pages (best CDN, unlimited bandwidth)
4. **Private repo, free?** → GitHub Pages (simplest, no external service)

## After Deploying

1. Update `site` in `astro.config.mjs` to your actual domain
2. Verify all pages load correctly
3. Check Open Graph meta tags work (share a link on LinkedIn/Twitter to test)
4. Set up a custom domain if you haven't already
