import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { store } from './store'
import Translate from './plugins/translate.js'
import Validator from './plugins/validator.js'
import * as filter from './filters'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
Vue.use(VCalendar, {
    firstDayOfWeek: 1,
    maxTapDuration: 0
})
Vue.use(require('vue-moment'));
Vue.use(Translate)
Vue.use(Validator)

require('./styles/index.less')

Vue.config.productionTip = false
axios.defaults.transformResponse = [function(response) {
    if (typeof response === "string") {
        try {
            var json = JSON.parse(response)
        } catch (e) {
            return response
        }
        if (json.status == "failed") {
            throw json.message
        }
        return json
    }
    return response
}];
axios.defaults.baseURL = process.env.API_URL
Vue.prototype.$http = axios

import * as directives from './directives'
Vue.filter('translate', filter.translate)

Vue.prototype.$bus = new Vue({})

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})