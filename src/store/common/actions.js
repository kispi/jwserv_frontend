export default {
    loading({ commit }, payload) {
        return commit('setPageLoading', payload)
    },
}