# 🚀 Setup Guide - Smart City Resource Allocation Dashboard

Complete step-by-step setup instructions.

## Option 1: Demo Mode (Fastest - 30 seconds)

No installation required!

1. Open `frontend/index.html` in your browser
2. Click "Continue as Demo User"
3. Explore the dashboard

Done! 🎉

## Option 2: Full Setup with Backend (10-15 minutes)

### Step 1: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm start
```

You should see:
```
✅ Smart City API Server running on http://localhost:5000
📊 Dashboard Backend Ready!
```

### Step 2: Frontend Setup

**Option A: Direct Open**
```bash
cd frontend
# Open index.html in your browser
```

**Option B: Python Server** (Recommended)
```bash
cd frontend
python -m http.server 8000
# Visit http://localhost:8000 in your browser
```

**Option C: Node.js Server**
```bash
cd frontend
npx http-server
```

### Step 3: Access Dashboard

1. Open `http://localhost:8000` (or your server address)
2. Choose login method:
   - **Demo Mode**: Click "Continue as Demo User"
   - **Firebase Auth**: Create account or login (requires Firebase setup)

## Option 3: Firebase Authentication Setup (Optional)

### Create Firebase Project

1. Go to [firebase.google.com](https://firebase.google.com)
2. Click "Get Started" → Create new project
3. Fill in project details and create

### Enable Authentication

1. In Firebase Console → Authentication
2. Click "Get started" → Email/Password
3. Enable Email/Password provider

### Enable Realtime Database

1. In Firebase Console → Realtime Database
2. Click "Create Database"
3. Start in test mode (for development)

### Get Your Credentials

1. Go to Project Settings (⚙️ icon)
2. Click "Service Accounts"
3. Click "Generate New Private Key"
4. Copy the JSON content

### Configure Backend

1. Edit `backend/.env`
2. Add your Firebase credentials:

```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

### Configure Frontend

1. Edit `frontend/js/firebase-config.js`
2. Replace config object:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

## Troubleshooting

### Backend won't start

```bash
# Check if port 5000 is in use
lsof -i :5000

# Kill process using the port
kill -9 <PID>

# Try different port
PORT=5001 npm start
```

### CORS errors

Make sure backend is running and CORS is configured:

```javascript
// In server.js
app.use(cors());
```

### Charts not loading

1. Check browser console for errors (F12)
2. Ensure Chart.js is loaded from CDN
3. Verify data is being fetched properly

### Authentication issues

1. Check Firebase credentials
2. Verify Authentication is enabled in Firebase
3. Check browser console for error messages
4. Try Demo Mode first

### Frontend won't load

```bash
# Clear cache
# Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

# Check file paths
# Ensure all CSS/JS files exist in frontend/ directory
```

## Verification Checklist

- [ ] Backend server running on http://localhost:5000
- [ ] Frontend accessible on http://localhost:8000
- [ ] API endpoint `/api/health` returns success
- [ ] Dashboard loads without errors
- [ ] Stats cards display data
- [ ] Charts render correctly
- [ ] Zone update modal opens
- [ ] Authentication works (demo or Firebase)

## Next Steps

1. **Explore Features**
   - Try updating zones
   - Test smart allocation
   - Export data

2. **Customize**
   - Add new zones
   - Modify colors in CSS
   - Add more metrics

3. **Deploy**
   - Frontend: Netlify/Vercel
   - Backend: Heroku/AWS
   - See README.md for deployment

## Common Commands

```bash
# Start backend with auto-reload
npm run dev

# Test API health
curl http://localhost:5000/api/health

# View backend logs
tail -f backend/logs/*.log

# Clear node_modules
rm -rf node_modules
npm install
```

## Need Help?

1. Check the README.md for detailed documentation
2. Review API.md for endpoint details
3. Check browser console (F12) for errors
4. Verify all files are in correct directories

---

**You're all set!** 🎉 Explore the dashboard and enjoy!
