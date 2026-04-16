/**
 * Sidebar Component
 * Navigation menu
 */

import React from 'react';
import './Sidebar.css';

function Sidebar({ currentPage, onSelectPage }) {
  const menuItems = [
    { id: 'dashboard', label: '📊 Dashboard', icon: '►' },
    { id: 'areas', label: '📍 Area Management', icon: '►' },
    { id: 'alerts', label: '🚨 Alerts', icon: '►' },
    { id: 'admin', label: '⚙️ Admin Panel', icon: '►' }
  ];

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map(item => (
          <button
            key={item.id}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            onClick={() => onSelectPage(item.id)}
          >
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="module-list">
          <p className="module-title">Modules Active</p>
          <ul>
            <li>✓ Auth</li>
            <li>✓ Dashboard</li>
            <li>✓ Areas</li>
            <li>✓ Allocation</li>
            <li>✓ Alerts</li>
            <li>✓ Analytics</li>
            <li>✓ Real-time</li>
            <li>✓ Waste</li>
            <li>✓ Water</li>
            <li>✓ Electricity</li>
          </ul>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
