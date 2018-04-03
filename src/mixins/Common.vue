<script>
export default {
    methods: {
        translate(key) {
            const locale = this.$store.getters.translation.locale;
            return ((this.$store.getters.translation.texts[key] || {})[locale] || key);
        },
    },
};
</script>
