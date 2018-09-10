import { store as $store } from '@/store'

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