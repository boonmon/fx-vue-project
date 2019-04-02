
var devName = "";
import localStorageUtil from '@/utils/localStorageUtil'
import config from "./config"
export default {
    /*******例子 start  完整例子请看readme,有点长，就不放这里了*/
    getWechatJsAuth: { url: "/wechat/thirdparty/ocsp/getWechatWebJs" },//一般POST请求只需定义url
    queryAllArea: {
        uri: config.cdnUrl + devName + '/weChatMall/json/areaJson/queryAllArea.json?token=1',
        method: 'get',
        cache: true
    }, //该例子展示了url的拼接方式,其中config.cdnUrl取代了baseURL
    /*******例子 end */
    {{#login}}
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
    {{/login}}
}