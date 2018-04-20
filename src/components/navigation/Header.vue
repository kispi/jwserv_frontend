<template>
    <div class="header">
        <div class="nav-bar-controls" v-if="!isLogin">
            <a class="nav-bar-button mobile-search"></a>
            <a class="nav-bar-button mobile-lang" @click="changeLang()"></a>
            <a class="nav-bar-button mobile-menu" @click="showSidebar = !showSidebar"></a>
        </div>

        <transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
            <ul class="right-side-bar shadow" v-if="showSidebar">
                <li v-for="item in menu" :key="item.title">{{ item.title }}</li>
            </ul>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data: () => ({
        showSidebar: false,
    }),
    mounted() {
    },
    computed: {
        isLogin() {
            return (this.$router.currentRoute.name === "Login")
        },
        menu() {
            return [
                {
                    title: this.$options.filters.translate("STATUS"),
                    href: "status"
                }, {
                    title: this.$options.filters.translate("WRITE"),
                    href: "write"
                }, {
                    title: this.$options.filters.translate("PROFILE"),
                    href: "profile"
                }
            ]
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

<style lang="less" scoped>
    .right-side-bar {
        animation-duration: 0.3s;
    }
</style>
