import React from 'react';

export const Button = ({ children, loading, variant = 'primary', ...props }) => (
  <button className={`btn btn-${variant}`} disabled={loading} {...props}>
    {loading ? 'Processing...' : children}
  </button>
);

export const Input = ({ label, error, ...props }) => (
  <div className="form-control" style={{ marginBottom: '1rem' }}>
    {label && <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>{label}</label>}
    <input className={`pro-input ${error ? 'error' : ''}`} {...props} style={{ width: '90%', padding: '0.75rem', borderRadius: '6px', border: '1px solid var(--border)' }} />
  </div>
);

export const DataState = ({ loading, error, dataLength, type, children }) => {
  if (loading) return <div className="loading-shimmer">Fetching {type} data...</div>;
  if (error) return <div className="card" style={{ color: 'var(--error)' }}>Error: {error}</div>;
  if (dataLength === 0) return <div className="empty-state">No {type} records found.</div>;
  return children;
};