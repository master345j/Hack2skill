/**
 * API Communication Layer
 * Handles all backend API calls
 */

const API_BASE_URL = 'http://localhost:5000/api';

// Cache for data
let dataCache = {
    zones: {},
    summary: {},
    lastUpdate: null
};

/**
 * Make API Request
 */
async function apiCall(endpoint, method = 'GET', data = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${currentUser?.email || 'demo'}`
            }
        };

        if (data) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Call Error:', error);
        throw error;
    }
}

/**
 * Get All Resource Data
 */
async function fetchResourceData() {
    try {
        const result = await apiCall('/data');
        if (result.success) {
            dataCache.zones = result.data;
            dataCache.lastUpdate = result.lastUpdated;
            return result.data;
        }
    } catch (error) {
        console.error('Failed to fetch data:', error);
        showNotification('Failed to load data', 'error');
    }
}

/**
 * Get Dashboard Summary
 */
async function fetchDashboardSummary() {
    try {
        const result = await apiCall('/summary');
        if (result.success) {
            dataCache.summary = result.summary;
            return result;
        }
    } catch (error) {
        console.error('Failed to fetch summary:', error);
    }
}

/**
 * Update Zone Data
 */
async function updateZoneData(zone, data) {
    try {
        const payload = {
            zone,
            ...data
        };

        const result = await apiCall('/updateData', 'POST', payload);
        
        if (result.success) {
            showNotification(`Zone ${zone} updated successfully`, 'success');
            return result;
        }
    } catch (error) {
        console.error('Failed to update zone:', error);
        showNotification('Failed to update zone', 'error');
    }
}

/**
 * Allocate Resources Optimally
 */
async function allocateResources() {
    try {
        const result = await apiCall('/allocateResources', 'POST', {});
        
        if (result.success) {
            showNotification('Resources allocated optimally!', 'success');
            // Refresh dashboard data
            await refreshDashboard();
            return result.allocation;
        }
    } catch (error) {
        console.error('Failed to allocate resources:', error);
        showNotification('Failed to allocate resources', 'error');
    }
}

/**
 * Check Server Health
 */
async function checkServerHealth() {
    try {
        const result = await apiCall('/health');
        console.log('✅ Server Status:', result.status);
        return result.success;
    } catch (error) {
        console.warn('⚠️ Server not available, using demo data');
        return false;
    }
}

/**
 * Generate Sample Data (for demo mode)
 */
function generateSampleData() {
    return {
        A: {
            demand: 45,
            allocation: 36,
            water: 35,
            electricity: 40,
            waste: 30
        },
        B: {
            demand: 35,
            allocation: 28,
            water: 30,
            electricity: 35,
            waste: 25
        },
        C: {
            demand: 20,
            allocation: 16,
            water: 20,
            electricity: 20,
            waste: 15
        }
    };
}

/**
 * Refresh All Dashboard Data
 */
async function refreshDashboard() {
    try {
        // Try to fetch from server first
        const serverAvailable = await checkServerHealth();
        
        let zones;
        if (serverAvailable) {
            zones = await fetchResourceData();
        } else {
            // Use sample data if server not available
            zones = generateSampleData();
        }

        await fetchDashboardSummary();
        updateDashboardUI(zones);
        updateCharts(zones);
        
        return zones;
    } catch (error) {
        console.error('Failed to refresh dashboard:', error);
    }
}

/**
 * Export Data as JSON
 */
function exportDataAsJSON() {
    const exportData = {
        timestamp: new Date().toISOString(),
        user: currentUser?.email || 'demo',
        zones: dataCache.zones,
        summary: dataCache.summary
    };

    const dataString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([dataString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `smart-city-report-${new Date().getTime()}.json`;
    link.click();
    
    showNotification('Report exported successfully', 'success');
}

/**
 * Export Data as CSV
 */
function exportDataAsCSV() {
    let csv = 'Zone,Demand,Allocation,Water,Electricity,Waste\n';
    
    Object.entries(dataCache.zones).forEach(([zone, data]) => {
        csv += `${zone},${data.demand},${data.allocation},${data.water},${data.electricity},${data.waste}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `smart-city-report-${new Date().getTime()}.csv`;
    link.click();
    
    showNotification('CSV exported successfully', 'success');
}
