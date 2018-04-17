import Vue from 'vue'
import Router from 'vue-router'
import AuthCheck from './auth-check'
import Landing from '@/components/Landing'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Landing',
            component: Landing
        },
        {
            path: '/Login',
            name: 'Login',
            component: Login
        }, {
            path: '/dashboard',
            name: 'Dashboard',
            component: Dashboard,
            beforeEnter: AuthCheck
        }
    ]
})

export default router