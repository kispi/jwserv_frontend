export default {
    setPageLoading(state, payload) {
        if (payload === undefined) {
            return
        }
        state.loading = payload;
    },
};