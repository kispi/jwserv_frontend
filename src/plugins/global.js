import { store as $store } from '@/store'
import * as $http from 'axios'

export const Toast = {
    install(Vue, options) {
        let payload = function(msg, dismiss, bgm) {
            let p = {
                message: msg
            }
            if (dismiss) {
                p.type = "dismiss"
            }
            p.class = bgm;
            return p;
        }

        Vue.prototype.$toast = {
            success(msg, dismiss) {
                $store.dispatch("setToast", payload(msg, dismiss, "bg-success"));
            },
            error(msg, dismiss) {
                $store.dispatch("setToast", payload(msg, dismiss, "bg-danger"));
            },
            warning(msg, dismiss) {
                $store.dispatch("setToast", payload(msg, dismiss, "bg-warning"));
            }
        }
    }
};

export const Loading = {
    install(Vue) {
        Vue.prototype.$loading = function(loading) {
            $store.dispatch("setLoading", loading)
        }
    }
}

export const Copy = {
    install(Vue) {
        Vue.prototype.$copy = function(obj) {
            return JSON.parse(JSON.stringify(obj));
        }
    }
}

export const Download = {
    install(Vue) {
        Vue.prototype.$download = async function(url, filename) {
            return await $http({
                url: url,
                method: 'GET',
                responseType: 'blob'
            }).then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename || this.$moment().format("YYYY-MM-DD hh:mm:ss")); //or any other extension
                document.body.appendChild(link);
                link.click();
            })
        }
    }
}