/**
 * Main React App Component
 * Routes and navigation for Smart City Platform
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

// Components
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import AreaDetails from './pages/AreaDetails';
import Alerts from './pages/Alerts';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      setUser(JSON.parse(localStorage.getItem('user') || '{}'));
      fetchDashboardData();
    }
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/dashboard/overview`);
      setDashboardData(response.data.dashboard);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (credentials) => {
    // Simulated login
    localStorage.setItem('authToken', 'token_' + Date.now());
    localStorage.setItem('user', JSON.stringify({
      email: credentials.email,
      role: 'Admin'
    }));
    setIsAuthenticated(true);
    setUser({ email: credentials.email, role: 'Admin' });
    fetchDashboardData();
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage('dashboard');
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <Header user={user} onLogout={handleLogout} />
      <div className="app-container">
        <Sidebar currentPage={currentPage} onSelectPage={setCurrentPage} />
        <main className="main-content">
          {currentPage === 'dashboard' && <Dashboard data={dashboardData} />}
          {currentPage === 'areas' && <AreaDetails />}
          {currentPage === 'alerts' && <Alerts />}
          {currentPage === 'admin' && <AdminPanel />}
        </main>
      </div>
    </div>
  );
}

export default App;
