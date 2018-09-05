const Validator = {
    install(Vue, options) {
        Vue.prototype.$validate = {
            email: function(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            password: function(password) {
                return password && password.length > 3;
            }
        }
    }
};

export default Validator;