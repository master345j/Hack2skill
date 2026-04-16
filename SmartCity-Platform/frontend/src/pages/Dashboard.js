/**
 * Dashboard Page Component
 * Main dashboard with overview and charts
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StatCard from '../components/StatCard';
import ChartComponent from '../components/ChartComponent';
import './Dashboard.css';

const API_BASE_URL = 'http://localhost:5001/api';

function Dashboard({ data }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchChartData();
    const interval = setInterval(fetchChartData, 10000); // Refresh every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchChartData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/dashboard/charts`);
      setChartData(response.data.charts);
    } catch (error) {
      console.error('Failed to fetch chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatCard
          title="Water Usage"
          icon="💧"
          value={data?.resources?.water?.usage}
          capacity={data?.resources?.water?.capacity}
          percentage={data?.resources?.water?.percentage}
          color="water"
        />
        <StatCard
          title="Electricity Consumption"
          icon="⚡"
          value={data?.resources?.electricity?.usage}
          capacity={data?.resources?.electricity?.capacity}
          percentage={data?.resources?.electricity?.percentage}
          color="electricity"
        />
        <StatCard
          title="Waste Management"
          icon="🗑️"
          value={data?.resources?.waste?.usage}
          capacity={data?.resources?.waste?.capacity}
          percentage={data?.resources?.waste?.percentage}
          color="waste"
        />
        <StatCard
          title="Overall Efficiency"
          icon="📈"
          value={data?.efficiency}
          capacity={100}
          percentage={data?.efficiency}
          color="efficiency"
        />
      </div>

      {/* Charts Section */}
      <div className="charts-container">
        <div className="chart-item glass-effect">
          <h3>Demand vs Supply</h3>
          {chartData && <ChartComponent type="bar" data={chartData.demandVsSupply} />}
        </div>
        
        <div className="chart-item glass-effect">
          <h3>Resource Distribution</h3>
          {chartData && <ChartComponent type="pie" data={chartData.resourceDistribution} />}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-section glass-effect">
        <h3>System Summary</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span className="label">Total Areas:</span>
            <span className="value">{data?.areas}</span>
          </div>
          <div className="summary-item">
            <span className="label">Population Served:</span>
            <span className="value">{data?.totalPopulation?.toLocaleString()}</span>
          </div>
          <div className="summary-item">
            <span className="label">System Utilization:</span>
            <span className="value">{data?.utilization}%</span>
          </div>
          <div className="summary-item">
            <span className="label">Active Alerts:</span>
            <span className="value">{data?.alerts}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
