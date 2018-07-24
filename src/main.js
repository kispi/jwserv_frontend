// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { store } from './store'
import * as filter from './filters'
import VCalendar from 'v-calendar'
import 'v-calendar/lib/v-calendar.min.css'
Vue.use(VCalendar, {
    firstDayOfWeek: 1,
    maxTapDuration: 0
})
Vue.use(require('vue-moment'));
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
Vue.directive('redirect', directives.redirect)
Vue.filter('translate', filter.translate)
Vue.prototype.$bus = new Vue({})

new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})