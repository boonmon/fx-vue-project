<template>
    <div>
        <div style="background-color: #ffffff">
            <div class="toptitle" ><span v-on:click="goBack()"></span>用户登录</div>
            <div class="content">
                <div class="phone"><i class="iconfont icon-shouji1" style="font-size: 1.5em;color:gray;margin-right: 1em;"></i><input type="tel" placeholder="请输入手机号码"  style="outline:none; width: 10em;" v-model="params.mobilePhone"></div>
                <div class="code">
                    <div style="width: 65%; border-bottom:1px #cccccc solid;float: left">

                        <div style="width: 100%;">
                            <i class="iconfont icon-yanzhengma" style="font-size: 1.5em;color:gray;margin-right: 1em;"></i>
                            <input type="tel" placeholder="验证码"  v-model="params.captchaCode" style="outline:none;width: 8em; " >

                        </div>

                    </div>
                    <div style="width: 35%;float: left;height: 2em;background-color: #FF7045;border-radius:4px;text-align: center; display: flex;
        justify-content: center;
        align-items: center;">
                        <a  v-on:click="captcha()" style="color: #ffffff">{{{validText}}}</a>

                    </div>


                </div>
                <div class="btn" @click="userLogin"><a style="color: #ffffff;  height: 3em;line-height: 3em;" >{{loginText}}</a></div>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .toptitle{
        background-color: #ff7043;height: 1.5rem; line-height: 1.5rem; text-align: center; color: #fff; font-size: 0.5rem;
    }
    .content{
        padding: 1em 0;

    }
    .phone{
        margin: 1em 1em;
        height: 3em;
        border-bottom:1px #cccccc solid;
    }
    .code{
        margin: 1em 1em;
        height: 3em;
    }
    .btn{

        margin: 1em;
        height: 3em;
        background-color: #FF7045;
        border-radius:4px;
        text-align: center;
        display: flex;
        justify-content: center;


    }
    input{
        border: none;
    }
    .wrapper{
        /*padding-top: 2rem;*/
    }
    .index-content{
        padding: 1rem 1.2rem;
        border-bottom: 0.1rem solid #f3f3f3;
    }
    .col-xs-6,.col-xs-3{
        padding: 0;
    }
    .fc-color-orange{
        border: 0.1rem solid #f17712;
        border-radius: 0.8rem;
        text-align: center;

    }
    .navHead .navTop span{ width:1.5rem; height:1.2rem; line-height:1.2rem; background:#ffe117; border-radius:50%; font-size:0.6rem; position:absolute; right:0.6rem; top:0.2rem; color:#f17712; text-align:center;}
    .navTop a.daib span{ color:#e25704;}

</style>
<script type="es6">
    import config from '../../api/config';
    import {standardAsync} from '@/api/async';
    import api from '../../api/';
    import {mapState} from 'vuex';
    import {Toast, Indicator} from 'mint-ui';
    import localStorageUtil from '@/utils/localStorageUtil'
    import sessionStorageUtil from '@/utils/sessionStorageUtil'
    // import _track from '../../api/track';
    import loginUtil from "@/utils/loginUtil"
    export default {
        data () {
            return {
                params: {
                    mobilePhone: '',
                    userAccount: '',
                    userPassword: '',
                    captchaCode: '',
                    code: '',
                    hasWxInfo:'',
                    captchaClientId:'',
                    type:'',
                },
                validText: '获取验证码',
                loginText: '登　　录',
                onLogin: false,
                timer: 60,       //默认倒数30秒
                stop: false,   //默认是停止的，但界面加载之后会变成false
                Interval: null,  //setInterval的对象
                isCatchCode: 1,
            }
        },
        //通过路由的before钩子解除router-view缓存限制
        //相对于组件来说的，而且应该是在路由进入之前开始准备的
        //所以beforeRouteEnter是调用ajax的时机
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.loginText = '登录';
                vm.onLogin = false;
                vm.captchCode = '';
            });
        },
        //在组件的生命周期完成后，且旧路由即将切换走，新路由beforeEach的时机执行

        beforeRouteLeave(to, from, next){
            next();
        },
        //在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用
        beforeCreate() {
            console.log("come beforeCreate");
           // this.$store.dispatch('accountLoginInit');
        },
        //mounted 是生命期钩子
        mounted(){
            this.params.code = sessionStorageUtil.getItem(sessionStorageUtil.WX_USER_CODE);
            this.params.wechatCode = sessionStorageUtil.getItem(sessionStorageUtil.WX_USER_WECHAT_CODE);

        },
        //computed相当于属性的一个实时计算，如果实时计算里关联了对象，那么当对象的某个值改变的时候，同事会出发实时计算
        computed: mapState({

           // success: state => state.success,

        }),
        //监听某个值（双向绑定）的变化，一旦发生变化，就调用引号里的方法，从而达到change事件监听的效果！
        watch: {
            //Vue.set(state.login, 'success', true);
           // success: 'successWatcher',
            //loginTime:'successWatcher',
            //'$route':'initLogin',
        },
        created(){

        },
        methods: {
            update () {
                if (this.timer <= 0) {
                    this.timer = 60;
                    this.validText = "重新发送";
                    clearInterval(this.Interval);
                    this.stop = false;
                }
                else {
                    this.timer--;
                    this.validText = "重新发送(" + this.timer + 's)';
                    console.log("hdk");

                }

            },
            startTimer () {
                //如果是false就开始倒计时，如果是true就停止倒计时
                if (this.stop == false) {
                    this.Interval = setInterval(this.update, 1000);
                }
                else {
                    clearInterval(this.Interval);
                }

                this.stop = !this.stop;
            },
            userLogin() {
                if (!this.params.mobilePhone) {
                    Toast('手机号码不能为空');
                    return
                }
                if (!(/^1[34578]\d{9}$/.test(this.params.mobilePhone))) {
                    Toast('手机号码格式不正确');
                    return
                }
                //注释验证码
                try {
                    if (this.isCatchCode == 1) {
                        Toast('请先获取验证码');
                        return;
                    }
                } catch (e) {
                    console.log("提示失败");
                }
                if (!this.params.captchaCode) {
                    Toast('验证码不能为空');
                    return;
                }

                //埋点
                Indicator.open('登录中....');
                //this.loginText="登录中....";
                //_track._trackEvent("JCDZ_WX", "登陆", this.params.mobilePhone, "");
                //调用store中的login方法

                this.params.hasWxInfo = "hasWxInfo";
             
                this.params.captchaClientId = this.params.mobilePhone;

                api.wechatLogin(this.params).then((response) => {
                    localStorage.clear();
                    console.info("response.head.errorCode"+response.data.head.errorCode);
                    if (response.data.head.errorCode  == '0') {

                        loginUtil.setLoginInfo(response.data.body);
                        clearInterval(this.Interval);
                        this.validText = "获取验证码";
                        Indicator.close();
                        this.loadUserInfo();

                        }else{
                        Indicator.close();
                        Toast(response.data.head.errorMsg);
                    }

                }).catch((response) => {
                    Indicator.close();
                    try {
                        Toast(response.data.head.errorMsg);
                    } catch (e) {
                        console.log("异常");
                    }
                    //commit(types.ACCOUNT_LOGIN_SUBMIT_FAILURE, response);

                });


            },
            captcha() {
                if (this.stop == true) {
                    Toast('收不到短信,请在' + this.timer + 's后' + '重新发送');
                    return;
                }


                if (!this.params.mobilePhone) {
                    Toast('手机号码不能为空');
                    return
                }
                this.params.mobilePhone = this.params.mobilePhone;
                if (!(/^1[34578]\d{9}$/.test(this.params.mobilePhone))) {
                    Toast('手机号码格式不正确');
                    return
                }

                this.params.phone=this.params.mobilePhone;

                this.isCatchCode = 0;

                this.startTimer();

                api.wechatCaptcha(this.params).then((response) => {

                    console.log('captcha')
                    if (response.data.head.errorCode == '0') {
                        Toast('短信已发至你的手机，请注意查收');

                    } else {
                        Toast(response.data.head.errorMsg);
                    }
                }).catch((response) => {

                });

            },

            loadUserInfo(){

                let _this = this;
                let userId=localStorageUtil.getItem(localStorageUtil.WX_USER_ID);
                standardAsync(this, 'queryUserInfoByUserId', {userId: userId}, res => {
                    if(res.head.errorCode == "0") {
                        if(res.body) {
                        localStorageUtil.setItem(localStorageUtil.WX_USER_NAME, res.body.userName||'');
                        localStorageUtil.setItem(localStorageUtil.WX_USER_EMAIL,res.body.email||'');
                        //this.$store.dispatch('login', res.body);
                        } else {
                        localStorageUtil.setItem(localStorageUtil.WX_USER_NAME, '');
                        localStorageUtil.setItem(localStorageUtil.WX_USER_EMAIL, '');
                        }
                        let cusId= localStorageUtil.getItem(localStorageUtil.WX_USER_CUST_ID);
                        var redirect_url= _this.$route.query.redirect_url;
                        if(redirect_url==''||redirect_url==null){
                                redirect_url='/entry/setting';

                        }
                        if(cusId==''||cusId==null){
                            Toast("未绑定企业");
                           
                        }
                        let ssoClientUrl = sessionStorageUtil.getItem(sessionStorageUtil.WX_SSO_CLIENT_URL)
                        if(ssoClientUrl){
                            loginUtil.ssoLogin(ssoClientUrl)
                        }
                        else{
                            console.info("登录成功跳转地址="+decodeURI(redirect_url));
                            _this.$router.push(decodeURI(redirect_url));
                        }
                       

                    }else{
                        Toast({
                            message: res.head.errorMsg,
                            duration: 3000
                        });
                    }
                })

            },
        }
    }
</script>
