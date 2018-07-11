<template>
    <div class="welcome">
        <div class="m-t-30 m-b-30 f-30 f-700">{{ 'WELCOME' | translate }}</div>
    </div>
</template>

<script>
import * as $http from "axios";

export default {
    name: 'Welcome',
    mounted() {
        this.init();
    },        
    methods: {
        init() {
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .login {
        padding: 16px;
    }
</style>
