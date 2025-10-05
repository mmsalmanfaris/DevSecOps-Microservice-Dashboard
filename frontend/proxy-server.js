const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

// Proxy API calls to backend services
app.use('/api/go', createProxyMiddleware({
  target: 'http://go-service:8081',
  changeOrigin: true,
  pathRewrite: { '^/api/go': '' }
}));

app.use('/api/python', createProxyMiddleware({
  target: 'http://python-service:8082',
  changeOrigin: true,
  pathRewrite: { '^/api/python': '' }
}));

app.use('/api/nodejs', createProxyMiddleware({
  target: 'http://nodejs-service:8083',
  changeOrigin: true,
  pathRewrite: { '^/api/nodejs': '' }
}));

app.use('/api/java', createProxyMiddleware({
  target: 'http://java-service:8084',
  changeOrigin: true,
  pathRewrite: { '^/api/java': '' }
}));

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
