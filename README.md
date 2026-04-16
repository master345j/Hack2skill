# 🌍 Smart City Resource Allocation Dashboard

A production-grade web application for intelligent resource allocation management in smart cities. Built with modern technologies and enterprise-level best practices.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage Guide](#usage-guide)
- [API Documentation](#api-documentation)
- [Architecture](#architecture)
- [Development](#development)
- [Deployment](#deployment)

## 🎯 Overview

Smart City Resource Allocation Dashboard is a comprehensive solution for managing and optimizing resource distribution across multiple zones/areas in smart cities. It provides real-time monitoring, intelligent allocation algorithms, and beautiful data visualization.

### What It Does

- **Real-time Monitoring**: Track water, electricity, and waste management across zones
- **Smart Allocation**: Automatically allocate resources proportionally to demand
- **Zone Management**: Monitor and control three zones (A, B, C) with individual dashboards
- **Data Visualization**: Interactive charts showing demand vs allocation
- **User Authentication**: Secure login with Firebase
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Live Updates**: Auto-refresh data every 10 seconds

## ✨ Features

### 1. Dashboard Analytics
- **Quick Stats Cards**: Display water, electricity, and waste usage percentages
- **Progress Bars**: Visual representation of resource consumption
- **Live Indicators**: Real-time update status
- **Last Updated Timestamp**: Shows when data was last refreshed

### 2. Zone-wise Allocation
- **Zone A, B, C Management**: Individual cards for each zone
- **Demand Tracking**: Shows demand percentage for each zone
- **Resource Allocation**: Proportional allocation based on algorithms
- **Sub-metrics**: Water, electricity, and waste levels per zone
- **Update Controls**: Real-time zone data updates

### 3. Data Visualization
- **Distribution Chart (Doughnut)**: Shows resource distribution by zone
- **Demand Chart (Bar)**: Compares demand vs allocation
- **Interactive Tooltips**: Hover to see detailed information
- **Responsive Canvas**: Works on all screen sizes

### 4. Smart Allocation Algorithm
```
Algorithm: Proportional Allocation Based on Demand
1. Calculate total demand across all zones
2. For each zone:
   - allocation_percentage = (zone_demand / total_demand) * 100
3. Update allocation in real-time
4. Trigger UI re-render with animations
```

### 5. Authentication System
- **Email/Password Authentication**: Secure Firebase Auth
- **Sign-up & Login**: Create new accounts or login
- **Demo Mode**: Try without authentication
- **Session Management**: Persistent user sessions
- **Logout**: Secure session termination

### 6. UI/UX Features
- **Glassmorphism Design**: Modern frosted glass effect
- **Dark Theme**: Easy on the eyes with premium look
- **Smooth Animations**: All transitions are smooth and polished
- **Responsive Grid Layout**: Mobile-first design
- **Accessibility**: Keyboard shortcuts and screen reader support

## 🛠 Tech Stack

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Glassmorphism, gradients, animations
- **JavaScript (ES6+)**: Modern vanilla JS
- **Chart.js**: Data visualization
- **Firebase SDK**: Authentication and real-time database
- **Google Fonts**: Premium typography (Inter, Poppins)

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web framework
- **CORS**: Cross-origin requests
- **dotenv**: Environment variables
- **Firebase Admin SDK**: Backend integration

## 📁 Project Structure

```
Hack2skill/
├── frontend/
│   ├── index.html              # Main HTML structure
│   ├── css/
│   │   ├── styles.css          # Main styles (1000+ lines)
│   │   └── animations.css      # Animations library
│   ├── js/
│   │   ├── firebase-config.js  # Firebase setup
│   │   ├── auth.js             # Authentication logic
│   │   ├── api.js              # API communication
│   │   ├── dashboard.js        # Dashboard controller
│   │   └── charts.js           # Chart management
│   └── assets/                 # Images, icons (expandable)
│
├── backend/
│   ├── server.js               # Express server
│   ├── package.json            # Dependencies
│   ├── .env                    # Environment variables
│   └── (Ready for expansion)
│
├── README.md                   # This file
└── package.json                # Project metadata

```

## 🚀 Quick Start

### For Immediate Testing (Demo Mode)

1. **Open Frontend**: Open `frontend/index.html` in a browser
2. **Click "Continue as Demo User"**: Access dashboard without authentication
3. **Explore Features**: Try zone updates, allocation algorithms, data export
4. **No Server Needed**: Works in demo mode without backend

### Full Setup (With Backend)

```bash
# Backend Setup
cd backend
npm install
npm start
# Server runs on http://localhost:5000

# Frontend Setup
cd frontend
open index.html
# Or use Python: python -m http.server 8000
```

## 💾 Installation

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Modern web browser
- (Optional) Firebase account

### Backend Installation

```bash
cd backend
npm install
npm start
```

### Frontend Installation

Simply open `frontend/index.html` in your browser or use a local server:

```bash
cd frontend
python -m http.server 8000
# Visit http://localhost:8000
```

## ⚙️ Configuration

### Backend .env File

```env
PORT=5000
NODE_ENV=development
FIREBASE_API_KEY=YOUR_KEY
CORS_ORIGIN=http://localhost:3000
```

### Firebase Setup

1. Create Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Authentication (Email/Password)
3. Add credentials to `backend/.env` and `frontend/js/firebase-config.js`
4. Configure Realtime Database rules

## 📖 Usage Guide

### Dashboard Features

1. **Authentication**: Login with email/password or use demo mode
2. **Quick Stats**: View water, electricity, waste usage
3. **Zone Management**: Update demand for zones A, B, C
4. **Smart Allocation**: Click allocate button for optimal distribution
5. **Charts**: Visual representation with doughnut and bar charts
6. **Export Data**: Download dashboard data as JSON

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+R` | Refresh dashboard |
| `Esc` | Close modals |

## 🔗 API Endpoints

### Backend API

- `GET /api/health` - Server health check
- `GET /api/data` - Fetch all zones data
- `GET /api/summary` - Dashboard summary
- `POST /api/updateData` - Update zone data
- `POST /api/allocateResources` - Allocate resources optimally

## 🏗 Architecture

### Full-Stack Architecture

```
Frontend (HTML/CSS/JS + Chart.js)
    ↓
Firebase Authentication
    ↓
Express Backend API
    ↓
Smart Allocation Algorithm
    ↓
Return JSON Response
```

### Smart Allocation Algorithm

```
Total Demand = Sum of all Zone Demands
For Each Zone:
  Allocation % = (Zone Demand / Total Demand) × 100
  Allocated Resources = (Zone Demand / 100) × Total Capacity
```

## 🔧 Development

### Start Development

```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && python -m http.server 8000

# Open http://localhost:8000
```

### Add New Zone

1. Update backend zones in `server.js`
2. Add HTML elements to `index.html`
3. Update dashboard.js UI functions
4. Update charts.js with new data

## 🌟 Key Files Explained

### Frontend Files

- **index.html**: Main structure with all UI components
  - Auth modal for login/signup
  - Dashboard with stat cards
  - Zone management cards
  - Chart containers
  - Modal for zone updates

- **css/styles.css**: Complete styling (1000+ lines)
  - CSS variables for theming
  - Glassmorphism effects
  - Responsive grid layouts
  - Dark theme colors
  - Button and card styles

- **css/animations.css**: Animation library
  - Slide, scale, and fade animations
  - Hover effects
  - Loading states
  - Smooth transitions

- **js/firebase-config.js**: Firebase initialization
- **js/auth.js**: Authentication UI and logic
- **js/api.js**: Backend communication
- **js/dashboard.js**: Main dashboard controller
- **js/charts.js**: Chart.js integration

### Backend Files

- **server.js**: Express server with all endpoints
  - Health check endpoint
  - Data fetch endpoint
  - Zone update endpoint
  - Smart allocation endpoint

- **package.json**: Dependencies and scripts
- **.env**: Configuration and secrets

## 📊 Data Format

### Zone Data Structure

```javascript
{
  "A": {
    "demand": 45,          // Demand percentage
    "allocation": 36,      // Allocated percentage
    "water": 35,           // Water usage
    "electricity": 40,     // Electricity usage
    "waste": 30            // Waste processing
  }
}
```

## 🎨 Design Highlights

### Glassmorphism
- Semi-transparent backgrounds
- Backdrop blur effects
- Gradient overlays
- Layered glass-like appearance

### Color Palette
- Primary: Cyan (#00d4ff)
- Secondary: Purple (#7c3aed)
- Accent: Pink (#ec4899)
- Background: Dark (#0a0e27)

### Typography
- **Headers**: Poppins (Bold, Large)
- **Body**: Inter (Regular, Small)
- Premium font pairing

## ✅ Production Checklist

- [ ] Set up Firebase project
- [ ] Configure environment variables
- [ ] Enable CORS in backend
- [ ] Set database rules
- [ ] Test all endpoints
- [ ] Optimize images
- [ ] Minify CSS/JS
- [ ] Set up logging
- [ ] Configure error handling
- [ ] Deploy to production

## 🚀 Deployment Options

- **Frontend**: Netlify, Vercel, GitHub Pages
- **Backend**: Heroku, AWS, Google Cloud, DigitalOcean
- **Database**: Firebase, MongoDB Atlas, PostgreSQL

## 📞 Support & Contribution

For bugs, features, or questions, please create an issue.

## 📜 License

MIT License - Use freely for personal and commercial projects.

---

**Built with ❤️ for Smart Cities** | **v1.0.0** | **April 2026**