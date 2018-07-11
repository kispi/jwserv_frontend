<template>
    <div class="signup">
        <div class="header-section m-b-40">
            <div class="m-b-20"><span class="required"></span> {{ 'SIGNUP_REQUIRED' | translate }}</div>
            <div>{{ 'SIGNUP_SECURE' | translate }}</div>
        </div>

        <form>
            <label for="congregation">{{ 'CONGREGATION' | translate }} <span class="required"></span></label>
            <Congregation
                :congregation="congregation"
                class="m-b-20 m-t-10"
                v-on:onCongregationSelected="onCongregationSelected"
            ></Congregation>

            <label for="email">{{ 'EMAIL' | translate }} <span class="required"></span></label>
            <input class="input-block m-b-20 m-t-10" v-model="email" :placeholder="'EMAIL' | translate"/>

            <label for="password">{{ 'PASSWORD' | translate }} <span class="required"></span></label>
            <input type="password" class="input-block m-b-20 m-t-10" v-model="password" :placeholder="'PASSWORD' | translate"/>

            <label for="name">{{ 'NAME' | translate }} <span class="required"></span></label>
            <input class="input-block m-b-20 m-t-10" v-model="name" :placeholder="'NAME' | translate"/>

            <label for="phone">{{ 'PHONE' | translate }}</label>
            <input class="input-block m-b-30 m-t-10" v-model="phone" :placeholder="'PHONE' | translate"/>

            <button class="btn btn-secondary btn-block" @click="onSubmitSignUp()">{{ 'CREATE_ACCOUNT' | translate }}</button>
        </form>
    </div>
</template>

<script>
import * as $http from "axios";
import Congregation from "@/components/common/Congregation";

export default {
    components: {
        Congregation
    },
    name: 'Signup',
    data: () => ({
        email: null,
        password: null,
        name: null,
        congregation: null,
        phone: null,
    }),
    mounted() {
    },
    methods: {
        async onSubmitSignUp() {
            let payload = {
                email: this.email,
                password: this.password,
                name: this.name,
                congregationID: this.congregation.id,
                phone: this.phone
            };
            try {
                await this.$store.dispatch("signUp", payload);
                this.login()
            } catch (e) {
                console.error(e.response.data);
            }
        },
        async login() {
            try {
                await this.$store.dispatch("signIn", payload);
                this.$router.push("dashboard");
            } catch (e) {
                console.error(e.response.data);
            }
        },
        onCongregationSelected(congregation) {
            this.congregation = congregation;
        }
    }
}
</script>

<style lang="less" scoped>
    .signup {
        padding: 16px;
    }
</style>
