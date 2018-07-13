import Vue from 'vue'
import router from '../router'

export const redirect = {
    bind: function(el, binding) {
        el.addEventListener('click', function() {
            var next = binding.expression;
            next = next.replace(/\'/g, '')
            router.push(next)
        })
    }
}

Vue.directive('alphaNumeric', {
    bind: (el) => {
        el.addEventListener('keydown', e => {
            if (e.keyCode === 9 || !e.key.match(/^[0-9a-zA-Z]/)) {
                e.preventDefault();
            }
        })
    }
})

Vue.directive('focus', {
    inserted: function(el) {
        el.focus()
    }
})