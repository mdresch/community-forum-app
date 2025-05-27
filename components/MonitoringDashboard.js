import { useState, useEffect, useCallback } from 'react';
import apiService from '../services/apiService.js';

const MonitoringDashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchMonitoringData = useCallback(async () => {
    if (loading) return; // Prevent concurrent requests
    
    setLoading(true);
    try {
      const params = {
        o: '4509261600522240',
        p: '4509346691350608',
        r: 'de:1'
      };
      
      const result = await apiService.monitoringRequest(params);
      setData(result);
      setError(null);
      setLastUpdate(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err.message);
      console.error('Monitoring fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    // Initial fetch
    fetchMonitoringData();

    // Set up polling with increased interval to reduce rate limiting
    const interval = setInterval(fetchMonitoringData, 45000); // Poll every 45 seconds

    return () => clearInterval(interval);
  }, [fetchMonitoringData]);

  const handleManualRefresh = () => {
    if (!loading) {
      fetchMonitoringData();
    }
  };

  if (error) {
    return (
      <div className="monitoring-dashboard error">
        <h2>Monitoring Dashboard</h2>
        <div className="error-message">
          <p>Error: {error}</p>
          <button onClick={handleManualRefresh} disabled={loading}>
            {loading ? 'Loading...' : 'Retry'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="monitoring-dashboard">
      <div className="monitoring-header">
        <h2>Monitoring Dashboard</h2>
        <div className="monitoring-controls">
          <span className="last-update">Last update: {lastUpdate}</span>
          <button onClick={handleManualRefresh} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </div>
      <div className="monitoring-content">
        {data ? (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p>Loading monitoring data...</p>
        )}
      </div>
    </div>
  );
};

export default MonitoringDashboard;