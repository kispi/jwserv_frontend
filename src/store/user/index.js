import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default {
    state: {
        user: {
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
    },
    getters,
    mutations,
    actions
};