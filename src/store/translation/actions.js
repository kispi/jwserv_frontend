import * as $http from 'axios'

export default {
    async setLocale({ commit, dispatch }, payload) {
        window.localStorage.setItem("locale", payload)
        return commit('setTranslation', { locale: payload })
    },

    async loadLocale({ commit, dispatch }, payload) {
        var locale = window.localStorage.getItem("locale") || "kr"
        return commit('setTranslation', { locale })
    },
}