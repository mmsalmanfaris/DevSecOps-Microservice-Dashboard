const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8083;

// Store start time for uptime calculation
const startTime = Date.now();

// Middleware
app.use(cors());
app.use(express.json());

// Simulate active connections counter
let activeConnections = 0;

// Health check endpoint
app.get('/health', (req, res) => {
  const uptime = Date.now() - startTime;
  const uptimeSeconds = Math.floor(uptime / 1000);
  const memoryUsage = process.memoryUsage();
  
  res.status(200).json({
    status: 'healthy',
    service: 'nodejs-service',
    timestamp: new Date().toISOString(),
    uptime: formatUptime(uptimeSeconds),
    memoryUsage: {
      rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
      heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
      heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`
    }
  });
});

// Info endpoint with session simulation and server statistics
app.get('/info', (req, res) => {
  // Simulate session activity
  activeConnections = Math.floor(Math.random() * 20) + 1;
  
  const uptime = Date.now() - startTime;
  const uptimeSeconds = Math.floor(uptime / 1000);
  const memoryUsage = process.memoryUsage();
  
  res.status(200).json({
    service: 'nodejs-service',
    language: 'Node.js',
    timestamp: new Date().toISOString(),
    sessionInfo: {
      activeConnections: activeConnections,
      uptime: formatUptime(uptimeSeconds),
      memoryUsage: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`
    },
    nodeVersion: process.version,
    serverStats: {
      platform: process.platform,
      arch: process.arch,
      pid: process.pid,
      cpuUsage: process.cpuUsage()
    }
  });
});

// Helper function to format uptime
function formatUptime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
}

// Start server
const server = app.listen(PORT, () => {
  console.log(`Node.js service running on port ${PORT}`);
});

module.exports = { app, server };