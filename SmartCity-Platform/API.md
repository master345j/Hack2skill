# API Documentation - Smart City Platform

## Base URL
```
Development: http://localhost:5001/api
Production: https://smart-city-backend.onrender.com/api
```

## Authentication
Most endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

---

## 📝 Endpoints Reference

### 1. Authentication Module

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@smartcity.com",
  "password": "securepassword",
  "role": "Admin"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "user": { "id": "...", "email": "...", "role": "Admin" }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@smartcity.com",
  "password": "password"
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": "...", "email": "...", "role": "Admin" }
}
```

---

### 2. Dashboard Module

#### Get Overview
```http
GET /dashboard/overview

Response:
{
  "dashboard": {
    "resources": {
      "water": { "usage": 7500, "capacity": 10000, "percentage": 75 },
      "electricity": { "usage": 8200, "capacity": 10000, "percentage": 82 },
      "waste": { "usage": 4500, "capacity": 6000, "percentage": 75 }
    },
    "efficiency": 77,
    "areas": 3,
    "totalPopulation": 150000,
    "utilization": 78,
    "alerts": 2
  }
}
```

#### Get Chart Data
```http
GET /dashboard/charts

Response:
{
  "charts": {
    "demandVsSupply": {
      "labels": ["Zone A", "Zone B", "Zone C"],
      "demand": [7500, 6800, 5200],
      "supply": [10000, 9000, 8500]
    },
    "resourceDistribution": {
      "labels": ["Water", "Electricity", "Waste"],
      "values": [7500, 8200, 4500]
    }
  }
}
```

---

### 3. Area Management Module

#### List All Areas
```http
GET /areas

Response:
{
  "areas": [
    {
      "id": "zone_1",
      "name": "Downtown",
      "population": 50000,
      "priority": "high",
      "status": "operational",
      "demand": { "water": 5000, "electricity": 6000, "waste": 2500 },
      "supply": { "water": 8000, "electricity": 8000, "waste": 4000 }
    },
    ...
  ]
}
```

#### Create New Area
```http
POST /areas
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "New District",
  "population": 30000,
  "priority": "medium"
}

Response:
{
  "success": true,
  "area": { "id": "...", "name": "New District", ... }
}
```

#### Get Area Details
```http
GET /areas/:id

Response:
{
  "area": {
    "id": "zone_1",
    "name": "Downtown",
    "population": 50000,
    "priority": "high",
    "status": "operational"
    ...
  }
}
```

#### Update Area
```http
PUT /areas/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "population": 55000,
  "priority": "medium"
}

Response:
{
  "success": true,
  "area": { ... }
}
```

---

### 4. Resource Allocation Module

#### Calculate Smart Allocation
```http
POST /allocation/calculate
Authorization: Bearer <token>

Response:
{
  "allocation": [
    {
      "zone": "Downtown",
      "demandRatio": 0.75,
      "priority": "high",
      "allocatedResources": 8500,
      "recommendation": "Increase infrastructure by 15%"
    },
    ...
  ]
}
```

#### Get Current Allocation
```http
GET /allocation/current

Response:
{
  "allocation": [ ... ],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

### 5. Alerts Module

#### Get All Alerts
```http
GET /alerts

Response:
{
  "alerts": [
    {
      "id": "alert_1",
      "type": "resource_shortage",
      "area": "Downtown",
      "severity": "high",
      "message": "Water supply critically low",
      "timestamp": "2024-01-15T10:25:00Z",
      "status": "active"
    },
    ...
  ]
}
```

#### Create Alert
```http
POST /alerts
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "resource_shortage",
  "area": "Zone A",
  "severity": "medium",
  "message": "Water level critically low"
}

Response:
{
  "success": true,
  "alert": { ... }
}
```

---

### 6. Analytics Module

#### Get Trends
```http
GET /analytics/trends

Response:
{
  "trends": {
    "water": {
      "lastMonth": 1500000,
      "thisMonth": 1450000,
      "trend": -3.3,
      "forecast": "decreasing"
    },
    "electricity": {
      "lastMonth": 1800000,
      "thisMonth": 1900000,
      "trend": 5.6,
      "forecast": "increasing"
    },
    "waste": {
      "lastMonth": 600000,
      "thisMonth": 620000,
      "trend": 3.3,
      "forecast": "stable"
    }
  }
}
```

#### Get Predictions
```http
GET /analytics/predictions

Response:
{
  "predictions": [
    {
      "resource": "water",
      "prediction": "shortage expected in 2 weeks",
      "confidence": 0.85,
      "recommendedAction": "Increase infrastructure capacity"
    },
    ...
  ]
}
```

---

### 7. Real-time Module

#### Get Real-time Status
```http
GET /realtime/status

Response:
{
  "zones": [
    {
      "zone": "Downtown",
      "waterLevel": 75,
      "electricityLoad": 82,
      "wasteCapacity": 65,
      "lastUpdate": "2024-01-15T10:35:00Z"
    },
    ...
  ]
}
```

---

### 8. Waste Management Module

#### Get Waste Status
```http
GET /waste/status

Response:
{
  "waste": {
    "totalCollected": 4500,
    "capacity": 6000,
    "utilization": 75,
    "zones": [
      {
        "zone": "Downtown",
        "collected": 2000,
        "capacity": 3000,
        "status": "operational",
        "nextPickup": "2024-01-17T08:00:00Z"
      },
      ...
    ]
  }
}
```

---

### 9. Water Management Module

#### Get Water Status
```http
GET /water/status

Response:
{
  "water": {
    "totalUsage": 7500,
    "capacity": 10000,
    "utilization": 75,
    "leakageDetected": false,
    "zones": [
      {
        "zone": "Downtown",
        "usage": 5000,
        "capacity": 8000,
        "status": "normal",
        "leakageRisk": 2
      },
      ...
    ]
  }
}
```

---

### 10. Electricity Management Module

#### Get Electricity Status
```http
GET /electricity/status

Response:
{
  "electricity": {
    "totalConsumption": 8200,
    "capacity": 10000,
    "utilization": 82,
    "peakHoursActive": true,
    "zones": [
      {
        "zone": "Downtown",
        "consumption": 6000,
        "capacity": 8000,
        "loadBalance": 75,
        "status": "high"
      },
      ...
    ]
  }
}
```

---

### 11. System Health

#### Health Check
```http
GET /health

Response:
{
  "status": "ok",
  "timestamp": "2024-01-15T10:35:00Z",
  "modules": [
    "Authentication",
    "Dashboard",
    "Area Management",
    "Resource Allocation",
    "Alerts & Notifications",
    "Data Analytics",
    "Real-time Data",
    "Waste Management",
    "Water Management",
    "Electricity Management"
  ],
  "version": "2.0.0"
}
```

---

## Error Responses

### 400 - Bad Request
```json
{
  "success": false,
  "message": "Invalid input parameters",
  "errors": ["Email is required", "Password must be at least 8 characters"]
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "message": "Authentication required",
  "error": "Missing or invalid token"
}
```

### 403 - Forbidden
```json
{
  "success": false,
  "message": "Insufficient permissions"
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 - Server Error
```json
{
  "success": false,
  "message": "Internal server error",
  "error": "Database connection failed"
}
```

---

## Rate Limiting

API rate limits:
- Public endpoints: 100 requests/minute
- Authenticated endpoints: 1000 requests/minute
- WebSocket connections: 10 concurrent per user

---

## Pagination

For list endpoints:
```http
GET /areas?page=1&limit=10&sort=-name

Query Parameters:
- page: page number (default: 1)
- limit: items per page (default: 10, max: 100)
- sort: field to sort by (- for descending)
- filter: additional filters
```

---

## Webhooks

**Coming in v2.1**
- Alert notifications
- Resource threshold changes
- System status updates

---

## Testing with cURL

```bash
# Health check
curl http://localhost:5001/api/health

# Login
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@smartcity.com","password":"password"}'

# Get areas
curl -X GET http://localhost:5001/api/areas \
  -H "Authorization: Bearer YOUR_TOKEN"

# Create area
curl -X POST http://localhost:5001/api/areas \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Area","population":30000,"priority":"medium"}'
```

---

## SDK/Client Libraries

### JavaScript/Node.js
```javascript
import api from './src/services/api.js';

api.areas.list()
  .then(r => r.json())
  .then(data => console.log(data));
```

### Python
```python
import requests

BASE_URL = "http://localhost:5001/api"
response = requests.get(f"{BASE_URL}/areas")
print(response.json())
```

---

## API Version

Current: **v2.0.0**
- 10 modules
- 40+ endpoints
- Real-time updates
- Advanced analytics

---

For more information, visit: https://github.com/master345j/Hack2skill
