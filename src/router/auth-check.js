import { store as $store } from '../store'

export default async(to, from, next) => {
    if (!$store.getters.user.apiToken || !$store.getters.user.authToken) {
        try {
            await $store.dispatch('loadAuthToken')
            next()
        } catch (err) {
            await $store.dispatch('clearAuthToken')
            next('/')
        }
    } else {
        next()
    }
}
