const Loading = {
    state: {
        loading: false
    },
    actions: {
        setLoading({ commit }, payload) {
            return commit('setLoading', payload)
        },
    },
    getters: {
        loading(state) {
            return state.loading
        },
    },
    mutations: {
        setLoading(state, payload) {
            if (payload === undefined) {
                return
            }
            state.loading = payload;
        },
    }
}

export default Loading;