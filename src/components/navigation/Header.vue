<template>
    <div class="header">
        <div class="navBarControls" v-if="!isLogin">
            <a class="navBarButton mobileSearch"></a>
            <a class="navBarButton mobileLang" @click="changeLang()"></a>
            <a class="navBarButton mobileMenu"></a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data () {
        return {
        }
    },
    mounted() {
    },
    computed: {
        isLogin() {
            return (this.$router.currentRoute.name === "Login")
        }
    },
    methods: {
        changeLang() {
            this.$store.dispatch("loadLocale");
            var locale = this.$store.getters.translation.locale;
            if (locale) {
                locale = (locale === "kr" ? "en" : "kr");
            }
            this.$store.dispatch("setLocale", locale);
        }
    }
}
</script>

<style scoped>

</style>
