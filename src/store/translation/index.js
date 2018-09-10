import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import json from '../../assets/translations.json';

export default {
    state: {
        translation: {
            locale: window.localStorage.getItem("locale") || "kr",
            texts: json
        }
    },
    getters,
    mutations,
    actions
};