export default {
    setTranslation(state, payload) {
        if (!payload) {
            return
        }
        if (payload.locale !== undefined) {
            state.translation.locale = payload.locale
            window.localStorage.setItem("locale", payload.locale)
        }
    },
};