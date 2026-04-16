/**
 * Smart City Resource Allocation Platform - Main Server
 * Advanced Backend with 10 Modules
 * Author: Smart City Team
 * Version: 2.0.0
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database (replace with Firebase in production)
const database = {
  users: {
    'admin@smartcity.com': {
      id: 'admin-001',
      email: 'admin@smartcity.com',
      password: 'hashed_password',
      role: 'Admin',
      createdAt: new Date().toISOString()
    }
  },
  areas: {
    'zone-a': {
      id: 'zone-a',
      name: 'Downtown',
      population: 50000,
      demand: { water: 45, electricity: 60, waste: 35 },
      supply: { water: 50, electricity: 70, waste: 40 },
      priority: 'high',
      status: 'active',
      lastUpdated: new Date().toISOString()
    },
    'zone-b': {
      id: 'zone-b',
      name: 'Residential',
      population: 35000,
      demand: { water: 35, electricity: 45, waste: 30 },
      supply: { water: 40, electricity: 55, waste: 35 },
      priority: 'medium',
      status: 'active',
      lastUpdated: new Date().toISOString()
    },
    'zone-c': {
      id: 'zone-c',
      name: 'Industrial',
      population: 15000,
      demand: { water: 60, electricity: 80, waste: 50 },
      supply: { water: 70, electricity: 90, waste: 55 },
      priority: 'high',
      status: 'active',
      lastUpdated: new Date().toISOString()
    }
  },
  alerts: [],
  resources: {
    water: { total: 160, available: 160, type: 'essential' },
    electricity: { total: 215, available: 215, type: 'essential' },
    waste: { total: 125, available: 125, type: 'management' }
  },
  allocation: {
    current: {},
    history: [],
    lastCalculated: null
  }
};

/**
 * ============ MODULE 1: AUTHENTICATION ============
 */

// POST /api/auth/register - Register new user
app.post('/api/auth/register', (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password required' });
    }

    if (database.users[email]) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    database.users[email] = {
      id: uuidv4(),
      email,
      password: 'hashed_' + password,
      name,
      role: role || 'City Officer',
      createdAt: new Date().toISOString()
    };

    res.json({
      success: true,
      message: 'User registered successfully',
      user: { email, name, role: role || 'City Officer' }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/auth/login - User login
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    const user = database.users[email];

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    res.json({
      success: true,
      message: 'Login successful',
      token: 'jwt_token_' + uuidv4(),
      user: { email: user.email, name: user.name, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * ============ MODULE 2: DASHBOARD ============
 */

// GET /api/dashboard/overview - Main dashboard data
app.get('/api/dashboard/overview', (req, res) => {
  try {
    const areas = Object.values(database.areas);
    const totalDemand = areas.reduce((sum, area) => sum + area.demand.water + area.demand.electricity + area.demand.waste, 0);
    const totalSupply = areas.reduce((sum, area) => sum + area.supply.water + area.supply.electricity + area.supply.waste, 0);
    const utilization = Math.round((totalDemand / totalSupply) * 100);

    res.json({
      success: true,
      dashboard: {
        timestamp: new Date().toISOString(),
        resources: {
          water: { usage: 130, capacity: 160, percentage: Math.round((130/160)*100) },
          electricity: { usage: 185, capacity: 215, percentage: Math.round((185/215)*100) },
          waste: { usage: 115, capacity: 125, percentage: Math.round((115/125)*100) }
        },
        areas: areas.length,
        totalPopulation: areas.reduce((sum, area) => sum + area.population, 0),
        utilization,
        alerts: database.alerts.length,
        efficiency: 87
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/dashboard/charts - Chart data
app.get('/api/dashboard/charts', (req, res) => {
  try {
    const areas = Object.values(database.areas);
    
    res.json({
      success: true,
      charts: {
        demandVsSupply: {
          areas: areas.map(a => a.name),
          demand: areas.map(a => a.demand.water + a.demand.electricity + a.demand.waste),
          supply: areas.map(a => a.supply.water + a.supply.electricity + a.supply.waste)
        },
        resourceDistribution: {
          labels: ['Water', 'Electricity', 'Waste'],
          data: [130, 185, 115],
          colors: ['#3b82f6', '#f59e0b', '#ef4444']
        },
        usagePerArea: {
          areas: areas.map(a => ({ name: a.name, usage: a.demand.water + a.demand.electricity + a.demand.waste }))
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * ============ MODULE 3: AREA MANAGEMENT ============
 */

// GET /api/areas - List all areas
app.get('/api/areas', (req, res) => {
  try {
    const areas = Object.values(database.areas);
    res.json({
      success: true,
      areas,
      count: areas.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/areas/:id - Get specific area
app.get('/api/areas/:id', (req, res) => {
  try {
    const area = database.areas[req.params.id];
    if (!area) {
      return res.status(404).json({ success: false, error: 'Area not found' });
    }

    res.json({
      success: true,
      area: {
        ...area,
        analytics: {
          waterUsagePercentage: Math.round((area.demand.water / area.supply.water) * 100),
          electricityUsagePercentage: Math.round((area.demand.electricity / area.supply.electricity) * 100),
          wastePercentage: Math.round((area.demand.waste / area.supply.waste) * 100),
          populationDensity: area.population / 100,
          efficiency: 85
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/areas - Add new area
app.post('/api/areas', (req, res) => {
  try {
    const { name, population, priority } = req.body;
    const id = 'zone-' + uuidv4().substring(0, 4);

    const newArea = {
      id,
      name,
      population,
      demand: { water: 30, electricity: 40, waste: 25 },
      supply: { water: 50, electricity: 60, waste: 40 },
      priority: priority || 'medium',
      status: 'active',
      lastUpdated: new Date().toISOString()
    };

    database.areas[id] = newArea;

    res.status(201).json({
      success: true,
      message: 'Area added successfully',
      area: newArea
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/areas/:id - Update area
app.put('/api/areas/:id', (req, res) => {
  try {
    const area = database.areas[req.params.id];
    if (!area) {
      return res.status(404).json({ success: false, error: 'Area not found' });
    }

    const { name, population, priority, status } = req.body;
    
    if (name) area.name = name;
    if (population) area.population = population;
    if (priority) area.priority = priority;
    if (status) area.status = status;
    area.lastUpdated = new Date().toISOString();

    res.json({
      success: true,
      message: 'Area updated successfully',
      area
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * ============ MODULE 4: RESOURCE ALLOCATION (SMART LOGIC) ============
 */

// POST /api/allocation/calculate - Calculate smart allocation
app.post('/api/allocation/calculate', (req, res) => {
  try {
    const areas = Object.values(database.areas);
    const allocation = {};

    // Smart allocation algorithm
    areas.forEach(area => {
      const waterRatio = area.demand.water / area.supply.water;
      const electricityRatio = area.demand.electricity / area.supply.electricity;
      const wasteRatio = area.demand.waste / area.supply.waste;

      allocation[area.id] = {
        area: area.name,
        water: {
          allocated: Math.min(area.demand.water, area.supply.water),
          ratio: Math.round(waterRatio * 100),
          priority: area.priority === 'high' ? 'prioritized' : 'standard'
        },
        electricity: {
          allocated: Math.min(area.demand.electricity, area.supply.electricity),
          ratio: Math.round(electricityRatio * 100),
          priority: area.priority === 'high' ? 'prioritized' : 'standard'
        },
        waste: {
          allocated: Math.min(area.demand.waste, area.supply.waste),
          ratio: Math.round(wasteRatio * 100),
          priority: area.priority === 'high' ? 'prioritized' : 'standard'
        },
        optimization: {
          efficiency: 85 + Math.random() * 10,
          recommendation: waterRatio > 0.9 ? 'Increase water supply' : 'Optimal'
        }
      };
    });

    database.allocation.current = allocation;
    database.allocation.lastCalculated = new Date().toISOString();

    res.json({
      success: true,
      message: 'Smart allocation calculated',
      allocation,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/allocation/current - Get current allocation
app.get('/api/allocation/current', (req, res) => {
  try {
    res.json({
      success: true,
      allocation: database.allocation.current || {},
      lastCalculated: database.allocation.lastCalculated
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * ============ MODULE 5: ALERTS & NOTIFICATIONS ============
 */

// GET /api/alerts - List all alerts
app.get('/api/alerts', (req, res) => {
  try {
    res.json({
      success: true,
      alerts: database.alerts,
      count: database.alerts.length
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST /api/alerts - Create alert
app.post('/api/alerts', (req, res) => {
  try {
    const { type, area, severity, message } = req.body;

    const alert = {
      id: uuidv4(),
      type,
      area,
      severity: severity || 'medium',
      message,
      timestamp: new Date().toISOString(),
      read: false
    };

    database.alerts.push(alert);

    // Keep last 100 alerts
    if (database.alerts.length > 100) {
      database.alerts = database.alerts.slice(-100);
    }

    res.status(201).json({
      success: true,
      message: 'Alert created',
      alert
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * ============ MODULE 6: DATA ANALYTICS ============
 */

// GET /api/analytics/trends - Trend analysis
app.get('/api/analytics/trends', (req, res) => {
  try {
    res.json({
      success: true,
      trends: {
        water: {
          current: 130,
          previous: 125,
          trend: 'up',
          percentage: 4,
          forecast: 135
        },
        electricity: {
          current: 185,
          previous: 180,
          trend: 'up',
          percentage: 3,
          forecast: 190
        },
        waste: {
          current: 115,
          previous: 110,
          trend: 'up',
          percentage: 5,
          forecast: 120
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/analytics/predictions - Predictive insights
app.get('/api/analytics/predictions', (req, res) => {
  try {
    res.json({
      success: true,
      predictions: {
        peakHours: '18:00 - 22:00',
        predictedDemand: {
          water: 145,
          electricity: 210,
          waste: 130
        },
        recommendations: [
          'Prepare for peak electricity usage at 18:00',
          'Monitor water supply in industrial zone',
          'Schedule waste collection at 20:00'
        ]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * ============ MODULE 7: REAL-TIME DATA ============
 */

// GET /api/realtime/status - Real-time status
app.get('/api/realtime/status', (req, res) => {
  try {
    res.json({
      success: true,
      realtime: {
        timestamp: new Date().toISOString(),
        status: 'connected',
        areas: Object.keys(database.areas).map(key => {
          const area = database.areas[key];
          return {
            id: area.id,
            name: area.name,
            status: 'online',
            dataQuality: 98
          };
        })
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * ============ MODULE 8: WASTE MANAGEMENT ============
 */

// GET /api/waste/status - Waste management status
app.get('/api/waste/status', (req, res) => {
  try {
    const areas = Object.values(database.areas);
    
    res.json({
      success: true,
      waste: {
        totalCollected: 115,
        capacity: 125,
        overflowRisk: areas
          .filter(a => (a.demand.waste / a.supply.waste) > 0.85)
          .map(a => ({ area: a.name, level: Math.round((a.demand.waste / a.supply.waste) * 100 + '%') })),
        collectionSchedule: [
          { area: 'Downtown', time: '08:00', frequency: 'daily' },
          { area: 'Residential', time: '10:00', frequency: 'daily' },
          { area: 'Industrial', time: '14:00', frequency: 'daily' }
        ]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * ============ MODULE 9: WATER MANAGEMENT ============
 */

// GET /api/water/status - Water management status
app.get('/api/water/status', (req, res) => {
  try {
    const areas = Object.values(database.areas);
    const waterUsage = areas.reduce((sum, a) => sum + a.demand.water, 0);
    
    res.json({
      success: true,
      water: {
        totalUsage: waterUsage,
        totalCapacity: 160,
        usagePercentage: Math.round((waterUsage / 160) * 100),
        leakageDetection: {
          status: 'normal',
          areas: areas
            .filter(() => Math.random() < 0.2)
            .map(a => ({ area: a.name, anomaly: 'slight spike detected' }))
        },
        distribution: areas.map(a => ({
          area: a.name,
          usage: a.demand.water,
          capacity: a.supply.water,
          status: a.demand.water / a.supply.water > 0.85 ? 'warning' : 'normal'
        }))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * ============ MODULE 10: ELECTRICITY MANAGEMENT ============
 */

// GET /api/electricity/status - Electricity management status
app.get('/api/electricity/status', (req, res) => {
  try {
    const areas = Object.values(database.areas);
    const electricityUsage = areas.reduce((sum, a) => sum + a.demand.electricity, 0);
    
    res.json({
      success: true,
      electricity: {
        totalConsumption: electricityUsage,
        totalCapacity: 215,
        consumptionPercentage: Math.round((electricityUsage / 215) * 100),
        peakTimes: ['08:00', '12:00', '18:00', '21:00'],
        loadBalancing: {
          status: 'balanced',
          recommendations: 'Slight increase in industrial zone load'
        },
        distribution: areas.map(a => ({
          area: a.name,
          consumption: a.demand.electricity,
          capacity: a.supply.electricity,
          loadFactor: Math.round((a.demand.electricity / a.supply.electricity) * 100) + '%'
        }))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * ============ HEALTH CHECK ============
 */

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'Server running',
    timestamp: new Date().toISOString(),
    modules: [
      'Authentication',
      'Dashboard',
      'Area Management',
      'Resource Allocation',
      'Alerts',
      'Analytics',
      'Real-time Data',
      'Waste Management',
      'Water Management',
      'Electricity Management'
    ]
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path
  });
});

// Server startup
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════════════════════════╗
  ║   🌍 SMART CITY RESOURCE ALLOCATION PLATFORM              ║
  ║   Advanced Backend Server v2.0.0                          ║
  ║                                                            ║
  ║   Status: ✅ RUNNING ON PORT ${PORT}                           ║
  ║                                                            ║
  ║   Available Modules:                                      ║
  ║   ✓ Authentication                                        ║
  ║   ✓ Dashboard Analytics                                   ║
  ║   ✓ Area Management                                       ║
  ║   ✓ Smart Resource Allocation                             ║
  ║   ✓ Alerts & Notifications                                ║
  ║   ✓ Data Analytics                                        ║
  ║   ✓ Real-time Updates                                     ║
  ║   ✓ Waste Management                                      ║
  ║   ✓ Water Management                                      ║
  ║   ✓ Electricity Management                                ║
  ║                                                            ║
  ║   API Ready: http://localhost:${PORT}/api                    ║
  ║   Health: http://localhost:${PORT}/api/health                ║
  ╚════════════════════════════════════════════════════════════╝
  `);
});

module.exports = app;
