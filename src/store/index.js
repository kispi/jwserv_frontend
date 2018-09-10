import Vue from 'vue'
import Vuex from 'vuex'
import User from './user/index'
import Translation from './translation/index'
import Loading from './app/loading'
import Toast from './app/toast'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        User,
        Translation,
        Loading,
        Toast
    }
})