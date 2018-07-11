<template>
    <div id="app">
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

export default {
    components: {
        Header,
        BottomNav
    },
    name: 'App',
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
