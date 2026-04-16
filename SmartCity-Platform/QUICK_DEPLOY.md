# Deploy Smart City Platform - Complete Guide

## 🚀 DEPLOYMENT OVERVIEW

**Backend:** Render.com (Node.js)  
**Frontend:** Netlify (React)  
**Time Needed:** ~15 minutes total  
**Cost:** FREE (both have generous free tiers)

---

## 📦 BACKEND DEPLOYMENT (Render)

### Step 1: Create Render Account
1. Go to https://render.com
2. Click "Sign up"
3. Connect with GitHub
4. Authorize Render to access your GitHub account

### Step 2: Create Backend Service
1. Click "New +" button
2. Select "Web Service"
3. Search for your "Hack2skill" repository
4. Select it and click "Connect"

### Step 3: Configure Settings
Fill in the deployment form:

```
Name: smart-city-backend
Environment: Node
Region: Your closest region
Build Command: npm install
Start Command: npm start
Instance Type: Free (0.5 CPU, 512MB RAM)
```

### Step 4: Add Environment Variables
In Render dashboard, add these environment variables:

```
NODE_ENV=production
PORT=5001
JWT_SECRET=your_production_secret_key_here_change_this_12345
CORS_ORIGIN=https://YOUR_NETLIFY_DOMAIN.netlify.app
```

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait for build to complete (2-3 minutes)
3. When live, note your URL: `https://smart-city-backend.onrender.com`

⚠️ **Note:** First deploy may take a few minutes. Render URL will look like: `https://smart-city-backend-XXXX.onrender.com`

---

## 🎨 FRONTEND DEPLOYMENT (Netlify)

### Step 1: Create Netlify Account
1. Go to https://netlify.com
2. Click "Sign up"
3. Choose "GitHub" to connect
4. Authorize Netlify

### Step 2: Create New Site
1. Click "Add new site" → "Import an existing project"
2. Choose GitHub
3. Search and select "Hack2skill" repository
4. Click "Install" (if prompted) and authorize

### Step 3: Configure Build Settings
Set these values:

```
Base directory: frontend
Build command: npm run build
Publish directory: frontend/build
```

### Step 4: Add Environment Variables
Click "Site settings" → "Build & deploy" → "Environment"

Add these environment variables:

```
REACT_APP_API_URL=https://smart-city-backend-XXXX.onrender.com/api
REACT_APP_ENV=production
```

(Replace with your actual Render backend URL from Step 5 above)

### Step 5: Deploy
1. Click "Deploy site"
2. Wait for build to complete (2-3 minutes)
3. Visit your live site: `https://smart-city-XXXX.netlify.app`

---

## 🔗 CONNECTING FRONTEND TO BACKEND

After both are deployed:

1. Get your Render backend URL (e.g., `https://smart-city-backend-xxxx.onrender.com`)
2. In Netlify dashboard:
   - Go to "Site settings" → "Build & deploy" → "Environment"
   - Update `REACT_APP_API_URL` with your Render URL
   - Trigger a rebuild: Click "Deploys" → "Trigger deploy"

3. Your frontend will now connect to the live backend!

---

## 🧪 TESTING DEPLOYMENT

### Test Backend
```bash
curl https://smart-city-backend-XXXX.onrender.com/api/health
```

Should return:
```json
{
  "success": true,
  "status": "Server running",
  "modules": [...]
}
```

### Test Frontend
1. Open your Netlify URL
2. Login with: `admin@smartcity.com` / `password`
3. You should see the dashboard with real data from your live backend!

---

## 🔐 IMPORTANT SECURITY NOTES

✅ **What NOT to commit to GitHub:**
- Real Firebase credentials
- Real JWT_SECRET
- Real database passwords
- Real API keys

✅ **Use .env.example for templates**
- Already provided in your repo
- Share this with team instead of actual .env

✅ **Use Render/Netlify environment variables:**
- Add secrets through dashboard UI
- Never commit production secrets to git

---

## 📌 PRODUCTION URLS

After deployment, you'll have:

**Backend:** `https://smart-city-backend-XXXX.onrender.com`
- Health: `https://smart-city-backend-XXXX.onrender.com/api/health`
- API Base: `https://smart-city-backend-XXXX.onrender.com/api`

**Frontend:** `https://smart-city-XXXX.netlify.app`
- Login page at: `https://smart-city-XXXX.netlify.app`

---

## 🚨 TROUBLESHOOTING

### Frontend shows "Cannot reach API"
1. Check `REACT_APP_API_URL` in Netlify environment variables
2. Verify Render backend is running (check Render dashboard)
3. Trigger Netlify rebuild

### Backend not starting
1. Check Render build logs in dashboard
2. Ensure `npm install` completes successfully
3. Check start command is set to `npm start`

### Login not working
1. Check browser console for errors
2. Verify backend API is responding (test health endpoint)
3. Check CORS_ORIGIN matches your frontend URL

---

## 📊 DEPLOYMENT CHECKLIST

- [ ] GitHub repository is public or Render/Netlify has access
- [ ] All code is pushed to main branch
- [ ] Backend deployed on Render
- [ ] Frontend deployed on Netlify
- [ ] Environment variables set correctly
- [ ] Backend health check working
- [ ] Frontend loads without errors
- [ ] Login functionality works
- [ ] Dashboard shows live data
- [ ] Production URLs noted down

---

## 🔄 CONTINUOUS DEPLOYMENT

**Automatic Updates:**
- Push to GitHub → Render automatically redeploys backend
- Push to GitHub → Netlify automatically redeploys frontend

No manual steps needed for future updates! 🎉

---

## 📞 NEXT STEPS AFTER DEPLOYMENT

1. **Test in Production**
   - Visit frontend URL
   - Login with demo credentials
   - Create test data
   - Verify all features work

2. **Connect Database**
   - Set up Firebase Firestore
   - Update backend .env with Firebase credentials
   - Test database operations

3. **Set Custom Domain** (Optional)
   - Connect domain to Netlify
   - Update CORS_ORIGIN on Render
   - Update frontend API URL if needed

4. **Enable HTTPS** (Already done by both platforms)

5. **Set Up Monitoring** (Optional)
   - Sentry for error tracking
   - LogRocket for debugging
   - UptimeRobot for uptime monitoring

---

## 📝 ESTIMATED COSTS

**Render (Backend):** FREE tier ($0/month)
- Includes 750 free hours/month
- Sufficient for development and hobby projects

**Netlify (Frontend):** FREE tier ($0/month)  
- 100GB bandwidth/month
- Unlimited builds

**Total Monthly Cost:** $0

---

## 🎉 DEPLOYMENT COMPLETE!

Your Smart City Platform is now:
✅ Live on the internet  
✅ Automatically updated with Git pushes  
✅ Accessible from anywhere  
✅ Using production-grade hosting  
✅ With FREE tier coverage  

**Share your URLs:**
```
Frontend: https://smart-city-XXXX.netlify.app
Backend API: https://smart-city-backend-XXXX.onrender.com/api
```

---

For detailed information, see: SmartCity-Platform/DEPLOYMENT.md
