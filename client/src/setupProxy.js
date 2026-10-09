const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function setupProxy(app) {
  const target = 'http://localhost:4000';

  app.use('/api', createProxyMiddleware({
    target,
    changeOrigin: true,
    logLevel: 'warn',
  }));

  app.use('/uploads', createProxyMiddleware({
    target,
    changeOrigin: true,
    logLevel: 'warn',
  }));

  app.use('/health', createProxyMiddleware({
    target,
    changeOrigin: true,
    logLevel: 'warn',
  }));
};
