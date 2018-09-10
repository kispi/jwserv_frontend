<template>
    <div id="app">
        <Loading v-if="loading"/>
        <Header :currentRoute="currentRoute()"/>
        <div id="section">
            <router-view/>
        </div>
        <BottomNav v-if="showNav()"/>
    </div>
</template>

<script>
import Header from "@/components/navigation/Header";
import BottomNav from "@/components/navigation/BottomNav";
import Loading from "@/components/common/Loading";

export default {
    components: {
        BottomNav,
        Header,
        Loading
    },
    name: 'App',
    computed: {
        loading() {
            return this.$store.getters.loading;
        }
    },
    methods: {
        currentRoute() {
            return this.$router.currentRoute;
        },
        showNav() {
            return this.$router.currentRoute.name !== 'Login';
        }
    }
}
</script>

<style lang="less">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
