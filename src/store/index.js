import Vue from 'vue'
import Vuex from 'vuex'
import User from './user/index'
import Translation from './translation/index'
import Common from './common/index'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        User,
        Translation,
        Common
    }
})