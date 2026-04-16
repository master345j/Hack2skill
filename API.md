# 📡 API Documentation - Smart City Dashboard

Complete API reference for backend endpoints.

## Base URL

```
http://localhost:5000/api
```

## Authentication

Currently uses demo token in requests:
```
Authorization: Bearer your_email@example.com
```

## Endpoints

### 1. Health Check

**Endpoint**: `GET /api/health`

**Description**: Check if server is running and responsive.

**Response**:
```json
{
  "success": true,
  "status": "Server is running",
  "uptime": 123.45,
  "timestamp": "2026-04-16T10:30:00Z"
}
```

**Status Code**: 200

---

### 2. Get All Zone Data

**Endpoint**: `GET /api/data`

**Description**: Fetch current resource data for all zones.

**Query Parameters**: None

**Response**:
```json
{
  "success": true,
  "data": {
    "A": {
      "demand": 45,
      "allocation": 36,
      "water": 35,
      "electricity": 40,
      "waste": 30
    },
    "B": {
      "demand": 35,
      "allocation": 28,
      "water": 30,
      "electricity": 35,
      "waste": 25
    },
    "C": {
      "demand": 20,
      "allocation": 16,
      "water": 20,
      "electricity": 20,
      "waste": 15
    }
  },
  "totalCapacity": {
    "water": 100,
    "electricity": 100,
    "waste": 100
  },
  "lastUpdated": "2026-04-16T10:30:00Z",
  "timestamp": "2026-04-16T10:30:00Z"
}
```

**Status Code**: 200

**Example**:
```bash
curl http://localhost:5000/api/data
```

---

### 3. Get Dashboard Summary

**Endpoint**: `GET /api/summary`

**Description**: Fetch aggregated summary data for the dashboard.

**Response**:
```json
{
  "success": true,
  "summary": {
    "totalZones": 3,
    "water": 28,
    "electricity": 32,
    "waste": 23,
    "overallUtilization": 28
  },
  "zones": {
    "A": { ... },
    "B": { ... },
    "C": { ... }
  },
  "timestamp": "2026-04-16T10:30:00Z"
}
```

**Status Code**: 200

**Example**:
```bash
curl http://localhost:5000/api/summary
```

---

### 4. Update Zone Data

**Endpoint**: `POST /api/updateData`

**Description**: Update demand and resource metrics for a specific zone.

**Request Body**:
```json
{
  "zone": "A",
  "demand": 50,
  "water": 40,
  "electricity": 45,
  "waste": 35
}
```

**Parameters**:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| zone | string | Yes | Zone identifier: A, B, or C |
| demand | number | No | Demand percentage (0-100) |
| water | number | No | Water usage percentage (0-100) |
| electricity | number | No | Electricity usage percentage (0-100) |
| waste | number | No | Waste processing percentage (0-100) |

**Response**:
```json
{
  "success": true,
  "message": "Zone A updated successfully",
  "data": {
    "demand": 50,
    "allocation": 40,
    "water": 40,
    "electricity": 45,
    "waste": 35
  },
  "updatedAt": "2026-04-16T10:30:00Z"
}
```

**Status Codes**: 
- 200: Success
- 400: Invalid zone
- 500: Server error

**Example**:
```bash
curl -X POST http://localhost:5000/api/updateData \
  -H "Content-Type: application/json" \
  -d '{
    "zone": "A",
    "demand": 50,
    "water": 40,
    "electricity": 45,
    "waste": 35
  }'
```

---

### 5. Allocate Resources Optimally

**Endpoint**: `POST /api/allocateResources`

**Description**: Calculate and apply smart resource allocation based on demand.

**Request Body**: 
```json
{}
```
(Empty body - uses current zone demands)

**Response**:
```json
{
  "success": true,
  "allocation": {
    "A": {
      "zone": "A",
      "demand": 50,
      "allocatedWater": 50,
      "allocatedElectricity": 50,
      "allocatedWaste": 50,
      "optimizationLevel": "HIGH"
    },
    "B": {
      "zone": "B",
      "demand": 35,
      "allocatedWater": 35,
      "allocatedElectricity": 35,
      "allocatedWaste": 35,
      "optimizationLevel": "HIGH"
    },
    "C": {
      "zone": "C",
      "demand": 15,
      "allocatedWater": 15,
      "allocatedElectricity": 15,
      "allocatedWaste": 15,
      "optimizationLevel": "HIGH"
    }
  },
  "message": "Resources allocated optimally",
  "timestamp": "2026-04-16T10:30:00Z"
}
```

**Status Codes**:
- 200: Success
- 500: Server error

**Example**:
```bash
curl -X POST http://localhost:5000/api/allocateResources \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message describing the issue",
  "timestamp": "2026-04-16T10:30:00Z"
}
```

### Common Errors

**Invalid Zone**
```json
{
  "success": false,
  "error": "Invalid zone"
}
```

**Server Error**
```json
{
  "success": false,
  "error": "Internal server error"
}
```

**CORS Error**
```
Access to XMLHttpRequest at 'http://localhost:5000/api/...' 
from origin 'http://localhost:8000' has been blocked by CORS policy
```

## Request Examples

### Using cURL

```bash
# Get health status
curl http://localhost:5000/api/health

# Get all zones data
curl http://localhost:5000/api/data

# Get summary
curl http://localhost:5000/api/summary

# Update Zone A
curl -X POST http://localhost:5000/api/updateData \
  -H "Content-Type: application/json" \
  -d '{"zone":"A", "demand":55}'

# Allocate resources
curl -X POST http://localhost:5000/api/allocateResources \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Using JavaScript Fetch

```javascript
// Get data
const response = await fetch('http://localhost:5000/api/data');
const data = await response.json();
console.log(data);

// Update zone
const updateResponse = await fetch('http://localhost:5000/api/updateData', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    zone: 'A',
    demand: 55,
    water: 45,
    electricity: 50,
    waste: 40
  })
});
const updateData = await updateResponse.json();
console.log(updateData);
```

### Using Axios

```javascript
// Install: npm install axios

const axios = require('axios');

// Get data
axios.get('http://localhost:5000/api/data')
  .then(response => console.log(response.data))
  .catch(error => console.error(error));

// Update zone
axios.post('http://localhost:5000/api/updateData', {
  zone: 'A',
  demand: 55
})
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

### Using Postman

1. Create new collection "Smart City API"
2. Add requests:
   - GET http://localhost:5000/api/data
   - GET http://localhost:5000/api/summary
   - POST http://localhost:5000/api/updateData
   - POST http://localhost:5000/api/allocateResources

## Rate Limiting

Current: No rate limiting (add in production)

Recommended for production:
```bash
npm install express-rate-limit
```

## Authentication

For production with Firebase:
```javascript
// Verify Firebase token
const authToken = req.headers.authorization?.split(' ')[1];
const decodedToken = await admin.auth().verifyIdToken(authToken);
```

## Testing

### Load Testing

```bash
# Using Apache Bench
ab -n 1000 -c 10 http://localhost:5000/api/data

# Using hey (Go tool)
go get -u github.com/rakyll/hey
hey -n 1000 -c 10 http://localhost:5000/api/data
```

### Integration Testing

```bash
# Using REST Client extension in VS Code
@base = http://localhost:5000/api

### Health Check
GET {{base}}/health

### Get All Data
GET {{base}}/data

### Update Zone
POST {{base}}/updateData
Content-Type: application/json

{
  "zone": "A",
  "demand": 50
}

### Allocate Resources
POST {{base}}/allocateResources
```

## Response Time

Expected response times:
- Health check: < 10ms
- Get data: < 50ms
- Update data: < 100ms
- Allocate resources: < 150ms

## Version History

**v1.0.0** - Initial API release
- 5 endpoints
- JSON responses
- Error handling

## Future Enhancements

- [ ] WebSocket for real-time updates
- [ ] GraphQL endpoint
- [ ] API versioning (/v1/api/)
- [ ] Rate limiting
- [ ] Advanced filtering
- [ ] Pagination support
- [ ] Caching headers
- [ ] API documentation (Swagger/OpenAPI)

---

**Last Updated**: April 2026
