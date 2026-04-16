/**
 * Header Component
 * Top navigation bar
 */

import React from 'react';
import './Header.css';

function Header({ user, onLogout }) {
  return (
    <header className="header">
      <div className="header-brand">
        <h1>🌍 Smart City Dashboard</h1>
        <p>Resource Allocation Platform v2.0</p>
      </div>
      
      <div className="header-info">
        <div className="status-item">
          <span className="status-indicator online"></span>
          <span>System Online</span>
        </div>
        
        <div className="user-section">
          <span className="user-email">{user?.email}</span>
          <span className="user-role">{user?.role}</span>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
