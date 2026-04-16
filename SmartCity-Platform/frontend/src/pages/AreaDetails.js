/**
 * Area Management Page
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AreaDetails.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

function AreaDetails() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);

  useEffect(() => {
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/areas`);
      setAreas(response.data.areas);
    } catch (error) {
      console.error('Failed to fetch areas:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="area-details">
      <h2>Area Management</h2>

      <div className="areas-grid">
        {areas.map(area => (
          <div key={area.id} className="area-card glass-effect" onClick={() => setSelectedArea(area)}>
            <div className="area-header">
              <h3>{area.name}</h3>
              <span className={`priority ${area.priority}`}>{area.priority.toUpperCase()}</span>
            </div>

            <div className="area-stats">
              <div className="stat">
                <span className="label">Population</span>
                <span className="value">{area.population.toLocaleString()}</span>
              </div>
              <div className="stat">
                <span className="label">Status</span>
                <span className="value status">{area.status}</span>
              </div>
            </div>

            <div className="resources">
              <div className="resource-item">
                <span>💧 Water</span>
                <div className="resource-bar">
                  <div className="resource-fill" style={{ width: `${(area.demand.water / area.supply.water) * 100}%`, background: '#3b82f6' }}></div>
                </div>
              </div>
              <div className="resource-item">
                <span>⚡ Electricity</span>
                <div className="resource-bar">
                  <div className="resource-fill" style={{ width: `${(area.demand.electricity / area.supply.electricity) * 100}%`, background: '#f59e0b' }}></div>
                </div>
              </div>
              <div className="resource-item">
                <span>🗑️ Waste</span>
                <div className="resource-bar">
                  <div className="resource-fill" style={{ width: `${(area.demand.waste / area.supply.waste) * 100}%`, background: '#ef4444' }}></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedArea && (
        <div className="area-detail-modal glass-effect">
          <button className="close-btn" onClick={() => setSelectedArea(null)}>✕</button>
          <h3>{selectedArea.name}</h3>
          <div className="modal-content">
            <p><strong>Population:</strong> {selectedArea.population.toLocaleString()}</p>
            <p><strong>Priority:</strong> {selectedArea.priority}</p>
            <p><strong>Status:</strong> {selectedArea.status}</p>
            <div className="allocation-details">
              <h4>Resource Allocation</h4>
              <table>
                <thead>
                  <tr>
                    <th>Resource</th>
                    <th>Demand</th>
                    <th>Supply</th>
                    <th>Usage %</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>💧 Water</td>
                    <td>{selectedArea.demand.water}</td>
                    <td>{selectedArea.supply.water}</td>
                    <td>{Math.round((selectedArea.demand.water / selectedArea.supply.water) * 100)}%</td>
                  </tr>
                  <tr>
                    <td>⚡ Electricity</td>
                    <td>{selectedArea.demand.electricity}</td>
                    <td>{selectedArea.supply.electricity}</td>
                    <td>{Math.round((selectedArea.demand.electricity / selectedArea.supply.electricity) * 100)}%</td>
                  </tr>
                  <tr>
                    <td>🗑️ Waste</td>
                    <td>{selectedArea.demand.waste}</td>
                    <td>{selectedArea.supply.waste}</td>
                    <td>{Math.round((selectedArea.demand.waste / selectedArea.supply.waste) * 100)}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AreaDetails;
