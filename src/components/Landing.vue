<template>
</template>
<script>
import CommonMixin from "@/mixins/Common";

export default {
    name: 'Landing',
    mounted() {
        this.init();
    },
    methods: {
        init() {
            if (this.$store.getters.user.authToken) {
                this.$router.push("service-status")
            } else {
                this.$router.push("login")
            }
        }
    }
}
</script>