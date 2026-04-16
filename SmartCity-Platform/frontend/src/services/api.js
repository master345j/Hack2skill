const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = {
  // Authentication
  auth: {
    register: (email, password, role = 'Officer') => 
      fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      }),
    
    login: (email, password) => 
      fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
  },

  // Dashboard
  dashboard: {
    overview: () => fetch(`${API_BASE_URL}/dashboard/overview`),
    charts: () => fetch(`${API_BASE_URL}/dashboard/charts`)
  },

  // Areas
  areas: {
    list: () => fetch(`${API_BASE_URL}/areas`),
    get: (id) => fetch(`${API_BASE_URL}/areas/${id}`),
    create: (data) => 
      fetch(`${API_BASE_URL}/areas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }),
    update: (id, data) => 
      fetch(`${API_BASE_URL}/areas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
  },

  // Allocation
  allocation: {
    calculate: () => 
      fetch(`${API_BASE_URL}/allocation/calculate`, { method: 'POST' }),
    current: () => fetch(`${API_BASE_URL}/allocation/current`)
  },

  // Alerts
  alerts: {
    list: () => fetch(`${API_BASE_URL}/alerts`),
    create: (data) => 
      fetch(`${API_BASE_URL}/alerts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
  },

  // Analytics
  analytics: {
    trends: () => fetch(`${API_BASE_URL}/analytics/trends`),
    predictions: () => fetch(`${API_BASE_URL}/analytics/predictions`)
  },

  // Resources
  resources: {
    waste: () => fetch(`${API_BASE_URL}/waste/status`),
    water: () => fetch(`${API_BASE_URL}/water/status`),
    electricity: () => fetch(`${API_BASE_URL}/electricity/status`),
    realtime: () => fetch(`${API_BASE_URL}/realtime/status`)
  },

  // Health
  health: () => fetch(`${API_BASE_URL}/health`)
};

export default api;
