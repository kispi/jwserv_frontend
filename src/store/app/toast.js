const Toast = {
    state: {
        toast: {
            message: null,
            type: null,
            show: false,
        },
    },
    actions: {
        async setToast({
            commit,
            dispatch
        }, payload) {
            payload.show = true;
            return commit('setToast', payload)
        },
        async removeToast({
            commit,
            dispatch
        }) {
            return commit('setToast', {
                show: false
            })
        },
    },
    getters: {
        toast(state) {
            return state.toast
        },
    },
    mutations: {
        setToast(state, payload) {
            if (!payload) {
                state = {
                    toast: {
                        message: null,
                        type: null,
                        show: false,
                    },
                }
                return
            }

            if (payload.type !== undefined) {
                state.toast.type = payload.type
            }

            if (payload.message !== undefined) {
                state.toast.message = payload.message
            }

            if (payload.show !== undefined) {
                state.toast.show = payload.show
            }

            if (payload.class !== undefined) {
                state.toast.class = payload.class
            }
        },
    }
}

export default Toast;