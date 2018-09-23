<template>
    <div class="login">
        
        <Alert @close="loginError = false" v-if="loginError">
            <h3 slot="header" class="c-danger">{{ errMsg | translate }}</h3>
            <div slot="body">{{ errMsg + "_TXT" | translate }}</div>
        </Alert>

        <div class="m-t-50 m-b-50 f-30 f-700">{{ 'WELCOME' | translate }}</div>
        <input class="input-block m-b-10" v-model="email" :placeholder="'EMAIL' | translate" v-on:keyup.enter="onClickLogin"/>
        <input type="password" class="input-block m-b-30" v-model="password" :placeholder="'PASSWORD' | translate" v-on:keyup.enter="onClickLogin"/>
        <button class="btn btn-primary btn-block m-b-10" @click="onClickLogin()">{{ 'LOGIN' | translate }}</button>
        <button class="btn btn-secondary btn-block" @click="onClickSignUp()">{{ 'CREATE_ACCOUNT' | translate }}</button>

    </div>
</template>

<script>
import Alert from "@/components/modals/Alert";

export default {
    components: {
        Alert
    },
    name: 'Login',
    data: () => ({
        email: null,
        password: null,
        loginError: false,
        errMsg : null,
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
                this.$router.push("service-status");
            }
        },
        async onClickLogin() {
            let payload = {
                email: this.email,
                password: this.password
            };
            try {
                await this.$store.dispatch("signIn", payload);
                this.$bus.$emit("onLogin");
                this.$router.push("service-status");
            } catch (e) {
                this.errMsg = e.response.data;
                this.loginError = true;
            }
        },
        async onClickSignUp() {
            this.$router.push("signup");
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
