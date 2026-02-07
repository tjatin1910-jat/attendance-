# Deployment Guide - Face Recognition Attendance Web App

This guide covers multiple deployment options for the web application.

## Table of Contents
1. [Local Development](#local-development)
2. [Docker Deployment](#docker-deployment)
3. [Cloud Deployment](#cloud-deployment)
4. [Production Checklist](#production-checklist)

## Local Development

### Prerequisites
- Node.js 18+ and npm
- Backend API services running

### Steps

1. **Clone and navigate to the project**:
```bash
cd attendance/web-app
```

2. **Install dependencies**:
```bash
npm install
```

3. **Create environment file**:
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_API_BASE_URL=http://localhost:8000
```

4. **Start development server**:
```bash
npm run dev
```

Access at: `http://localhost:3000`

## Docker Deployment

### Single Container

1. **Build the Docker image**:
```bash
docker build -t attendance-web:latest .
```

2. **Run the container**:
```bash
docker run -d \
  --name attendance-web \
  -p 3000:80 \
  -e VITE_API_BASE_URL=http://your-backend-url:8000 \
  attendance-web:latest
```

3. **Access the application**:
```
http://localhost:3000
```

### Docker Compose (with Backend)

1. **Start all services**:
```bash
docker-compose up -d
```

2. **View logs**:
```bash
docker-compose logs -f web
```

3. **Stop services**:
```bash
docker-compose down
```

## Cloud Deployment

### Option 1: Netlify

1. **Build the application**:
```bash
npm run build
```

2. **Install Netlify CLI**:
```bash
npm install -g netlify-cli
```

3. **Deploy**:
```bash
netlify deploy --prod --dir=dist
```

4. **Configure environment variables** in Netlify dashboard:
   - `VITE_API_BASE_URL`: Your backend API URL

### Option 2: Vercel

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Deploy**:
```bash
vercel --prod
```

3. **Configure environment variables** in Vercel dashboard:
   - `VITE_API_BASE_URL`: Your backend API URL

### Option 3: AWS S3 + CloudFront

1. **Build the application**:
```bash
npm run build
```

2. **Create S3 bucket**:
```bash
aws s3 mb s3://attendance-web-app
```

3. **Configure bucket for static website hosting**:
```bash
aws s3 website s3://attendance-web-app \
  --index-document index.html \
  --error-document index.html
```

4. **Upload files**:
```bash
aws s3 sync dist/ s3://attendance-web-app --delete
```

5. **Create CloudFront distribution** (optional, for CDN):
   - Origin: S3 bucket
   - Default root object: index.html
   - Error pages: 404 -> /index.html (for SPA routing)

### Option 4: Google Cloud Platform (GCP)

1. **Build the application**:
```bash
npm run build
```

2. **Create Cloud Storage bucket**:
```bash
gsutil mb gs://attendance-web-app
```

3. **Upload files**:
```bash
gsutil -m rsync -r -d dist/ gs://attendance-web-app
```

4. **Make bucket public**:
```bash
gsutil iam ch allUsers:objectViewer gs://attendance-web-app
```

5. **Configure for website hosting**:
```bash
gsutil web set -m index.html -e index.html gs://attendance-web-app
```

### Option 5: Azure Static Web Apps

1. **Install Azure CLI**:
```bash
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

2. **Login to Azure**:
```bash
az login
```

3. **Create resource group**:
```bash
az group create --name attendance-rg --location eastus
```

4. **Create static web app**:
```bash
az staticwebapp create \
  --name attendance-web \
  --resource-group attendance-rg \
  --source . \
  --location eastus \
  --branch main \
  --app-location "/" \
  --output-location "dist"
```

### Option 6: DigitalOcean App Platform

1. **Create `app.yaml`**:
```yaml
name: attendance-web
services:
- name: web
  github:
    repo: your-username/attendance-system
    branch: main
    deploy_on_push: true
  build_command: npm run build
  run_command: npm run preview
  envs:
  - key: VITE_API_BASE_URL
    value: ${API_URL}
  http_port: 3000
```

2. **Deploy via DigitalOcean dashboard** or CLI

## Production Checklist

### Before Deployment

- [ ] Update `VITE_API_BASE_URL` to production API URL
- [ ] Enable HTTPS for all connections
- [ ] Configure CORS on backend for production domain
- [ ] Set up proper error tracking (Sentry, etc.)
- [ ] Configure analytics (Google Analytics, etc.)
- [ ] Test all features in production-like environment
- [ ] Optimize images and assets
- [ ] Enable gzip compression
- [ ] Set up CDN for static assets
- [ ] Configure proper cache headers

### Security

- [ ] Enable Content Security Policy (CSP)
- [ ] Add security headers (X-Frame-Options, etc.)
- [ ] Use HTTPS only
- [ ] Implement rate limiting on API
- [ ] Regular security audits
- [ ] Keep dependencies updated
- [ ] Use environment variables for sensitive data
- [ ] Implement proper authentication flow
- [ ] Add CSRF protection

### Performance

- [ ] Enable code splitting
- [ ] Lazy load routes and components
- [ ] Optimize bundle size
- [ ] Enable browser caching
- [ ] Use CDN for static assets
- [ ] Compress images
- [ ] Minify CSS and JavaScript
- [ ] Enable HTTP/2
- [ ] Monitor Core Web Vitals

### Monitoring

- [ ] Set up application monitoring
- [ ] Configure error tracking
- [ ] Set up uptime monitoring
- [ ] Monitor API response times
- [ ] Track user analytics
- [ ] Set up alerts for errors
- [ ] Monitor resource usage
- [ ] Track performance metrics

## Environment Variables

### Development
```env
VITE_API_BASE_URL=http://localhost:8000
VITE_DEBUG=true
```

### Production
```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_DEBUG=false
```

## Nginx Configuration (Production)

For production deployments with Nginx:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    root /var/www/attendance-web;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass https://api.yourdomain.com;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Continuous Deployment

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        working-directory: ./attendance/web-app
        
      - name: Build
        run: npm run build
        working-directory: ./attendance/web-app
        env:
          VITE_API_BASE_URL: ${{ secrets.API_URL }}
          
      - name: Deploy to S3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --delete
        env:
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          SOURCE_DIR: 'attendance/web-app/dist'
```

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

### API Connection Issues
- Verify `VITE_API_BASE_URL` is correct
- Check CORS configuration on backend
- Ensure backend services are running
- Check network/firewall rules

### Routing Issues (404 on refresh)
- Configure server to serve `index.html` for all routes
- For Nginx: `try_files $uri $uri/ /index.html;`
- For Apache: Use `.htaccess` with rewrite rules

### Performance Issues
- Enable production build optimizations
- Use CDN for static assets
- Enable gzip compression
- Optimize images
- Implement code splitting

## Support

For deployment issues:
1. Check application logs
2. Verify environment variables
3. Test API connectivity
4. Review server configuration
5. Contact development team

## Additional Resources

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Deployment Guide](https://create-react-app.dev/docs/deployment/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Docker Documentation](https://docs.docker.com/)
