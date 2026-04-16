/**
 * Login Page
 */

import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('admin@smartcity.com');
  const [password, setPassword] = useState('password');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box glass-effect">
          <h1>🌍 Smart City</h1>
          <p>Resource Allocation Platform</p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-btn">Login</button>
          </form>

          <div className="login-demo">
            <p>Demo Credentials:</p>
            <code>admin@smartcity.com / password</code>
          </div>
        </div>

        <div className="login-info">
          <h2>Welcome to Smart City</h2>
          <p>Advanced Resource Allocation Platform with 10 Integrated Modules</p>
          <ul>
            <li>🔐 Secure Authentication</li>
            <li>📊 Real-time Dashboard</li>
            <li>🧠 Smart Resource Allocation</li>
            <li>🚨 Intelligent Alerts</li>
            <li>📈 Data Analytics</li>
            <li>⚡ Multi-Resource Management</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;
