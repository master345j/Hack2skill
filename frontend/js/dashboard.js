/**
 * Dashboard Main Logic
 * Handles UI updates and real-time data management
 */

let refreshInterval = null;

/**
 * Initialize Dashboard
 */
async function initDashboard() {
    console.log('🚀 Initializing Dashboard...');
    
    // Set up event listeners
    setupEventListeners();
    
    // Initial data load
    await refreshDashboard();
    
    // Set up auto-refresh (every 10 seconds)
    refreshInterval = setInterval(async () => {
        await refreshDashboard();
    }, 10000);
}

/**
 * Set Up Event Listeners
 */
function setupEventListeners() {
    // Allocation button
    document.getElementById('allocateBtn').addEventListener('click', async () => {
        showNotification('Allocating resources...', 'info');
        await allocateResources();
    });

    // Refresh button
    document.getElementById('refreshBtn').addEventListener('click', async () => {
        showNotification('Refreshing data...', 'info');
        await refreshDashboard();
    });

    // Export button
    document.getElementById('exportBtn').addEventListener('click', () => {
        exportDataAsJSON();
    });
}

/**
 * Update Dashboard UI with Zone Data
 */
function updateDashboardUI(zones) {
    if (!zones) return;

    // Update Zone A
    if (zones.A) {
        document.getElementById('zoneADemand').textContent = `${zones.A.demand}%`;
        document.getElementById('zoneAAllocation').textContent = `${zones.A.allocation}%`;
        document.getElementById('zoneAWater').textContent = `${zones.A.water}%`;
        document.getElementById('zoneAElectricity').textContent = `${zones.A.electricity}%`;
        document.getElementById('zoneAWaste').textContent = `${zones.A.waste}%`;
    }

    // Update Zone B
    if (zones.B) {
        document.getElementById('zoneBDemand').textContent = `${zones.B.demand}%`;
        document.getElementById('zoneBAllocation').textContent = `${zones.B.allocation}%`;
        document.getElementById('zoneBWater').textContent = `${zones.B.water}%`;
        document.getElementById('zoneBElectricity').textContent = `${zones.B.electricity}%`;
        document.getElementById('zoneBWaste').textContent = `${zones.B.waste}%`;
    }

    // Update Zone C
    if (zones.C) {
        document.getElementById('zoneCDemand').textContent = `${zones.C.demand}%`;
        document.getElementById('zoneCAllocation').textContent = `${zones.C.allocation}%`;
        document.getElementById('zoneCWater').textContent = `${zones.C.water}%`;
        document.getElementById('zoneCElectricity').textContent = `${zones.C.electricity}%`;
        document.getElementById('zoneCWaste').textContent = `${zones.C.waste}%`;
    }

    // Calculate and update stats
    const avgWater = Math.round((zones.A.water + zones.B.water + zones.C.water) / 3);
    const avgElectricity = Math.round((zones.A.electricity + zones.B.electricity + zones.C.electricity) / 3);
    const avgWaste = Math.round((zones.A.waste + zones.B.waste + zones.C.waste) / 3);

    // Update stat cards
    document.getElementById('waterStat').textContent = `${avgWater}%`;
    document.getElementById('waterProgress').style.width = `${avgWater}%`;

    document.getElementById('electricityStat').textContent = `${avgElectricity}%`;
    document.getElementById('electricityProgress').style.width = `${avgElectricity}%`;

    document.getElementById('wasteStat').textContent = `${avgWaste}%`;
    document.getElementById('wasteProgress').style.width = `${avgWaste}%`;

    // Update last updated timestamp
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
    });
    document.getElementById('lastUpdate').textContent = timeString;
}

/**
 * Open Zone Update Modal
 */
function openZoneModal(zone) {
    const zones = dataCache.zones;
    if (!zones[zone]) return;

    document.getElementById('zoneModalTitle').textContent = zone;
    document.getElementById('zoneDemand').value = zones[zone].demand;
    document.getElementById('zoneWater').value = zones[zone].water;
    document.getElementById('zoneElectricity').value = zones[zone].electricity;
    document.getElementById('zoneWaste').value = zones[zone].waste;

    // Store current zone for form submission
    document.getElementById('zoneModal').dataset.zone = zone;
    document.getElementById('zoneModal').classList.remove('hidden');
}

/**
 * Close Zone Update Modal
 */
function closeZoneModal() {
    document.getElementById('zoneModal').classList.add('hidden');
}

/**
 * Handle Zone Form Submission
 */
document.addEventListener('DOMContentLoaded', () => {
    const zoneForm = document.getElementById('zoneForm');
    zoneForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const zone = document.getElementById('zoneModal').dataset.zone;
        const data = {
            demand: parseInt(document.getElementById('zoneDemand').value),
            water: parseInt(document.getElementById('zoneWater').value),
            electricity: parseInt(document.getElementById('zoneElectricity').value),
            waste: parseInt(document.getElementById('zoneWaste').value)
        };

        await updateZoneData(zone, data);
        await refreshDashboard();
        closeZoneModal();
    });
});

/**
 * Show Notification Toast
 */
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    
    // Remove previous classes
    notification.classList.remove('success', 'error', 'info');
    
    // Add new class
    notification.classList.add(type, 'show');
    
    // Set message
    notification.textContent = message;
    
    // Auto hide after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

/**
 * Cleanup on Page Unload
 */
window.addEventListener('beforeunload', () => {
    if (refreshInterval) {
        clearInterval(refreshInterval);
    }
});

/**
 * Handle Visibility Changes (pause updates when tab is hidden)
 */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (refreshInterval) {
            clearInterval(refreshInterval);
            refreshInterval = null;
        }
    } else {
        // Resume updates when tab is visible
        refreshInterval = setInterval(async () => {
            await refreshDashboard();
        }, 10000);
    }
});

/**
 * Keyboard Shortcuts
 */
document.addEventListener('keydown', (e) => {
    // Ctrl+R or Cmd+R to refresh
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        refreshDashboard();
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        closeZoneModal();
    }
});
