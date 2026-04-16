# Deployment Guide - Smart City Platform

## 🌐 Production Deployment

### Prerequisites
- Backend deployed to Node.js hosting (Render, Railway, Heroku)
- Frontend deployed to static hosting (Netlify, Vercel)
- Firebase project configured
- Domain names (optional)

---

## 📦 Backend Deployment

### Option 1: Render (Recommended)

**Step 1: Prepare Repository**
```bash
cd SmartCity-Platform
git add .
git commit -m "Smart City Platform v2.0"
git push
```

**Step 2: Create Render Service**
1. Go to https://render.com
2. Sign in with GitHub
3. Click "New +" → "Web Service"
4. Select your repository
5. Configuration:
   - **Name:** smart-city-backend
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free (or Starter+)

**Step 3: Environment Variables**
Add in Render dashboard:
```
NODE_ENV=production
PORT=5001
FIREBASE_PROJECT_ID=your_project
FIREBASE_API_KEY=your_key
FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
JWT_SECRET=production_secret_key_change_this
```

**Step 4: Deploy**
- Click "Create Web Service"
- Wait for build and deploy (~2-3 minutes)
- Get your backend URL: `https://smart-city-backend.onrender.com`

### Option 2: Railway

1. Go to https://railway.app
2. Create new project
3. Deploy from GitHub
4. Add environment variables
5. Deploy

### Option 3: Heroku (Legacy)

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create smart-city-backend

# Add environment variables
heroku config:set NODE_ENV=production -a smart-city-backend
heroku config:set FIREBASE_PROJECT_ID=xxx -a smart-city-backend
# ... add other variables

# Deploy
git push heroku main
```

---

## 🎨 Frontend Deployment

### Option 1: Netlify

**Step 1: Connect Repository**
1. Go to https://netlify.com
2. Click "Add new site" → "Import an existing project"
3. Choose GitHub
4. Select repository

**Step 2: Build Settings**
- **Base directory:** `frontend`
- **Build command:** `npm run build`
- **Publish directory:** `frontend/build`

**Step 3: Environment Variables**
Add in Netlify dashboard:
```
REACT_APP_API_URL=https://smart-city-backend.onrender.com/api
REACT_APP_ENV=production
```

**Step 4: Deploy**
- Click "Deploy site"
- Get your frontend URL: `https://smart-city-xxxx.netlify.app`

### Option 2: Vercel (Recommended)

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import GitHub repository
4. Set framework to React
5. Add environment variables
6. Deploy

### Option 3: GitHub Pages

```bash
# Add to package.json
"homepage": "https://username.github.io/repository",

# Install gh-pages
cd frontend
npm install --save-dev gh-pages

# Add scripts to package.json
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

---

## 🔒 Production Checklist

### Backend Security
- [ ] Change JWT_SECRET to strong random value
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS
- [ ] Configure CORS for frontend domain only
- [ ] Set up proper logging
- [ ] Enable rate limiting
- [ ] Set up monitoring/alerts
- [ ] Use environment variables for all secrets

### Frontend Security
- [ ] Remove console.log statements
- [ ] Set API_URL to production backend
- [ ] Enable HTTPS
- [ ] Set up error tracking (Sentry)
- [ ] Add security headers
- [ ] Enable gzip compression
- [ ] Set up CDN for assets

### Database (Firebase)
- [ ] Configure Firestore security rules
- [ ] Enable authentication
- [ ] Set up automated backups
- [ ] Configure database indexes
- [ ] Monitor usage/costs

---

## 🚀 Continuous Deployment (CI/CD)

### GitHub Actions Setup

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy Backend
        run: |
          # Your deployment commands
          
      - name: Deploy Frontend
        run: |
          # Your deployment commands
```

---

## 📊 Monitoring & Maintenance

### Essential Monitoring
- Backend uptime monitoring (UptimeRobot)
- Error tracking (Sentry)
- Performance monitoring (DataDog, New Relic)
- Log aggregation (LogRocket)

### Regular Maintenance
- Weekly: Check error logs
- Monthly: Review performance metrics
- Quarterly: Update dependencies
- Yearly: Audit security

---

## 🔄 Post-Deployment

### Verify Deployment
```bash
# Test backend health
curl https://smart-city-backend.onrender.com/api/health

# Test frontend
Open https://smart-city-xxxx.netlify.app in browser
```

### Update DNS (Optional)
1. Purchase domain
2. Point to Netlify/Vercel nameservers
3. Configure backend domain if needed

### Set up Email Alerts
1. Configure alerts in hosting platform
2. Add team email addresses
3. Set notification preferences

---

## 📈 Scaling for Production

### Before Going Live
1. Load test the API
2. Set up auto-scaling
3. Configure database backups
4. Set up monitoring dashboards
5. Create runbooks for common issues

### Optimization Tips
- enable caching headers
- use CDN for assets
- implement pagination for APIs
- set up database indexes
- compress API responses

---

## 💾 Backup & Recovery

### Firestore Backups
```bash
# Create backup
gcloud firestore export gs://bucket-name/backup-$(date +%Y%m%d)

# Restore from backup
gcloud firestore import gs://bucket-name/backup-20240115
```

### Code Backups
- GitHub automatically version control
- Configure backup retention policies

---

## 🎯 Domain Configuration

### For custom domain:

**Backend:**
- Get CNAME from hosting provider
- Add to DNS records
- Update CORS_ORIGIN in .env
- Update frontend API_URL

**Frontend:**
- Configure domain in Netlify/Vercel settings
- Add SSL certificate (automatic)
- Set up redirects if needed

---

## ✅ Final Checklist

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] API calls working from frontend
- [ ] Environment variables set correctly
- [ ] Monitoring and alerts configured
- [ ] Backups configured
- [ ] Team onboarded
- [ ] Documentation updated
- [ ] Performance acceptable
- [ ] Security audit completed

---

**Deployment Status:** ✅ Ready for Production

For issues during deployment, check logs on your hosting platform or community forums.
