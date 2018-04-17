export default {
    setUser(state, payload) {
        if (!payload) {
            state.user = {
                id: null,
                authToken: null,
                nickname: null,
                congregation: null,
                email: null,
                phone: null,
                name: null,
                password: null,
                role: null,
                lastActivity: null,
            }
            return
        }

        if (payload.id !== undefined) {
            state.user.id = payload.id
        }
        if (payload.authToken !== undefined) {
            state.user.authToken = payload.authToken
        }
        if (payload.nickname !== undefined) {
            state.user.nickname = payload.nickname
        }
        if (payload.congregation !== undefined) {
            state.user.congregation = payload.congregation
        }
        if (payload.email !== undefined) {
            state.user.email = payload.email
        }
        if (payload.phone !== undefined) {
            state.user.phone = payload.phone
        }
        if (payload.name !== undefined) {
            state.user.name = payload.name
        }
        if (payload.password !== undefined) {
            state.user.password = payload.password
        }
        if (payload.role !== undefined) {
            state.user.role = payload.role
        }
        if (payload.lastActivity !== undefined) {
            state.user.lastActivity = payload.lastActivity
        }
    },
};