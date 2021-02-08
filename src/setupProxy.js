const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    proxy.createProxyMiddleware('/post', {
      target: 'http://localhost:3001'
    })
  )
};