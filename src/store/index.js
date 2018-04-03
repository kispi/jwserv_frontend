import Vue from 'vue'
import Vuex from 'vuex'
import Translation from './translation/index'

Vue.use(Vuex)

export const store = new Vuex.Store({
    modules: {
        Translation,
    }
})