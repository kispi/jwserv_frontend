<template>
    <div class="bottom-nav">
        <img class="logo pull-right" src="../../assets/images/logo.png">
        <div class="about text-uppercase" v-redirect="'about'">
            {{ 'ABOUT' | translate }}
        </div>
    </div>
</template>

<style scoped>
.about {
    font-size: 12px;
    padding: 18px;
}
</style>