import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
const demo = r => require.ensure([], () => r(require('@/pages/demo')), 'demo')

Vue.use(Router)

const router = new Router({
    base: '',
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/demo',
            name: 'demo',
            component: demo
        },
    ]
})
router.beforeEach((to, from, next) => {
    next()
})

export default router