//  baseURL 请求后台网关地址  wxUrl 微信http://url   trackUrl 埋点js地址
export default (() => {
    const env = process.env.CUR_ENV
    let config
        //配置不同环境所需的参数或参数值（按项目所需自行配置）
    if (env === 'development') {
        // npm run dev模式
        config = {
            baseURL: window.location.origin,
            templateIdList: [
                'pXDKOzIkX4eVdM1LpNqcSLjT00G9gYKSzye5nSPhclw',
                'beHZMrQO-Gd-Tw28lrL5mMlbuKqBLDWHAaYz4yjtzqE',
                '-XGID8s8ZCBQCFlOO_xXRFgO713wdXwCV36U7xzqjJ8',
            ],
            taxTemplateId: 'beHZMrQO-Gd-Tw28lrL5mMlbuKqBLDWHAaYz4yjtzqE',
            wxUrl: 'http://dwx.wintax.cn',
            wxAppId: 'wxf4165bbc217ec388',
            appId: 'c23087dbd171434697f356859e9e9a93',
            trackUrl: 'http://omni.esv.com.cn/behavior/script/maidian.js',
            cmsImgvUrl: 'http://tcms.jchl.com/resource',
            wxImgvUrl: 'http://dwx.wintax.cn/resource',
            cdnUrl: 'http://cdn.jchl.com',
            xyUrl: 'http://tq.jchl.com/mobile/index',
            encodeUrl: 'http://t.vanvy.cn:8082/Web/Im/mobile.html',
            fileUploadUrl: window.location.origin,
            expenseTypeUrl: 'http://dcdn.jchl.com/weChatMall/json/typeJson/expenseType.json',
            psbUrl: 'http://psb.mobi/api/dev',
        }
    } else if (env === 'dev') {
        // npm run build:dev模式
        config = {
            baseURL: 'http://dwx.wintax.cn',
            templateIdList: [
                'pXDKOzIkX4eVdM1LpNqcSLjT00G9gYKSzye5nSPhclw',
                'beHZMrQO-Gd-Tw28lrL5mMlbuKqBLDWHAaYz4yjtzqE',
                '-XGID8s8ZCBQCFlOO_xXRFgO713wdXwCV36U7xzqjJ8',
            ],
            taxTemplateId: 'beHZMrQO-Gd-Tw28lrL5mMlbuKqBLDWHAaYz4yjtzqE',
            wxUrl: 'http://dwx.wintax.cn',
            wxAppId: 'wx6f6e12681df4bd95',
            trackUrl: 'http://omni.esv.com.cn/behavior/script/maidian.js',
            cmsImgvUrl: 'http://tcms.jchl.com/resource',
            wxImgvUrl: 'http://dwx.wintax.cn/resource',
            cdnUrl: 'http://dcdn.jchl.com',
            xyUrl: 'http://tq.jchl.com/mobile/index',
            encodeUrl: 'http://t.vanvy.cn:8082/Web/Im/mobile.html',
            fileUploadUrl: 'http://dwx.wintax.cn',
            expenseTypeUrl: 'http://dcdn.jchl.com/weChatMall/json/typeJson/expenseType.json',
            psbUrl: 'http://psb.mobi/api/dev',
        }
    } else if (env === 'test') {
        config = {
            baseURL: 'http://10.10.7.17',
            templateIdList: [
                'Il7Mrz-7djmT9FiEZvsvqq37BRi2qp6UOVbjTApu8qA',
                'PSooUldowbsRj-oStXU04Fa-rHE-yycCaTDn5p-3gC4',
                '4D8-Jo-9cm22rP_-RRMwGu_DUT3jw_m-CqdDx0PuhSA',
            ],
            taxTemplateId: 'PSooUldowbsRj-oStXU04Fa-rHE-yycCaTDn5p-3gC4',
            wxUrl: 'http://10.10.7.17',
            wxAppId: 'wxf664fe22ede5921e',
            trackUrl: 'http://omni.esv.com.cn/behavior/script/maidian.js',
            cmsImgvUrl: 'http://10.10.7.17/resource',
            wxImgvUrl: 'http://10.10.7.17/resource',
            cdnUrl: 'http://tcdn.jchl.com',
            xyUrl: 'http://test.jchl.com:28080/mobile/index',
            encodeUrl: 'http://t.vanvy.cn:8082/Web/Im/mobile.html',
            fileUploadUrl: 'http://tpt.jchl.com',
            expenseTypeUrl: 'http://tcdn.jchl.com/weChatMall/json/typeJson/expenseType.json',
            psbUrl: 'http://psb.mobi/api/test',
        }
    } else if (env === 'preprod') {
        config = {
            baseURL: 'http://prwx.jchl.com',
            templateIdList: [
                'pXDKOzIkX4eVdM1LpNqcSLjT00G9gYKSzye5nSPhclw', //没用
                'beHZMrQO-Gd-Tw28lrL5mMlbuKqBLDWHAaYz4yjtzqE', //没用
                'zG-KVOJKdZRQEGMxABXilruw5_R_IxXNPtL9c2hucUA',
            ],
            wxUrl: 'http://prwx.jchl.com',
            wxAppId: 'wx5056a3b0136663bc',
            trackUrl: 'http://xwfx.jchl.com/maidian.js',
            cmsImgvUrl: 'http://cms-cdn.jchl.com/vfs_home',
            wxImgvUrl: 'http://prwx.jchl.com/resource',
            cdnUrl: 'http://cdn.jchl.com',
            xyUrl: 'http://xy.jchl.com/mobile/index',
            encodeUrl: 'http://t.vanvy.cn:8082/Web/Im/mobile.html',
            fileUploadUrl: 'http://prpt.jchl.com',
            expenseTypeUrl: 'http://ecdn.jchl.com/weChatMall/json/typeJson/expenseType.json',
            psbUrl: 'http://psb.mobi/api/pre',
        }
    } else if (env === 'prod') {
        config = {
            baseURL: 'http://wx.jchl.com',
            templateIdList: [
                '0Ot9Fht3fYWBBC4aQkH3MF4qYNNQZ--Bsi3B0B0UXVg',
                'JkKHrmHgq4LXJfcuJANdx9ixT325E6DoqWPuOHDBqlc',
                'Z6YG0T14Si5yLrU_NtN2vlVasGD6tlzuT1kMearqvTM',
            ],
            taxTemplateId: 'JkKHrmHgq4LXJfcuJANdx9ixT325E6DoqWPuOHDBqlc',
            wxUrl: 'http://wx.jchl.com',
            wxAppId: 'wx35102306dfc2506e',
            trackUrl: 'http://xwfx.jchl.com/maidian.js',
            cmsImgvUrl: 'http://cms-cdn.jchl.com/vfs_home',
            wxImgvUrl: 'http://wx.jchl.com/resource',
            cdnUrl: 'http://cdn.jchl.com',
            xyUrl: 'http://xy.jchl.com/mobile/index',
            encodeUrl: 'http://t.vanvy.cn:8082/Web/Im/mobile.html',
            fileUploadUrl: 'http://pt.jchl.com',
            expenseTypeUrl: 'http://cdn.jchl.com/weChatMall/json/typeJson/expenseType.json',
            psbUrl: 'http://psb.jchl.com/api',
        }
    }

    config = {
        ...config,

        // 添加通用配置
        busTypeId: '', //业产品线id
        url: '/route',
        appId: 'c23087dbd171434697f356859e9e9a93', //
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        paramsSerializer: function(params) {
            return Qs.stringify(params)
        },
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