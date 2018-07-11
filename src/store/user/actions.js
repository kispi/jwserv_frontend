import * as $http from 'axios'

export default {

    async getMe({ commit, dispatch }) {
        const resp = await $http.get('/me')
        const user = resp.data.data
        return commit('setUser', user)
    },

    async signUp({ commit, dispatch }, payload) {
        const resp = await $http.post('/signUpLocal', payload)

        const authToken = resp.data.data.authToken
        const setAuthTokenPromise = dispatch('setAuthToken', { authToken })
        return Promise.all([setAuthTokenPromise])
    },

    async signIn({ commit, dispatch }, payload) {
        const resp = await $http.post('signInLocal', payload)
        if (resp.data === "NON_EXIST_USER") {
            return
        }
        const authToken = resp.data.data.authToken
        const setAuthTokenPromise = await dispatch('setAuthToken', { authToken })

        const user = resp.data.data.user
        user.authToken = authToken
        const setUserPromise = commit('setUser', user)

        return Promise.all([setUserPromise, setAuthTokenPromise])
    },

    signOut({ commit, dispatch }) {
        const clearAuthTokenPromise = dispatch('clearAuthToken')

        return Promise.all([clearAuthTokenPromise])
    },

    loadAuthToken({ dispatch }) {
        const authToken = window.localStorage.getItem('apikey')
        if (!authToken) {
            return Promise.reject('No auth token found');
        }
        return dispatch('setAuthToken', { authToken })
    },

    setAuthToken({ commit, dispatch }, payload) {
        const authToken = payload.authToken
        if (!authToken) {
            return dispatch('clearAuthToken')
        }
        const key = 'apikey';
        $http.defaults.headers.common[key] = authToken
        window.localStorage.setItem(key, authToken)

        const user = { authToken }
        return commit('setUser', user)
    },

    clearAuthToken({ commit }) {
        window.localStorage.removeItem('apikey')
        return commit('setUser', null)
    },
}