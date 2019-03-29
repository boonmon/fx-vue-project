import Qs from 'qs'

//  baseURL 请求后台网关地址  wxUrl 微信http://url   trackUrl 埋点js地址
export default (() => {
    let config
    let nodeEnv = process.env.NODE_ENV
    if (nodeEnv === 'local') {
        config = {
            baseURL: 'http://appserver.wintax.cn/tree/back',
            wxUrl: 'http://twx.jchl.com',
            wxAppId: 'wxf4165bbc217ec388',
            trackUrl: 'http://omni.esv.com.cn/behavior/script/maidian.js',
            cmsImgvUrl: 'http://test.pxpt.wintax.cn/resource',
            wxImgvUrl: 'http://dwx.wintax.cn/resource',
            cdnUrl: 'http://10.10.0.213:8912/wxresource',
            fileUploadUrl: 'http://10.10.0.206:9001',
        }
    } else if (nodeEnv === 'test') {
        config = {
            baseURL: window.location.origin,
            wxUrl: 'http://twx.jchl.com',
            trackUrl: 'http://omni.esv.com.cn/behavior/script/maidian.js',
            cmsImgvUrl: 'http://tcms.jchl.com/resource',
            wxImgvUrl: 'http://twx.jchl.com/resource',
            cdnUrl: 'http://tcdn.jchl.com',
            fileUploadUrl: 'http://twx.jchl.com'
        }
    } else if (nodeEnv === 'dev') {
        // 是npm run builddev模式，不是npm run dev
        config = {
            baseURL: window.location.origin,
            wxUrl: window.location.origin,
            trackUrl: 'http://omni.esv.com.cn/behavior/script/maidian.js',
            cmsImgvUrl: 'http://test.pxpt.wintax.cn/resource',
            wxImgvUrl: 'http://dwx.wintax.cn/resource',
            cdnUrl: 'http://dcdn.jchl.com',
            fileUploadUrl: window.location.origin,
        }
    } else if (nodeEnv === 'preproduction') {
        config = {
            baseURL: window.location.origin,
            wxUrl: 'http://prwx.jchl.com',
            trackUrl: 'http://xwfx.jchl.com/maidian.js',
            cmsImgvUrl: 'http://cms-cdn.jchl.com/vfs_home',
            wxImgvUrl: 'http://prwx.jchl.com/resource',
            cdnUrl: 'http://cdn.jchl.com',
            fileUploadUrl: 'http://prwx.jchl.com',
        }
    } else if (nodeEnv === 'production') {
        config = {
            baseURL: window.location.origin,
            wxUrl: 'http://wx.jchl.com',
            trackUrl: 'http://xwfx.jchl.com/maidian.js',
            cmsImgvUrl: 'http://cms-cdn.jchl.com/vfs_home',
            wxImgvUrl: 'http://wx.jchl.com/resource',
            cdnUrl: 'http://cdn.jchl.com',
            fileUploadUrl: 'http://wx.jchl.com',
        }
    } else {
        // npm run dev模式
        config = {
            baseURL: window.location.origin,
            wxUrl: 'http://wx.jchl.com',
            trackUrl: 'http://omni.esv.com.cn/behavior/script/maidian.js',
            cmsImgvUrl: 'http://tcms.jchl.com/resource',
            wxImgvUrl: 'http://dwx.wintax.cn/resource',
            cdnUrl: 'http://cdn.jchl.com',
            fileUploadUrl: window.location.origin,
        }
    }
    config = {
        ...config,
        //添加通用配置
        url: '/route',
        appId: '000111', //微信企业主端调用接口配置
        gateway:'gateway',//默认过gateway网关
        method: 'POST',
        transformResponse: [
            function(data) {
                return data
            },
        ],
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        params: {},
        paramsSerializer: function(params) {
            return Qs.stringify(params)
        },
        data: {},
        timeout: 20000,
        withCredentials: false, // default
        responseType: 'json', // default
        onUploadProgress: function(progressEvent) {
            // Do whatever you want with the native progress event
        },
        onDownloadProgress: function(progressEvent) {
            // Do whatever you want with the native progress event
        },
        maxContentLength: 2000,
        validateStatus: function(status) {
            return status >= 200 && status < 300 // default
        },
        maxRedirects: 5, // default
    }
    return config
})()