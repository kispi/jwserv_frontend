import Vue from 'vue'

export const Modal = {
    install(Vue) {
        const initModal = (component, options, resolve) => {
            Vue.prototype.$bus.$emit('onDidOpenModal', {
                component,
                options
            })
            delete Vue.prototype.$bus._events.onDidCloseModal
            Vue.prototype.$bus.$on('onDidCloseModal', resolve)
        }

        Vue.prototype.$modal = {
            basic: async (options) => new Promise(resolve => initModal('ModalBasic', options, resolve)),
            input: async (options) => new Promise(resolve => initModal('ModalInput', options, resolve)),
            custom: async ({ component, options }) => new Promise(resolve => initModal(component, options, resolve)),
            images: async(options) => new Promise(resolve => initModal('ModalImages', options, resolve)),
        }
    }
}

Vue.use(Modal)