'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
    // 使用临时构建字段
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
module.exports = {
    build: {
        env: process.env.NODE_ENV === 'production' ? require('./buildprod.env.js') :
            (process.env.NODE_ENV === 'test' ? require('./buildtest.env.js') :
                (process.env.NODE_ENV === 'dev' ? require('./builddev.env.js') :
                    (process.env.NODE_ENV === 'local' ? require('./buildlocal.env.js') :
                        require('./buildpreprod.env.js')))),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: "",
        productionSourceMap: (process.env.NODE_ENV != 'production'),
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
    },
    dev: {
        env: require('./dev.env'),
        port: 8011,
        host: getLocalIP(),
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '',
        proxyTable: {
            //过网关
            //微信模块+授权模块
            '/wechat': {
                target: 'http://twx.jchl.com/gateway',
                // target: 'http://dwx.wintax.cn/gateway',
                changeOrigin: true
            },
            '/wechatAuth': {
                target: 'http://twx.jchl.com/gateway',
                changeOrigin: true
            },
            '/security': {
                target: 'http://twx.jchl.com/gateway',
                changeOrigin: true
            },
            '/ehall': {
                target: 'http://twx.jchl.com/gateway',
                changeOrigin: true
            },
            '/auth': {
                target: 'http://twx.jchl.com/gateway',
                changeOrigin: true
            },
            '/activity': {
                target: 'http://twx.jchl.com/gateway',
                changeOrigin: true
            },
            '/customer': {
                target: 'http://twx.jchl.com/gateway',
                changeOrigin: true
            },
            '/notify': {
                target: 'http://twx.jchl.com/gateway',
                changeOrigin: true
            },
            '/cms': {
                target: 'http://twx.jchl.com/gateway',
                changeOrigin: true,

            },
            '/receiptCenter': {
                target: 'http://twx.jchl.com/gateway',
                changeOrigin: true
            },
            '/expense': {
                target: 'http://twx.jchl.com/gateway',
                changeOrigin: true
            },
            '/fileGateway': {
                target: 'http://twx.jchl.com',
                // target: 'http://10.10.0.206:9001',
                changeOrigin: true
            },

            '/thirdparty/ocsp': {
                target: 'http://twx.jchl.com/gateway',
                changeOrigin: true
            },

            '/resource': {
                target: 'http://twx.jchl.com',
                changeOrigin: true
            },
            '/ifipublic': {
                target: 'http://jchl.com/gateway',
                changeOrigin: true
            },
            '/app': {
                target: 'http://newapp.wintax.cn',
                changeOrigin: true
            },
            '/wechatDomainAuth': {
                target: 'http://wx.jchl.com',
                changeOrigin: true
            },
            '/training': {
                target: 'http://twx.jchl.com/gateway',
                changeOrigin: true
            },
            '/ordercenter': {
                target: 'http://twx.jchl.com/gateway',
                changeOrigin: true
            },
        },
        poll: false,
        cssSourceMap: false
    }
}