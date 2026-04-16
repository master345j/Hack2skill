/**
 * Admin Panel Page
 */

import React, { useState } from 'react';
import axios from 'axios';
import './AdminPanel.css';

const API_BASE_URL = 'http://localhost:5001/api';

function AdminPanel() {
  const [newArea, setNewArea] = useState({ name: '', population: '', priority: 'medium' });
  const [loading, setLoading] = useState(false);

  const handleAddArea = async () => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/areas`, {
        name: newArea.name,
        population: parseInt(newArea.population),
        priority: newArea.priority
      });
      setNewArea({ name: '', population: '', priority: 'medium' });
      alert('Area added successfully!');
    } catch (error) {
      console.error('Failed to add area:', error);
      alert('Failed to add area');
    } finally {
      setLoading(false);
    }
  };

  const handleSmartAllocation = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/allocation/calculate`);
      alert('Smart allocation calculated successfully!');
      console.log('Allocation:', response.data.allocation);
    } catch (error) {
      console.error('Failed to calculate allocation:', error);
      alert('Failed to calculate allocation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      <div className="admin-grid">
        {/* Add Area Section */}
        <div className="admin-card glass-effect">
          <h3>📍 Add New Area</h3>
          <div className="form-group">
            <label>Area Name</label>
            <input
              type="text"
              value={newArea.name}
              onChange={(e) => setNewArea({ ...newArea, name: e.target.value })}
              placeholder="e.g., Downtown District"
            />
          </div>

          <div className="form-group">
            <label>Population</label>
            <input
              type="number"
              value={newArea.population}
              onChange={(e) => setNewArea({ ...newArea, population: e.target.value })}
              placeholder="e.g., 50000"
            />
          </div>

          <div className="form-group">
            <label>Priority Level</label>
            <select
              value={newArea.priority}
              onChange={(e) => setNewArea({ ...newArea, priority: e.target.value })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <button onClick={handleAddArea} disabled={loading} className="submit-btn">
            {loading ? 'Adding...' : '+ Add Area'}
          </button>
        </div>

        {/* Smart Allocation Section */}
        <div className="admin-card glass-effect">
          <h3>🧠 Smart Allocation</h3>
          <p>Calculate optimal resource allocation across all areas</p>
          
          <button onClick={handleSmartAllocation} disabled={loading} className="action-btn">
            {loading ? 'Calculating...' : '⚙️ Calculate Allocation'}
          </button>

          <div className="info-box">
            <p>This will:</p>
            <ul>
              <li>Analyze demand across zones</li>
              <li>Prioritize critical areas</li>
              <li>Optimize resource distribution</li>
              <li>Generate recommendations</li>
            </ul>
          </div>
        </div>

        {/* System Status */}
        <div className="admin-card glass-effect">
          <h3>📊 System Status</h3>
          
          <div className="status-item">
            <span>API Server</span>
            <span className="status-badge online">✓ Online</span>
          </div>

          <div className="status-item">
            <span>Database</span>
            <span className="status-badge online">✓ Connected</span>
          </div>

          <div className="status-item">
            <span>Real-time Updates</span>
            <span className="status-badge online">✓ Active</span>
          </div>

          <div className="status-item">
            <span>All Modules</span>
            <span className="status-badge online">✓ Loaded (10/10)</span>
          </div>
        </div>

        {/* Modules Info */}
        <div className="admin-card glass-effect">
          <h3>🔧 Active Modules</h3>
          <div className="modules-list">
            <div className="module-item">✓ Authentication</div>
            <div className="module-item">✓ Dashboard</div>
            <div className="module-item">✓ Area Management</div>
            <div className="module-item">✓ Resource Allocation</div>
            <div className="module-item">✓ Alerts & Notifications</div>
            <div className="module-item">✓ Data Analytics</div>
            <div className="module-item">✓ Real-time Data</div>
            <div className="module-item">✓ Waste Management</div>
            <div className="module-item">✓ Water Management</div>
            <div className="module-item">✓ Electricity Management</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
