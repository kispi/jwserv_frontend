const Translate = {
    install(Vue, options) {
        Vue.prototype.$translate = function(key) {
            return this.$options.filters.translate(key);
        }
    }
};

export default Translate;