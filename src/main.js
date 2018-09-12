import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueMoment from 'vue-moment'
import { store } from './store'
import Translate from './plugins/translate.js'
import Validator from './plugins/validator.js'
import * as Global from './plugins/global.js'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
import * as directives from './directives'
import * as filter from './filters'
Object.keys(filter).forEach(k => {
    Vue.filter(k, filter[k])
})
Vue.use(VCalendar, {
    firstDayOfWeek: 1,
    maxTapDuration: 0
})
Vue.use(Translate)
Vue.use(Validator)
Vue.use(VueMoment)
Object.keys(Global).forEach(k => {
    Vue.use(Global[k])
})

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
Vue.prototype.$bus = new Vue({})

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})