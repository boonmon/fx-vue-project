// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/index'
import router from './router'
import { sync } from 'vuex-router-sync'

import components from './components/'

// import style
import 'normalize.css/normalize.css'
sync(store, router)

Vue.config.productionTip = false
Object.keys(components).forEach(key => {
    var name = key.replace(/(\w)/, v => v.toUpperCase()) //首字母大写
    Vue.component(`v${name}`, components[key])
})


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})