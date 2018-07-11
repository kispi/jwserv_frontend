import Vue from 'vue'
import Router from 'vue-router'
import AuthCheck from './auth-check'
import Landing from '@/components/Landing'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Dashboard from '@/components/Dashboard'

Vue.use(Router)

const router = new Router({
    routes: [{
        path: '/',
        name: 'Landing',
        component: Landing
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    }, {
        path: '/signup',
        name: 'Signup',
        component: Signup
    }, {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        beforeEnter: AuthCheck
    }]
})

router.afterEach(async(to, from, next) => {})

export default router