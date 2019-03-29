import Vue from 'vue'
import VueRouter from 'vue-router'
const system = r => require.ensure([], () => r(require('@/pages/system/index')), '')
const s404 = r => require.ensure([], () => r(require('@/pages/system/404')), '')
{{#login}}
const login = r => require.ensure([], () => r(require('@/pages/login/index')), '')
const sso = r => require.ensure([], () => r(require('@/pages/login/sso')), '')
const auth = r => require.ensure([], () => r(require('@/pages/login/auth')), '')
const relogin = r => require.ensure([], () => r(require('@/pages/login/relogin')), '')
const authlogin = r => require.ensure([], () => r(require('@/pages/login/authlogin')), '')

import sessionStorageUtil from '@/utils/sessionStorageUtil'
import api from '@/api/'
{{/login}}
Vue.use(VueRouter)

const sessionStorage = global.sessionStorage
const router = new VueRouter({
    routes: [
        { path: '*', redirect: '/system/404' },
        {
            path: '/system',
            component: system,
            children: [{ path: '404', component: s404, meta: { title: '404' } }],
        }{{#login}},
        { path: '/auth', component: auth },
        { path: '/sso', component: sso, meta: { requiresAuth: true } },
        { path: '/relogin', component: relogin },
        { path: '/authlogin', component: authlogin, meta: { requiresAuth: true } },
        // 起始跳转页
        { path: '/login', component: login },
        {{/login}}
    ],
})

// 微信顶部控制栏标题
router.afterEach(route => {
    if (route.meta.title == "") {
        document.title = ""
    } else if (route.meta.title) {
        document.title = route.meta.title
    } else {
        document.title = '金财微信'
    }
})
{{#login}}
router.beforeEach((to, from, next) => {

    let nodeEnv = process.env.NODE_ENV
    console.log('nodeEnv', nodeEnv);

    if (to.query.wechatCode) {

        sessionStorageUtil.setItem(sessionStorageUtil.WX_USER_WECHAT_CODE, to.query.wechatCode)

    }
    //第三方sso集成
    if (to.path == "/sso") {

        sessionStorageUtil.removeItem(sessionStorageUtil.WX_SSO_CLIENT_URL)
        if (to.query.ssoClientUrl) {
            //reset login info
            sessionStorageUtil.removeItem(sessionStorageUtil.WX_USER_LOGIN) //清除登陆状态
            sessionStorageUtil.removeItem(sessionStorageUtil.WX_USER_CODE) //重新授权
            sessionStorageUtil.setItem(sessionStorageUtil.WX_SSO_CLIENT_URL, to.query.ssoClientUrl)
        } else {
            next()
            return
        }
    }

    var code = api.getQueryString('code')

    if (code != '' && code != null) {
        sessionStorageUtil.setItem(sessionStorageUtil.WX_USER_CODE, code)
    }

    console.log('code', code);


    /* if (nodeEnv !== 'development') {*/
    //debugger
    let info = sessionStorage.getItem("hskf.wechat.info");
    let wechatCode = sessionStorageUtil.getItem(sessionStorageUtil.WX_USER_WECHAT_CODE)

    if (to.matched.some(record => record.meta.requiresAuth)) {

        var login = sessionStorageUtil.getItem(sessionStorageUtil.WX_USER_LOGIN)

        console.log('login=' + login)

        if (!login) { //未登陆

            next({ path: '/auth', query: { redirecturl: to.fullPath } })

        } else {
            next()
        }
    } else {
        next()
    }
})
{{/login}}

export default router