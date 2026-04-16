# Smart City Resource Allocation Platform

[![Deployed](https://img.shields.io/badge/Status-Active-brightgreen)]()
[![License](https://img.shields.io/badge/License-MIT-blue)]()
[![Node.js](https://img.shields.io/badge/Node.js-v14+-green)]()
[![React](https://img.shields.io/badge/React-v18+-blue)]()

A comprehensive resource allocation platform for smart cities with 10 integrated modules for water, electricity, and waste management.

## 🌟 Features

### Core Modules (10 Total)
1. **Authentication** - Secure login/signup with JWT + Firebase Auth
2. **Dashboard** - Real-time overview with analytics
3. **Area Management** - CRUD operations for city zones
4. **Smart Resource Allocation** - AI-powered distribution algorithm
5. **Alerts & Notifications** - Real-time alert system
6. **Data Analytics** - Trends, predictions, and insights
7. **Real-time Data** - Live status monitoring
8. **Waste Management** - Collection tracking and optimization
9. **Water Management** - Consumption, leakage detection
10. **Electricity Management** - Load balancing, peak management

### Key Features
- ✅ Interactive Dashboard with Charts
- ✅ Area-wise Filtering & Management
- ✅ Smart Resource Allocation Algorithm
- ✅ Real-time Alerts System
- ✅ Predictive Analytics
- ✅ Role-based Access Control
- ✅ Mobile Responsive UI
- ✅ Data Export Capabilities

## 🛠️ Tech Stack

### Frontend
- React.js 18+
- React Router v6
- Axios for API calls
- Chart.js for visualizations
- CSS Grid & Flexbox
- Mobile First Design

### Backend
- Node.js v14+
- Express.js 4.18+
- JWT Authentication
- Firebase/Firestore
- bcryptjs for password hashing
- express-validator for input validation

### Database
- Firebase Firestore (Cloud Database)
- Real-time Listeners
- Document-based Storage

## 📦 Installation

### Prerequisites
- Node.js v14+ 
- npm or yarn
- Firebase Account

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your Firebase credentials
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The app will open at `http://localhost:3000`

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Dashboard
- `GET /api/dashboard/overview` - Dashboard metrics
- `GET /api/dashboard/charts` - Chart data

### Area Management
- `GET /api/areas` - List all areas
- `POST /api/areas` - Create new area
- `GET /api/areas/:id` - Get area details
- `PUT /api/areas/:id` - Update area

### Resource Allocation
- `POST /api/allocation/calculate` - Calculate smart allocation
- `GET /api/allocation/current` - Get current allocation

### Alerts
- `GET /api/alerts` - List alerts
- `POST /api/alerts` - Create alert

### Analytics
- `GET /api/analytics/trends` - Trend analysis
- `GET /api/analytics/predictions` - Predictive insights

### Utilities
- `GET /api/waste/status` - Waste management status
- `GET /api/water/status` - Water management status
- `GET /api/electricity/status` - Electricity status
- `GET /api/realtime/status` - Real-time status
- `GET /api/health` - System health check

## 📊 Smart Allocation Algorithm

The platform uses an intelligent allocation algorithm that considers:

1. **Demand-Supply Ratios** - Calculates imbalance in each area
2. **Priority Weighting** - High-priority areas get preferential treatment
3. **Optimization** - Redistributes resources to meet demand
4. **Recommendations** - Suggests infrastructure improvements

Example:
```javascript
{
  zone: "Downtown",
  demandRatio: 0.85,
  priority: "high",
  allocatedResources: 8500,
  recommendation: "Increase infrastructure by 15%"
}
```

## 🔐 Authentication

The platform supports two authentication methods:

1. **JWT Tokens** - Stateless authentication
2. **Firebase Auth** - Third-party identity provider

Login flow:
```
User Credentials → Validation → Hash Password → JWT Token → Stored in localStorage
```

## 📱 Pages & Features

| Page | Features |
|------|----------|
| **Login** | Email/password authentication, demo credentials |
| **Dashboard** | Stats, charts, resource overview, utilization |
| **Areas** | Zone management, detailed view, resource allocation |
| **Alerts** | Real-time notifications, severity levels, actions |
| **Admin Panel** | Add areas, smart allocation, system status |

## 🎨 UI/UX Highlights

- **Glassmorphism Design** - Modern frosted glass aesthetic
- **Dark Theme** - Eye-friendly dark color scheme
- **Responsive Layout** - Mobile, tablet, desktop optimized
- **Real-time Updates** - Auto-refresh dashboards
- **Interactive Charts** - Visual data representation
- **Animated Elements** - Smooth transitions and interactions

## 📈 Deployment

### Backend Deployment (Render/Railway/Heroku)

```bash
cd backend
npm install
# Set environment variables on platform
npm start
```

### Frontend Deployment (Netlify/Vercel)

```bash
cd frontend
npm install
npm run build
# Deploy build/ folder to hosting service
```

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```
NODE_ENV=production
PORT=5001
FIREBASE_PROJECT_ID=your_project_id
JWT_SECRET=your_secret_key
```

**Frontend (.env)**
```
REACT_APP_API_URL=https://your-backend-url/api
REACT_APP_ENV=production
```

## 📝 License

MIT License - See LICENSE file for details

## 👥 Author

Built with ❤️ for Smart City Management

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For support, email support@smartcity.com or open an issue on GitHub.

---

**Version:** 2.0.0  
**Last Updated:** 2024  
**Status:** Active & Maintained ✅
