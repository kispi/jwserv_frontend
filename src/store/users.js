import { store as $store } from '@/store'
import * as $http from 'axios'

const Users = {
    state: {
        users: null
    },
    actions: {
        async getUsers({ commit }) {
            let user = $store.getters.user;
            let params = {
                filter: "congregation__id:" + user.congregation.id
            };
            const resp = await $http.get('/users', { params })
            const users = resp.data.data;
            return commit('setUsers', users)
        },
        async changeUserRole({ commit }, payload) {
            let user = payload;
            return await $http.put('users/' + user.id, user);
        }
    },
    getters: {
        users(state) {
            return state.users;
        }
    },
    mutations: {
        setUsers(state, payload) {
            if (payload === undefined) {
                return
            }
            state.users = payload;
        }
    }
}

export default Users;