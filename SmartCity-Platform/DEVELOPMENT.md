# Smart City Platform - Development Guide

## 📋 Quick Start

### Option 1: Manual Setup (Recommended for development)

```bash
# Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm start
```

### Option 2: Docker Compose

```bash
docker-compose up -d
```

### Option 3: Setup Script

```bash
bash setup.sh
bash dev.sh daemon
```

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project: https://console.firebase.google.com
2. Enable Firestore Database
3. Enable Authentication (Email/Password)
4. Copy credentials to `backend/.env`

### Environment Variables

**Backend (.env)**
```
NODE_ENV=development
PORT=5001
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_API_KEY=your_api_key
JWT_SECRET=dev_secret_key
```

**Frontend (.env)**
```
REACT_APP_API_URL=http://localhost:5001/api
REACT_APP_ENV=development
```

## 📚 API Testing

### Health Check
```bash
curl http://localhost:5001/api/health
```

### Sample Login
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@smartcity.com",
    "password": "password"
  }'
```

### Get Dashboard
```bash
curl http://localhost:5001/api/dashboard/overview
```

## 🎯 Project Structure

```
SmartCity-Platform/
├── backend/
│   ├── server.js          # Main Express server (600+ lines)
│   ├── package.json       # Backend dependencies
│   ├── .env               # Environment variables
│   └── Dockerfile         # Docker configuration
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   └── index.js       # React entry point
│   ├── public/            # Static files
│   ├── package.json       # Frontend dependencies
│   └── Dockerfile         # Docker configuration
├── docker-compose.yml     # Docker Compose setup
├── setup.sh              # Setup script
├── dev.sh                # Development launcher
└── build.sh              # Production build script
```

## 🚀 Deployment

### Backend (Node.js)

**Render:**
```
1. Connect GitHub repository
2. Create New Service → Web Service
3. Specify: command = npm start
4. Set environment variables in Render dashboard
5. Deploy
```

**Railway:**
```
1. Connect GitHub
2. Create new project
3. Deploy
4. Set environment variables
5. Done!
```

### Frontend (React)

**Netlify:**
```
1. Connect GitHub repository
2. Build command: npm run build
3. Publish directory: build
4. Set REACT_APP_API_URL environment variable
5. Deploy
```

**Vercel:**
```
1. Import project
2. Set environment variables
3. Deploy
```

## 📊 10 Modules Overview

| Module | Endpoints | Status |
|--------|-----------|--------|
| Authentication | /auth/* | ✅ Complete |
| Dashboard | /dashboard/* | ✅ Complete |
| Area Management | /areas/* | ✅ Complete |
| Resource Allocation | /allocation/* | ✅ Complete |
| Alerts | /alerts/* | ✅ Complete |
| Analytics | /analytics/* | ✅ Complete |
| Real-time | /realtime/* | ✅ Complete |
| Waste | /waste/* | ✅ Complete |
| Water | /water/* | ✅ Complete |
| Electricity | /electricity/* | ✅ Complete |

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check port 5001 is available
lsof -i :5001

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Frontend won't compile
```bash
# Clear cache
rm -rf node_modules .cache package-lock.json
npm install
npm start
```

### API calls failing
- Check backend is running on :5001
- Verify CORS is enabled in backend/server.js
- Check REACT_APP_API_URL in frontend/.env

## 🔑 Demo Credentials

```
Email: admin@smartcity.com
Password: password
```

## 📞 Support

For issues or questions:
1. Check this guide
2. Review backend server logs
3. Check browser console for frontend errors
4. Verify .env files are correctly configured

---

Happy coding! 🚀
