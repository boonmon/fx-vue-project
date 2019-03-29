<template>
    <div>
        <img :src="load" style="width: 160px;margin: 150px auto;" v-show="show">
    </div>
</template>
<style>
</style>
<script>
import api from "../../api/";
import config from "../../api/config";
import sessionStorageUtil from "@/utils/sessionStorageUtil";
import localStorageUtil from "@/utils/localStorageUtil";
import loginUtil from "@/utils/loginUtil";
import loadingimg from "@/assets/img/loading.gif";

export default {
    data() {
        return {
            load: loadingimg,
            show: true
        };
    },
    mounted() {
        var redirecturl = this.$route.query.redirecturl;

        console.log("redirecturl=" + redirecturl);

        var code = sessionStorageUtil.getItem(sessionStorageUtil.WX_USER_CODE);

        if (code == "" || code == null) {
            //作auth授权

            this.show = false;

            var wechatCode = sessionStorageUtil.getItem(
                sessionStorageUtil.WX_USER_WECHAT_CODE
            );

            var menuUrl = config.wxUrl + config.context + "#" + redirecturl;

            let params = { wechatCode: wechatCode, menuUrl: menuUrl };

            api.getUrl(params).then(response => {
                if (response.data.head.errorCode == "0") {
                    // 获取授权地址成功

                    window.location.href = response.data.body;
                }
            });
        } else {
            var wechatCode = sessionStorageUtil.getItem(
                sessionStorageUtil.WX_USER_WECHAT_CODE
            );

            let param = {
                wechatCode: wechatCode,
                code: code,
                needwxInfo: "needwxInfo"
            };

            api.autoLogin(param).then(response => {
                if (response.data.head.errorCode == "0") {
                    // 登录成功
                    localStorage.clear();
                    loginUtil.setLoginInfo(response.data.body);
                    console.info(
                        "token=" +
                            localStorageUtil.getItem(
                                localStorageUtil.WX_USER_TOKEN
                            )
                    );
                    let ssoClientUrl = sessionStorageUtil.getItem(sessionStorageUtil.WX_SSO_CLIENT_URL)
                    if(ssoClientUrl){
                        loginUtil.ssoLogin(ssoClientUrl)
                    }
                    else{
                        this.$router.push(redirecturl);
                    }
                    
                } else {
                    //登录不成功 跳转登录页面

                    this.$router.push({
                        path: "/login",
                        query: { redirect_url: redirecturl }
                    });
                }
            });
        }
    }
};
</script>
