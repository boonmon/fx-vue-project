<template>
    <div>
        正在授权登录，请稍候...
    </div>
</template>
<style>

</style>
<script>
    import { Toast, Indicator, MessageBox } from 'mint-ui';
    import { standardAsync } from '@/api/async';
    import api from '../../api/';
    import config from '../../api/config'
    import localStorageUtil from '@/utils/localStorageUtil'
    import sessionStorageUtil from '@/utils/sessionStorageUtil'
    const sessionStorage = global.sessionStorage;
    export default {
        name: 'relogin',
        data() {

            return {
                param: {
                    appCode: '',
                    wechatCode: '',
                    isHasWxInfo: '',
                    type: '',
                },
            }
        },
        methods: {
            autoLogin() {
                var that = this;
                that.param.hasWxInfo = '0';
                that.param.type = "entportal";
                that.param.token = localStorageUtil.getItem(localStorageUtil.WX_USER_TOKEN);
                if (that.param.appCode != null && this.param.appCode != '') {
                    Indicator.open('加载中....');
                    console.log("自动登录");

                    api.autoLogin(that.param).then(function (res) {

                        if (res.data.head.errorCode == '0') {

                            that.$store.dispatch('userinfo', res.data.body);
                            Indicator.close();
                            that.loadUserInfo();

                        }else if (res.data.head.errorCode == '2') {
                            sessionStorage.setItem(localStorageUtil.WX_USER_LOGIN,true);
                            Indicator.close();
                            var redirect_url= that.$route.query.redirect_url;
                            if(redirect_url==''||redirect_url==null){
                                redirect_url='/entry/setting';

                            }
                            console.info("登录成功跳转地址="+redirect_url);
                            that.$router.push(redirect_url);

                        } else {
                            Indicator.close();
                            that.$router.push({
                                path: '/login',
                                query: { redirect_url: that.$route.query.redirect_url },
                            });
                        }

                    }).catch(function (err) {
                        Indicator.close();
                        //系统异常
                        Toast({
                            message: '系统异常:' + err,
                            duration: 3000
                        });
                        that.$router.push({
                            path: '/login',
                            query: { redirect_url: that.$route.query.redirect_url },
                        });
                    });

                }

            },
            loadUserInfo() {

                let _this = this;
                let userId = localStorageUtil.getItem(localStorageUtil.WX_USER_ID);
                standardAsync(this, 'queryUserInfoByUserId', { userId: userId }, res => {
                    if (res.head.errorCode == "0") {

                        localStorageUtil.setItem(localStorageUtil.WX_USER_NAME, res.body.userName || '');
                        localStorageUtil.setItem(localStorageUtil.WX_USER_EMAIL, res.body.email || '');
                       // _this.$store.dispatch('login', res.body);

                        let cusId= localStorageUtil.getItem(localStorageUtil.WX_USER_CUST_ID);

                        if (cusId == '' || cusId == null) {
                            Toast("未绑定企业");
                            var redirect_url= _this.$route.query.redirect_url;
                            if(redirect_url==''||redirect_url==null){
                                redirect_url='/entry/setting';

                            }
                            console.info("登录成功跳转地址="+redirect_url);
                            _this.$router.push(redirect_url);
                            return;
                        }

                        _this.queryUserDtail();


                    } else {
                        Toast({
                            message: res.head.errorMsg,
                            duration: 3000
                        });

                        _this.$router.push({
                            path: '/login',
                            query: { redirect_url: _this.$route.query.redirect_url },
                        });


                    }
                })

            },
            reftokencustId() {

                let _this = this;
                let params = {};
                params.cusId = localStorageUtil.getItem(localStorageUtil.WX_USER_CUST_ID);
                console.info("reftokencustId cusId="+params.cusId);
                console.info("reftokencustId token="+localStorageUtil.getItem(localStorageUtil.WX_USER_TOKEN));
                api.reftokencustId(params).then(function (res) {

                    if (res.data.head.errorCode == '0') {
                        console.info("token与cusId绑定成功");
                        _this.$router.push(_this.$route.query.redirect_url);

                    } else {
                        Toast({
                            message: res.data.head.errorMsg,
                            duration: 3000
                        });
                    }
                }).catch(function (err) {
                    //系统异常
                    Toast({
                        message: '系统异常:' + err,
                        duration: 3000
                    });
                });
            },
            //通过id用户个人信息
            queryUserDtail() {
                let params = {
                    userId: localStorageUtil.getItem(localStorageUtil.WX_USER_ID),
                    depId: localStorageUtil.getItem(localStorageUtil.WX_USER_CUST_ID),
                    cusId: localStorageUtil.getItem(localStorageUtil.WX_USER_CUST_ID)
                };

                let _this = this;
                standardAsync(this, 'queryUserDtail', params, res => {
                    if (res.head.errorCode == "0") {
                        var userinfo = JSON.parse(localStorageUtil.getItem(localStorageUtil.WX_SERVICE_USER_INFO));
                        userinfo["postList"] = res.body.postList;
                        userinfo["depList"] = res.body.depList;
                        console.info("用户信息=" + JSON.stringify(userinfo));
                        localStorageUtil.setItem(localStorageUtil.WX_SERVICE_USER_INFO, userinfo);
                        _this.reftokencustId();


                    } else {
                        Toast("获取用户信息失败！");
                        _this.$router.push({
                            path: '/login',
                            query: { redirect_url: _this.$route.query.redirect_url },
                        });

                    }
                })

            },

        },
        created() {

            console.info("relogin created()="+this.$route.query.redirect_url);

                this.param.appCode = api.getQueryString('code');
                if (!this.param.appCode) {
                    this.param.appCode = this.$route.query.code;
                }
                if (this.param.appCode) {
                    sessionStorageUtil.setItem(sessionStorageUtil.WX_USER_CODE, this.param.appCode);
                }

                this.param.wechatCode = api.getQueryString('state');
                if (!this.param.wechatCode) {
                    this.param.wechatCode = this.$route.query.state;

                }

                if (this.param.wechatCode) {
                    sessionStorageUtil.setItem(sessionStorageUtil.WX_USER_WECHAT_CODE, this.param.wechatCode);
                }
                this.autoLogin();

        }
    }
</script>
