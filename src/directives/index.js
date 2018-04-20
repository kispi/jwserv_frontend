import router from '../router'

export const redirect = {
    bind: function(el, binding) {
        el.addEventListener('click', function(event) {
            var next = binding.expression;
            next = next.replace(/\'/g, '')
            router.push(next)
        })
    }
}