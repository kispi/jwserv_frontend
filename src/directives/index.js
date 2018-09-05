import Vue from 'vue'
import router from '../router'

Vue.directive('redirect', {
    bind: (el, binding) => {
        el.addEventListener('click', function() {
            var next = binding.expression;
            next = next.replace(/\'/g, '')
            router.push(next)
        })
    }
})

Vue.directive('phone', {
    bind: (el) => {
        el.addEventListener('keydown', e => {
            setTimeout(function() {
                el.value = el.value.replace(/[^0-9\-]/g, '');
            }, 100);
        })
    }
})

Vue.directive('focus', {
    inserted: function(el) {
        el.focus();
        el.select();
    }
})

Vue.directive('selected', {
    inserted: function(el) {
        el.focus();
        el.select();
    }
})