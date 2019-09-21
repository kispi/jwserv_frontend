<template>
    <div id="app">
        <Toast/>
        <Loading v-if="loading && shouldShow"/>
        <Header v-if="showHeader()" :currentRoute="currentRoute()"/>
        <div id="section" :class="$router.currentRoute.name">
            <router-view/>
        </div>
        <BottomNav v-if="showNav()"/>
        <Modal/>
    </div>
</template>

<script>
import Header from "@/components/navigation/Header";
import BottomNav from "@/components/navigation/BottomNav";
import Loading from "@/components/app/Loading";
import Toast from "@/components/app/Toast";
import Modal from "@/components/app/Modal";

export default {
    components: {
        BottomNav,
        Header,
        Loading,
        Toast,
        Modal,
    },
    name: 'App',
    computed: {
        loading() {
            return this.$store.getters.loading;
        }
    },
    data: () => ({
        shouldShow: false
    }),
    watch: {
        loading() {
            this.shouldShow = false;
            if (this.loading) {
                setTimeout(() => {
                    this.shouldShow = true;
                }, 200);
            }
        }
    },
    methods: {
        currentRoute() {
            return this.$router.currentRoute;
        },
        showHeader() {
            return ['ServiceStatusExport'].indexOf(this.$router.currentRoute.name) === -1;
        },
        showNav() {
            return ['Login', 'ServiceStatusExport'].indexOf(this.$router.currentRoute.name) === -1;
        }
    }
}
</script>

<style lang="less">
#app {
    font-family: IntroRegular, Tahoma, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
