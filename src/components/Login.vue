<template>
  <div class="login">
    <div class="m-t-30 m-b-30 f-30 f-700">{{ 'WELCOME' | translate }}</div>
    <input class="input-block m-b-10" v-model="email" :placeholder="'EMAIL' | translate"/>
    <input type="password" class="input-block m-b-30" v-model="password" :placeholder="'PASSWORD' | translate"/>
    <button class="btn btn-primary btn-block m-b-10" @click="onClickLogin()">{{ 'LOGIN' | translate }}</button>
    <button class="btn btn-secondary btn-block" @click="onClickSignUp()">{{ 'CREATE_ACCOUNT' | translate }}</button>
  </div>
</template>

<script>
import * as $http from "axios";

export default {
    name: 'Login',
    data: () => ({
        email: null,
        password: null
    }),
    mounted() {
        this.init();
    },        
    methods: {
        async init() {
            try {
                await this.$store.dispatch("loadAuthToken");
            } catch (err) {
                await this.$store.dispatch("clearAuthToken");
            }
            if (this.$store.getters.user.authToken) {
                this.$router.push("dashboard");
            }
        },
        async onClickLogin() {           
            let payload = {
                email: this.email,
                password: this.password
            };
            try {
                await this.$store.dispatch("signIn", payload);
                this.$router.push("dashboard");
            } catch (e) {
                console.error(e.response.data);
            }
        },
        async onClickSignUp() {
            let data = {
                // 회원가입정보
            }
            try {
                const resp = await $http.post("/signUp", data);
            } catch (e) {
                console.error(e.response.data);
            }
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .login {
        padding: 16px;
    }
</style>
