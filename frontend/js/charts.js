/**
 * Chart.js Integration
 * Data visualization for resource allocation
 */

let distributionChart = null;
let demandChart = null;

/**
 * Initialize Charts on Page Load
 */
document.addEventListener('DOMContentLoaded', () => {
    initCharts();
});

/**
 * Initialize All Charts
 */
function initCharts() {
    initDistributionChart();
    initDemandChart();
}

/**
 * Initialize Resource Distribution Chart (Pie Chart)
 */
function initDistributionChart() {
    const ctx = document.getElementById('distributionChart');
    if (!ctx) return;

    distributionChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Zone A', 'Zone B', 'Zone C'],
            datasets: [{
                data: [45, 35, 20],
                backgroundColor: [
                    'rgba(0, 212, 255, 0.8)',
                    'rgba(124, 58, 237, 0.8)',
                    'rgba(236, 72, 153, 0.8)'
                ],
                borderColor: [
                    'rgba(0, 212, 255, 1)',
                    'rgba(124, 58, 237, 1)',
                    'rgba(236, 72, 153, 1)'
                ],
                borderWidth: 2,
                borderRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            family: "'Inter', sans-serif",
                            size: 13,
                            weight: '500'
                        },
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: 'rgba(0, 212, 255, 0.5)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

/**
 * Initialize Demand vs Allocation Chart (Bar Chart)
 */
function initDemandChart() {
    const ctx = document.getElementById('demandChart');
    if (!ctx) return;

    demandChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Zone A', 'Zone B', 'Zone C'],
            datasets: [
                {
                    label: 'Demand (%)',
                    data: [45, 35, 20],
                    backgroundColor: 'rgba(0, 212, 255, 0.6)',
                    borderColor: 'rgba(0, 212, 255, 1)',
                    borderWidth: 2,
                    borderRadius: 6,
                    hoverBackgroundColor: 'rgba(0, 212, 255, 0.8)'
                },
                {
                    label: 'Allocation (%)',
                    data: [36, 28, 16],
                    backgroundColor: 'rgba(124, 58, 237, 0.6)',
                    borderColor: 'rgba(124, 58, 237, 1)',
                    borderWidth: 2,
                    borderRadius: 6,
                    hoverBackgroundColor: 'rgba(124, 58, 237, 0.8)'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            indexAxis: 'x',
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            family: "'Inter', sans-serif",
                            size: 13,
                            weight: '500'
                        },
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: 'rgba(255, 255, 255, 0.9)',
                    borderColor: 'rgba(0, 212, 255, 0.5)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.5)',
                        font: {
                            family: "'Inter', sans-serif",
                            size: 12
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.7)',
                        font: {
                            family: "'Inter', sans-serif",
                            size: 12,
                            weight: '500'
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                }
            }
        }
    });
}

/**
 * Update All Charts with New Data
 */
function updateCharts(zones) {
    if (!zones) return;

    // Update Distribution Chart
    if (distributionChart) {
        distributionChart.data.datasets[0].data = [
            zones.A.demand,
            zones.B.demand,
            zones.C.demand
        ];
        distributionChart.update('none'); // No animation
    }

    // Update Demand Chart
    if (demandChart) {
        demandChart.data.datasets[0].data = [
            zones.A.demand,
            zones.B.demand,
            zones.C.demand
        ];
        demandChart.data.datasets[1].data = [
            zones.A.allocation,
            zones.B.allocation,
            zones.C.allocation
        ];
        demandChart.update('none');
    }
}

/**
 * Add Real-time Data Point (for future WebSocket integration)
 */
function addChartDataPoint(chartInstance, label, data) {
    if (!chartInstance) return;

    chartInstance.data.labels.push(label);
    chartInstance.data.datasets.forEach(dataset => {
        dataset.data.push(Math.random() * 100);
    });

    // Keep only last 10 data points
    if (chartInstance.data.labels.length > 10) {
        chartInstance.data.labels.shift();
        chartInstance.data.datasets.forEach(dataset => {
            dataset.data.shift();
        });
    }

    chartInstance.update();
}

/**
 * Export Chart as Image
 */
function exportChartAsImage(chartInstance, filename) {
    if (!chartInstance) return;

    const link = document.createElement('a');
    link.href = chartInstance.canvas.toDataURL();
    link.download = `${filename}-${new Date().getTime()}.png`;
    link.click();
}

/**
 * Reset Charts to Default
 */
function resetCharts() {
    if (distributionChart) {
        distributionChart.destroy();
        initDistributionChart();
    }

    if (demandChart) {
        demandChart.destroy();
        initDemandChart();
    }
}
