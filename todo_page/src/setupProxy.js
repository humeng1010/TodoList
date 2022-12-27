const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api', {
            target: 'http://localhost', //配置转发目标地址
            changeOrigin: true,
            pathRewrite: { '^/api': '' } //去除请求前缀
        }),

    )
}