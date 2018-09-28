import Vue from 'vue'
import Router from 'vue-router'
import AuthCheck from './auth-check'
import Landing from '@/components/Landing'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import ServiceStatus from '@/components/ServiceStatus'
import ServiceStatusExport from '@/components/ServiceStatusExport'
import CreateRecord from '@/components/CreateRecord'
import Dashboard from '@/components/Dashboard'
import Profile from '@/components/Profile'
import Users from '@/components/Users'
import NotFound from '@/components/NotFound'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [{
        path: '/not-found',
        name: 'NotFound',
        component: NotFound
    }, {
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
    }, {
        path: '/service-status',
        name: 'ServiceStatus',
        component: ServiceStatus,
        beforeEnter: AuthCheck
    }, {
        path: '/service-status/export',
        name: 'ServiceStatusExport',
        component: ServiceStatusExport,
        beforeEnter: AuthCheck
    }, {
        path: '/create-record',
        name: 'CreateRecord',
        component: CreateRecord,
        beforeEnter: AuthCheck
    }, {
        path: '/users',
        name: 'Users',
        component: Users,
        beforeEnter: AuthCheck
    }, {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        beforeEnter: AuthCheck
    }]
})

router.beforeEach(async(to, from, next) => {
    var found = router.options.routes.some(r => {
        return r.name === to.name
    })

    if (!found) {
        next('/not-found')
        return
    }

    next()
})

export default router