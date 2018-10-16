import localStorageUtil from '@/utils/localStorageUtil'
import {
    standardAsync
} from '@/api/async';
/*import {
    Toast
} from "mint-ui";*/
import api from '@/api/';
// import { addUrlParams } from '@/common/commonFun'

const JsSdk_OPTIONS = {
    isWxConfig: false,
    title: "",
    desc: "",
    imgUrl: "",
    wechatCode: "",
    link: window.location.href,
}

export const wxJsSdk = {
    /**
     * 微信JS-SDK初始化设置
     */

    initWxConfig: (callback, that, wechatCode) => {
        let _this = this;
        const url = encodeURIComponent(window.location.href.split("#")[0]);
        var param = {};
        /*   var ua = window.navigator.userAgent.toLowerCase();
           if (!window.isWeiXin()) {
               console.log('%c%s', 'color:red', 'ECM')
               return
           }*/
        param.wechatCode = localStorageUtil.getItem(
            localStorageUtil.WX_USER_WECHAT_CODE
        );
        if (wechatCode) {
            param.wechatCode = wechatCode;
        }
        if (!param.wechatCode && that) {
            param.wechatCode = that.$route.query.wechatCode;
        }
        if (!param.wechatCode) {
            param.wechatCode = api.getQueryString('wechatCode');
        }
        if (!param.wechatCode) {
            param.wechatCode = api.getQueryString('state');
        }
        JsSdk_OPTIONS.wechatCode = param.wechatCode;

        param.url = url;
        console.log("wechatCode1111=======>" + param.wechatCode);
        standardAsync(that, "getWechatJsAuth", param, res => {
            var wxInfo = res.body;
            console.log("授权返回数据=====>");
            wx.config({
                debug: false, ////生产环境需要关闭debug模式
                appId: wxInfo.appId, //appId通过微信服务号后台查看
                timestamp: wxInfo.timestamp, //生成签名的时间戳
                nonceStr: wxInfo.nonceStr, //生成签名的随机字符串
                signature: wxInfo.signature, //签名
                jsApiList: [
                    //需要调用的JS接口列表
                    "getLocation",
                    "chooseImage",
                    "uploadImage",
                    "scanQRCode",
                    "onMenuShareTimeline", //分享给好友
                    "onMenuShareAppMessage", //分享到朋友圈
                    "onMenuShareQQ", //分享到QQ
                    "onMenuShareQZone", //分享到QQ空间,
                    "closeWindow" //关闭窗口
                ]
            });
            wx.ready(function() {
                JsSdk_OPTIONS.isWxConfig = true;
                //初始化成功之后再回调分享信息设置
                callback && callback();
                // Toast("初始化成功");
            });
        });
    },
    /**
     * 关闭窗口
     */
    closeWindow: (options) => {
        if (!JsSdk_OPTIONS.isWxConfig) {
            // Toast("微信配置初始化中，请稍后再试！");
            return;
        }
        wx.closeWindow();
    },
    /**
     * 微信分享监听配置
     */
    toShare: (options) => {

        if (options) {
            JsSdk_OPTIONS.title = options.title;
            JsSdk_OPTIONS.desc = options.desc;
            JsSdk_OPTIONS.imgUrl = options.imgUrl;
            JsSdk_OPTIONS.link = options.link
        }
        /*   if (!window.isWeiXin()) {

               return
           }*/
        if (!JsSdk_OPTIONS.isWxConfig) {
            // Toast("微信配置初始化中，请稍后再试！");
            return;
        }

        //Toast("请通过微信右上角菜单分享！")
        //JsSdk_OPTIONS.link = addUrlParams(window.location.href, "wechatCode", JsSdk_OPTIONS.wechatCode);
        //分享给好友
        console.log("onMenuShareAppMessage");
        //分享给好友
        wx.onMenuShareAppMessage({
            title: JsSdk_OPTIONS.title, // 分享标题
            desc: JsSdk_OPTIONS.desc, // 分享描述
            link: JsSdk_OPTIONS.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: JsSdk_OPTIONS.imgUrl, // 自定义图标
            type: "link", // 分享类型,music、video或link，不填默认为link
            dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
            success: function(res) {
                console.log("success", res);
                // 用户确认分享后执行的回调函数
            },
            cancel: function() {
                console.log("cancel");
                // 用户取消分享后执行的回调函数
            },
            fail: function(res) {
                console.log("fail", res);
            }
        });

        //分享朋友圈
        console.log("onMenuShareTimeline");
        wx.onMenuShareTimeline({
            title: JsSdk_OPTIONS.title,
            link: JsSdk_OPTIONS.link,
            imgUrl: JsSdk_OPTIONS.imgUrl,
            success: function() {
                // 用户确认分享后执行的回调函数
            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            },
            fail: function(res) {
                console.log("fail", res);
            }
        });

        //分享给QQ好友
        console.log("onMenuShareQQ");
        wx.onMenuShareQQ({
            title: JsSdk_OPTIONS.title, // 分享标题
            desc: JsSdk_OPTIONS.desc, // 分享描述
            link: JsSdk_OPTIONS.link, // 分享链接
            imgUrl: JsSdk_OPTIONS.imgUrl, // 分享图标
            success: function() {
                console.log("success", res);
                // 用户确认分享后执行的回调函数
            },
            cancel: function() {
                console.log("cancel");
                // 用户取消分享后执行的回调函数
            },
            fail: function(res) {
                console.log("fail", res);
            }
        });

        //分享到QQ空间
        console.log("onMenuShareQZone");
        wx.onMenuShareQZone({
            title: JsSdk_OPTIONS.title, // 分享标题
            desc: JsSdk_OPTIONS.desc, // 分享描述
            link: JsSdk_OPTIONS.link, // 分享链接
            imgUrl: "", // 分享图标
            success: function() {
                // 用户确认分享后执行的回调函数

            },
            cancel: function() {
                // 用户取消分享后执行的回调函数
            }
        });
    },
    /**
     * 图片预览
     */
    previewImage: (options) => {
        /*  if (!window.isWeiXin()) {
              return
          }*/
        if (!JsSdk_OPTIONS.isWxConfig) {
            // Toast("微信配置初始化中，请稍后再试！");
            return;
        }
        console.log("调用预览")
        wx.previewImage({
            current: options.currentUrl, // 当前显示图片的http链接
            urls: options.urlList // 需要预览的图片http链接列表
        });
    }
}