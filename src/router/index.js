import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/Login',
            name: 'Login',
            component: Login
        }, {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard
        }
    ]
})

export default router