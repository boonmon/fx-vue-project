'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
    /*const webpack = require('webpack')*/
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const WebpackBar = require('webpackbar');

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

{{#lint}}const createLintingRule = () => ({
    test: /\.(js|vue)$/,
    loader: 'eslint-loader',
    enforce: 'pre',
    include: [resolve('src'), resolve('test')],
    options: {
      formatter: require('eslint-friendly-formatter'),
      emitWarning: !config.dev.showEslintErrorsInOverlay
    }
  }){{/lint}}

const webpackConfig = {
    cache: true,
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: (process.env.NODE_ENV === 'production' ||
            process.env.NODE_ENV === 'test' ||
            process.env.NODE_ENV === 'preproduction' ||
            process.env.NODE_ENV === 'dev' ||
            process.env.NODE_ENV === 'local') ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            {{#if_eq build "standalone"}}
            'vue$': 'vue/dist/vue.esm.js',
            {{/if_eq}}
            '@': resolve('src'),
        }
    },
    module: {
        rules: [
            {{#lint}}
            ...(config.dev.useEslint ? [createLintingRule()] : []),
            {{/lint}}
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: ['babel-loader?cacheDirectory=true'],
                include: [resolve('src'), resolve('test'), resolve('node_modules/mint-ui/src/utils/dom.js')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    externals: {

    },
    plugins: [
            // 请确保引入这个插件！
            new VueLoaderPlugin(),
            new WebpackBar()
        ],
    node: {
        //node选项可以防止node包，还有 setImmediate 的 profill注入到代码中,具体查看node.js文档node对象栏
        // prevent webpack from injecting useless setImmediate polyfill because Vue
        // source contains it (although only uses it if it's native).
        //false: 什么都不提供。预期获取此对象的代码，可能会因为获取不到此对象，
        //触发 ReferenceError 而崩溃。尝试使用 require('modulename') 导入模块的代码，
        //可能会触发 Cannot find module "modulename" 错误。
        setImmediate: false,
        // prevent webpack from injecting mocks to Node native modules
        // that does not make sense for the client
        //提供一个空对象 
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
      }
}

module.exports = webpackConfig;