const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(createProxyMiddleware('/api', { target: 'https://f59ta1758l.execute-api.us-east-1.amazonaws.com/', changeOrigin: true }))
}
