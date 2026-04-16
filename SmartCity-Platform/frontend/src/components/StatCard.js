/**
 * StatCard Component
 * Display resource statistics
 */

import React from 'react';
import './StatCard.css';

function StatCard({ title, icon, value, capacity, percentage, color }) {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-header">
        <span className="stat-icon">{icon}</span>
        <h3>{title}</h3>
      </div>

      <div className="stat-value">
        <span className="number">{value}</span>
        <span className="unit">/ {capacity}</span>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
      </div>

      <div className="stat-footer">
        <span className="percentage">{percentage}%</span>
        <span className={`status ${percentage > 80 ? 'warning' : 'normal'}`}>
          {percentage > 80 ? '⚠️ High' : '✓ Normal'}
        </span>
      </div>
    </div>
  );
}

export default StatCard;
