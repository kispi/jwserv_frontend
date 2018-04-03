<template>
  <div class="login">
    <div class="m-t-30 m-b-30 f-30 f-700">{{ 'WELCOME' | translate }}</div>
    <input class="input-block m-b-10" v-model="id" placeholder="ID"/>
    <input type="password" class="input-block m-b-30" v-model="password" placeholder="Password"/>
    <button class="btn btn-primary btn-block m-b-10" @click="onClickLogin()">{{ 'LOGIN' | translate }}</button>
    <button class="btn btn-secondary btn-block" @click="onClickSignUp()">{{ 'CREATE_ACCOUNT' | translate }}</button>
  </div>
</template>

<script>
import * as $http from "axios";

export default {
    name: 'Login',
    data: () => ({
        id: null,
        password: null
    }),
    methods: {
        async onClickLogin() {
            let data = {
                id: this.id,
                password: this.password
            }
            // try {
            //     const resp = await $http.post("/signIn", data);
            // } catch (e) {
            //     console.error(e);
            // }
            this.$router.push('/dashboard')
        },
        async onClickSignUp() {
            let data = {
                // 회원가입정보
            }
            try {
                const resp = await $http.post("/signUp", data);
            } catch (e) {
                console.log(e)
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
