import Vue from 'vue'
import Vuex from 'vuex'
import store from './store/'
import router from './router/'
import { sync } from 'vuex-router-sync'
//埋点
// import track from './api/trackinit'
import App from './App'
import Mint from 'mint-ui'
import flexible from './assets/modifiedLib/lib-flexible/'
import components from './components/'
import polyfill from './assets/js/polyfill'
// const FastClick = require('fastclick')
// css
import 'normalize.css/normalize.css'
import './assets/css/reset.css'
import 'mint-ui/lib/style.css'
import './assets/css/mint-ui-cover.css'
{{#weUI}}
import './assets/css/weui-cover.css'
{{/weUI}}
import './assets/css/global.css'

//import './assets/scss/resetVux.scss'
// 消除300ms点击延迟
// FastClick.attach(document.body)
Vue.use(Mint)


sync(store, router)
    // 生产模式下的提示
Vue.config.productionTip = false

/* eslint-disable no-new */
new polyfill()

console.log('以下自定义组件已注册:')
Object.keys(components).forEach(key => {
    var name = key.replace(/(\w)/, v => v.toUpperCase()) //首字母大写
        //console.log(`v${name}`)
    Vue.component(`v${name}`, components[key])
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    {{#if_eq build "runtime"}}
    render: h => h(App)
    {{/if_eq}}
    {{#if_eq build "standalone"}}
    components: { App },
    template: '<App/>'
    {{/if_eq}}
})