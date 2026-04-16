/**
 * Alerts Page
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Alerts.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/alerts`);
      setAlerts(response.data.alerts);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
    } finally {
      setLoading(false);
    }
  };

  const createDemoAlert = async () => {
    try {
      await axios.post(`${API_BASE_URL}/alerts`, {
        type: 'resource_shortage',
        area: 'Zone A',
        severity: 'medium',
        message: 'Water level critically low'
      });
      fetchAlerts();
    } catch (error) {
      console.error('Failed to create alert:', error);
    }
  };

  return (
    <div className="alerts-page">
      <div className="alerts-header">
        <h2>System Alerts</h2>
        <button onClick={createDemoAlert} className="demo-btn">+ Create Demo Alert</button>
      </div>

      <div className="alerts-list">
        {alerts.length === 0 ? (
          <div className="no-alerts glass-effect">
            <p>✓ No active alerts</p>
            <small>System running smoothly</small>
          </div>
        ) : (
          alerts.map(alert => (
            <div key={alert.id} className={`alert-item glass-effect severity-${alert.severity}`}>
              <div className="alert-icon">
                {alert.severity === 'high' ? '🔴' : alert.severity === 'medium' ? '🟡' : '🟢'}
              </div>

              <div className="alert-content">
                <div className="alert-title">
                  <h4>{alert.type.replace(/_/g, ' ').toUpperCase()}</h4>
                  <span className="alert-area">{alert.area}</span>
                </div>
                <p>{alert.message}</p>
                <span className="alert-time">{new Date(alert.timestamp).toLocaleString()}</span>
              </div>

              <div className="alert-actions">
                <button className="mark-read">Mark</button>
                <button className="dismiss">✕</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Alerts;
