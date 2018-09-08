const Translate = {
    install(Vue, options) {
        Vue.prototype.$translate = function(key, locale) {
            return this.$options.filters.translate(key, locale);
        }
    }
};

export default Translate;