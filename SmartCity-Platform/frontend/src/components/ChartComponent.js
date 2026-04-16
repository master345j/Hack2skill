/**
 * Chart Component
 * Wrapper for Chart.js
 */

import React from 'react';

function ChartComponent({ type, data }) {
  // This is a placeholder - in a real app, use react-chartjs-2
  return (
    <div style={{
      height: '300px',
      background: 'rgba(148, 163, 184, 0.1)',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#94a3b8'
    }}>
      <p>{type} Chart - {data ? 'Ready' : 'Loading'}</p>
    </div>
  );
}

export default ChartComponent;
