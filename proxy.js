const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Proxy configuration
app.use('/api', createProxyMiddleware({
    target: 'https://wedcam-eb80ccd082f6.herokuapp.com/', // Your Heroku backend URL
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', // Remove /api prefix when forwarding to Heroku
    },
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});
