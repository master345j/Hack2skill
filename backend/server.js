/**
 * Smart City Resource Allocation Dashboard - Backend Server
 * Node.js + Express API Server
 * Handles data management and Firebase integration
 */

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database for demonstration (replace with Firebase in production)
const resourceDatabase = {
  zones: {
    A: { demand: 45, allocation: 0, water: 35, electricity: 40, waste: 30 },
    B: { demand: 35, allocation: 0, water: 30, electricity: 35, waste: 25 },
    C: { demand: 20, allocation: 0, water: 20, electricity: 20, waste: 15 }
  },
  totalCapacity: {
    water: 100,
    electricity: 100,
    waste: 100
  },
  lastUpdated: new Date()
};

/**
 * Calculate smart allocation based on demand
 * Allocates resources proportionally to each zone's demand
 */
function calculateAllocation() {
  const zones = resourceDatabase.zones;
  const totalDemand = Object.values(zones).reduce((sum, zone) => sum + zone.demand, 0);

  // Calculate allocation for each zone
  Object.keys(zones).forEach(zoneKey => {
    zones[zoneKey].allocation = Math.round((zones[zoneKey].demand / totalDemand) * 100);
  });

  resourceDatabase.lastUpdated = new Date();
  return zones;
}

/**
 * GET /api/data
 * Fetches current resource data for all zones
 */
app.get('/api/data', (req, res) => {
  try {
    calculateAllocation();
    res.json({
      success: true,
      data: resourceDatabase.zones,
      totalCapacity: resourceDatabase.totalCapacity,
      lastUpdated: resourceDatabase.lastUpdated,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/summary
 * Fetches summary data for dashboard
 */
app.get('/api/summary', (req, res) => {
  try {
    const zones = resourceDatabase.zones;
    
    // Calculate average usage across zones
    const avgWater = Math.round(
      Object.values(zones).reduce((sum, z) => sum + z.water, 0) / Object.keys(zones).length
    );
    const avgElectricity = Math.round(
      Object.values(zones).reduce((sum, z) => sum + z.electricity, 0) / Object.keys(zones).length
    );
    const avgWaste = Math.round(
      Object.values(zones).reduce((sum, z) => sum + z.waste, 0) / Object.keys(zones).length
    );

    res.json({
      success: true,
      summary: {
        totalZones: Object.keys(zones).length,
        water: avgWater,
        electricity: avgElectricity,
        waste: avgWaste,
        overallUtilization: Math.round((avgWater + avgElectricity + avgWaste) / 3)
      },
      zones: zones,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * UPDATE /api/updateData
 * Updates demand for zones and recalculates allocation
 */
app.post('/api/updateData', (req, res) => {
  try {
    const { zone, demand, water, electricity, waste } = req.body;

    if (!zone || !resourceDatabase.zones[zone]) {
      return res.status(400).json({ success: false, error: 'Invalid zone' });
    }

    // Update zone data
    if (demand !== undefined) resourceDatabase.zones[zone].demand = demand;
    if (water !== undefined) resourceDatabase.zones[zone].water = water;
    if (electricity !== undefined) resourceDatabase.zones[zone].electricity = electricity;
    if (waste !== undefined) resourceDatabase.zones[zone].waste = waste;

    calculateAllocation();

    res.json({
      success: true,
      message: `Zone ${zone} updated successfully`,
      data: resourceDatabase.zones[zone],
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/allocateResources
 * Intelligently allocate resources based on real-time demand
 */
app.post('/api/allocateResources', (req, res) => {
  try {
    calculateAllocation();
    
    // Simulate resource optimization algorithm
    const zones = resourceDatabase.zones;
    const allocation = {};

    Object.keys(zones).forEach(zone => {
      const demand = zones[zone].demand;
      allocation[zone] = {
        zone,
        demand,
        allocatedWater: Math.round((demand / 100) * resourceDatabase.totalCapacity.water),
        allocatedElectricity: Math.round((demand / 100) * resourceDatabase.totalCapacity.electricity),
        allocatedWaste: Math.round((demand / 100) * resourceDatabase.totalCapacity.waste),
        optimizationLevel: 'HIGH'
      };
    });

    res.json({
      success: true,
      allocation,
      message: 'Resources allocated optimally',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'Server is running',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: err.message
  });
});

// Server startup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n✅ Smart City API Server running on http://localhost:${PORT}`);
  console.log(`📊 Dashboard Backend Ready!\n`);
  console.log('Available endpoints:');
  console.log('  GET  /api/health           - Health check');
  console.log('  GET  /api/data             - Fetch all zones data');
  console.log('  GET  /api/summary          - Fetch dashboard summary');
  console.log('  POST /api/updateData       - Update zone data');
  console.log('  POST /api/allocateResources - Allocate resources optimally\n');
});

module.exports = app;
