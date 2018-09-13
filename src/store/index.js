import Vue from 'vue'
import Vuex from 'vuex'
import User from './user/index'
import Translation from './translation/index'
import Loading from './app/loading'
import Toast from './app/toast'
import Users from './users'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        User,
        Users,
        Translation,
        Loading,
        Toast,
    }
})