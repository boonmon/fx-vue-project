'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

// 获取内网IP
function getLocalIP() {
    var os = require('os'),
        iptable = {},
        ifaces = os.networkInterfaces(),
        localIP = ''
    for (var dev in ifaces) {
        if (localIP) {
            break
        } else {
            ifaces[dev].forEach(function(details, alias) {
                if (details.family == 'IPv4') {
                    if (/^10\./.test(details.address) || /^192\.168/.test(details.address)) {
                        localIP = details.address
                        return
                    }
                }
            })
        }
        return localIP
    }
}

const rootDir = 'test' // 根据项目内容自定义上下文

module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            //跨域代理
            '/mgateway': {
                // target: 'http://dwx.wintax.cn/', //开发环境
                target: 'http://tmachine.jchl.com/', //测试环境
                changeOrigin: true,
            },
            '/gateway/cms': {
                target: 'http://10.10.0.206:8989',
                changeOrigin: true,
                pathRewrite: {
                    "^/gateway/cms": "/cms"
                }
            },
        },
        // Various Dev Server settings
        host: getLocalIP(), // can be overwritten by process.env.HOST
        port: 8020, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/' + rootDir + '/',

        /**
         * Source Maps
         */

        productionSourceMap: false,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}