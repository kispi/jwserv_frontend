<template>
    <div class="bottom-nav flex-row items-center">
        <div class="about text-uppercase" v-redirect="'about'">
            {{ 'ABOUT' | translate }}
        </div>
        <img class="logo flex-wrap" src="../../assets/images/logo.png">
    </div>
</template>

<style scoped>
.about {
    font-size: 12px;
    padding: 18px;
}
</style>