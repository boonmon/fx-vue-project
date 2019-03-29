
var devName = "";
import localStorageUtil from '@/utils/localStorageUtil'
import config from "./config"
export default {
    /*******例子 start */
    example: {
        //method不传则默认为post
        method: 'post',
        //gateway定义网关名称,只用于baseURL,不传默认过gateway(在api/config中可改默认值),传空不过网关
        gateway: 'mgateway',
        uri: '/wechat/thirdparty/ocsp/getWechatWebJs',//接口地址
        develop: '-lzw',//本地开发时调用本地服务,不传则默认为normal
        appId: '',//可根据接口需要定义你的appId，不传则默认为全局appId
        config: {
            // 对 data 进行任意转换处理,不传默认对data的处理为 JSON.stringify(data)
            transformRequest: [function (data, headers) {
                //此处展示使用Qs.stringify()将对象 序列化成URL的形式，以&进行拼接
                return config.paramsSerializer(JSON.parse(data));
            }],
        }, //axios配置项，会更改api/config中的通用axios配置项已有的项，不传默认为{}
        defaultData: {
            token: '1',
            userId: '1'
        },//默认传参,
        notShowLoading: true,//是否显示loading层，在此定义这该接口在所有地方都不展示loading层，一般只是某个页面需要只需在写请求函数时单独配置; 
        cache: false, //是否做数据缓存，不传默认为false,等于true则将接口返回数据保存至sessionstory，下次请求时则自动读取缓存中的数据
        cacheName: 'vuetemp.example',//自定义缓存名称，最好要传，不传则为当前环境名称加该接口名称，例dev.example 
        //可创建自定义axios实例,用于需要特殊定制实例的请求接口,一般只需定义baseURL,headers,timeout
        instance: {
            //此处展示了大部分实例配置项，若不满足详情可见http://www.axios-js.com/zh-cn/docs/
            baseURL: '',//接口域名
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' },//请求头信息
            timeout: 20000,//请求超时设置
            responseType: 'json',//回复类型
            // `transformRequest` 允许在向服务器发送前，修改请求数据
            // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
            // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
            transformRequest: [function (data, headers) {
                // 对 data 进行任意转换处理
                return data;
            }],
            // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
            transformResponse: [function (data) {
                // 对 data 进行任意转换处理
                return data;
            }],
            // `params` 是即将与请求一起发送的 URL 参数
            // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
            params: {
                ID: 12345
            },
            // `paramsSerializer` 是一个负责 `params` 序列化的函数
            // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
            paramsSerializer: function (params) {
                return Qs.stringify(params, { arrayFormat: 'brackets' })
            },
            // `withCredentials` 表示跨域请求时是否需要使用凭证
            withCredentials: false, // 不传默认为false
        }
    },
    getWechatJsAuth: { url: "/wechat/thirdparty/ocsp/getWechatWebJs" },//一般POST请求只需定义url
    queryAllArea: {
        uri: config.cdnUrl + devName + '/weChatMall/json/areaJson/queryAllArea.json?token=1',
        method: 'get',
        cache: true
    }, //该例子展示了url的拼接方式,其中config.cdnUrl取代了baseURL
    /*******例子 end */

    /*******登录 start */
    getUrl: { url: '/wechatAuth/auth/wechatCommonService/getAuthUrl' },
    wechatCaptcha: { url: '/wechatAuth/auth/wechatCommonService/getWxCaptcha' },
    wechatLogin: { url: '/wechatAuth/auth/wechatCommonService/wechatLogin' },
    autoLogin: { url: '/wechatAuth/auth/wechatCommonService/autoLogin' },
    queryUserInfoByUserId: { url: '/wechat/front/chatWebService/getUserInfoByUserId' },
    // 2.3.11.更新token与企业关系
    reftokencustId: {
        url: '/auth/front/tokenService/saveCusId',
        defaultData: { token: localStorageUtil.getItem(localStorageUtil.WX_USER_TOKEN) }
    },
    // 退出登录
    logout: {
        url: '/wechat/front/chatWebService/unBingingWechat',
        defaultData: {
            token: localStorageUtil.getItem(localStorageUtil.WX_USER_TOKEN),
            appId: localStorageUtil.getItem(localStorageUtil.WX_USER_APPID)
        }
    }
    /*******登录 end */
}