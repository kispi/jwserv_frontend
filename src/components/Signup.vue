<template>
    <div class="signup">

        <Alert @close="signupError = false" v-if="signupError">
            <h3 slot="header" class="c-danger">{{ errMsg | translate }}</h3>
            <div slot="body">{{ errMsg + "_TXT" | translate }}</div>
        </Alert>

        <div class="header-section m-b-40">
            <div class="m-b-20"><span class="required"></span> {{ 'SIGNUP_REQUIRED' | translate }}</div>
            <div>{{ 'SIGNUP_SECURE' | translate }}</div>
        </div>

        <form>
            <label for="congregation">{{ 'CONGREGATION' | translate }} <span class="required"></span></label>
            <Congregation
                :congregation="congregation"
                :invalid="!valid.congregation"
                class="m-b-20 m-t-10"
                v-on:onCongregationSelected="onCongregationSelected"
            ></Congregation>

            <label for="name">{{ 'NAME' | translate }} <span class="required"></span></label>
            <input
                :class="{ 'invalid': !valid.name }"
                class="input-block m-b-20 m-t-10"
                v-model="name"
                :placeholder="'NAME' | translate"/>

            <label for="email">{{ 'EMAIL' | translate }} <span class="required"></span></label>
            <input
                :class="{ 'invalid': !valid.email }"
                class="input-block m-b-20 m-t-10"
                v-model="email"
                :placeholder="'EMAIL' | translate"/>

            <label for="password">{{ 'PASSWORD' | translate }} <span class="required"></span></label>
            <input
                type="password"
                :class="{ 'invalid': !valid.password }"
                class="input-block m-b-20 m-t-10"
                v-model="password"
                :placeholder="'PASSWORD' | translate"/>

            <label for="phone">{{ 'PHONE' | translate }}</label>
            <input
                class="input-block m-b-30 m-t-10"
                v-model="phone"
                :placeholder="'PHONE' | translate"
                v-phone/>

            <button
                type="button"
                class="btn btn-secondary btn-block"
                :class="{ 'disabled': !valid.all }"
                ref="submit-button"
                @click="onSubmitSignUp()">{{ 'CREATE_ACCOUNT' | translate }}</button>
        </form>
    </div>
</template>

<script>
import * as $http from "axios";
import Alert from "@/components/modals/Alert";
import Congregation from "@/components/common/Congregation";

export default {
    components: {
        Alert,
        Congregation
    },
    name: 'Signup',
    data: () => ({
        signupError: false,
        errMsg: null,
        email: null,
        password: null,
        name: null,
        congregation: null,
        phone: null,
        valid: {
            email: false,
            password: false,
            name: false,
            congregation: false,
            all: false,
        },
    }),
    watch: {
        email: function() {
            this.validate("email");
        },
        password: function() {
            this.validate("password");
        },
        name: function() {
            this.validate("name");
        },
        congregation: function() {
            this.validate("congregation");
        },
    },
    mounted() {
    },
    methods: {
        async onSubmitSignUp() {
            if (!this.valid.all) {
                this.$refs['submit-button'].classList.add('shake');
                setTimeout(() => {
                    this.$refs['submit-button'].classList.remove('shake');
                }, 500);
                return false;
            }
            let payload = {
                email: this.email,
                password: this.password,
                name: this.name,
                congregationID: this.congregation.id,
                phone: this.phone
            };
            try {
                await this.$store.dispatch("signUp", payload);
                this.login(payload)
            } catch (e) {
                this.errMsg = e.response.data;
                this.signupError = true;
            }
        },
        async login(payload) {
            try {
                await this.$store.dispatch("signIn", payload);
                this.$router.push("service-status");
            } catch (e) {
                console.error(e);
            }
        },
        validate(key) {
            let obj = {
                email: () => {
                    this.valid.email = this.$validate.email(this.email);
                },
                password: () => {
                    this.valid.password = this.$validate.password(this.password);
                },
                name: () => {
                    this.valid.name = this.name && this.name.length > 0;
                },
                congregation: () => {
                    this.valid.congregation = this.congregation !== undefined;
                },
            }
            obj[key]();
            this.valid.all = this.valid.email && this.valid.password && this.valid.name && this.valid.congregation;
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
