import React, { useState, useEffect } from 'react';
import './Dashboard.css';

// Service configuration - using proxy endpoints
const SERVICES = [
  {
    name: 'Go Service',
    description: 'System information and calculations',
    baseUrl: "/api/go",
    id: 'go',
    healthEndpoint: '/health'
  },
  {
    name: 'Python Service',
    description: 'Data processing and analysis',
    baseUrl: "/api/python", 
    id: 'python',
    healthEndpoint: '/health'
  },
  {
    name: 'Node.js Service',
    description: 'Session management and server stats',
    baseUrl: "/api/nodejs",
    id: 'nodejs',
    healthEndpoint: '/health'
  },
  {
    name: 'Java Service',
    description: 'Business logic processing',
    baseUrl: "/api/java",
    id: 'java',
    healthEndpoint: '/health'
  }
];

// HTTP client functions
const apiClient = {
  async checkHealth(baseUrl, healthEndpoint = '/health') {
    try {
      const response = await fetch(`${baseUrl}${healthEndpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Health check failed: ${error.message}`);
    }
  },

  async getServiceInfo(baseUrl) {
    try {
      const response = await fetch(`${baseUrl}/info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      throw new Error(`Service info request failed: ${error.message}`);
    }
  }
};

const Dashboard = () => {
  const [serviceStatuses, setServiceStatuses] = useState({});
  const [serviceResponses, setServiceResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestLoading, setRequestLoading] = useState({});

  // Check health of all services on component mount
  useEffect(() => {
    checkAllServicesHealth();
  }, []);

  const checkAllServicesHealth = async () => {
    setLoading(true);
    const statuses = {};

    for (const service of SERVICES) {
      try {
        const healthData = await apiClient.checkHealth(service.baseUrl, service.healthEndpoint);
        statuses[service.id] = {
          status: 'healthy',
          data: healthData,
          error: null,
          lastChecked: new Date().toISOString()
        };
      } catch (error) {
        statuses[service.id] = {
          status: 'unhealthy',
          data: null,
          error: error.message,
          lastChecked: new Date().toISOString()
        };
      }
    }

    setServiceStatuses(statuses);
    setLoading(false);
  };

  const getServiceInfo = async (serviceId) => {
    const service = SERVICES.find(s => s.id === serviceId);
    if (!service) return;

    // Set loading state for this specific service
    setRequestLoading(prev => ({ ...prev, [serviceId]: true }));

    try {
      const infoData = await apiClient.getServiceInfo(service.baseUrl);
      setServiceResponses(prev => ({
        ...prev,
        [serviceId]: {
          data: infoData,
          error: null,
          timestamp: new Date().toISOString()
        }
      }));
    } catch (error) {
      setServiceResponses(prev => ({
        ...prev,
        [serviceId]: {
          data: null,
          error: error.message,
          timestamp: new Date().toISOString()
        }
      }));
    } finally {
      setRequestLoading(prev => ({ ...prev, [serviceId]: false }));
    }
  };

  const getStatusDisplay = (serviceId) => {
    if (loading) {
      return { text: 'Checking...', className: 'status-loading' };
    }

    const serviceStatus = serviceStatuses[serviceId];
    if (!serviceStatus) {
      return { text: 'Unknown', className: 'status-unknown' };
    }

    if (serviceStatus.status === 'healthy') {
      return { text: 'Healthy', className: 'status-healthy' };
    } else {
      return { text: 'Unavailable', className: 'status-unhealthy' };
    }
  };

  const getErrorMessage = (serviceId) => {
    const serviceStatus = serviceStatuses[serviceId];
    return serviceStatus?.error || null;
  };

  const formatResponseData = (data) => {
    if (!data) return null;
    
    return (
      <div className="response-data">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="dashboard">
      <h2>Service Status Dashboard</h2>
      <p>Multi-language microservices architecture demonstration</p>
      
      <div className="dashboard-actions">
        <button 
          onClick={checkAllServicesHealth} 
          disabled={loading}
          className="refresh-button"
        >
          {loading ? 'Checking...' : 'Refresh Status'}
        </button>
      </div>
      
      <div className="services-grid">
        {SERVICES.map((service) => {
          const statusDisplay = getStatusDisplay(service.id);
          const errorMessage = getErrorMessage(service.id);
          const serviceResponse = serviceResponses[service.id];
          const isRequestLoading = requestLoading[service.id];
          const isServiceHealthy = serviceStatuses[service.id]?.status === 'healthy';
          
          return (
            <div key={service.id} className="service-card">
              <div className="service-header">
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <div className={`service-status ${statusDisplay.className}`}>
                  {statusDisplay.text}
                </div>
                {errorMessage && (
                  <div className="error-message">
                    {errorMessage}
                  </div>
                )}
                <div className="service-url">
                  {service.baseUrl}
                </div>
              </div>

              <div className="service-actions">
                <button
                  onClick={() => getServiceInfo(service.id)}
                  disabled={isRequestLoading || !isServiceHealthy}
                  className={`action-button ${isServiceHealthy ? 'primary' : 'disabled'}`}
                >
                  {isRequestLoading ? 'Loading...' : 'Get Service Info'}
                </button>
              </div>

              {serviceResponse && (
                <div className="service-response">
                  <h4>Response:</h4>
                  {serviceResponse.error ? (
                    <div className="response-error">
                      <strong>Error:</strong> {serviceResponse.error}
                    </div>
                  ) : (
                    <div className="response-success">
                      {formatResponseData(serviceResponse.data)}
                      <div className="response-timestamp">
                        Last updated: {new Date(serviceResponse.timestamp).toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;