<template>
    <div class="profile">

        <form>
            <label for="congregation">{{ 'CONGREGATION' | translate }} </label>
            <Congregation
                :congregation="congregation"
                class="m-b-20 m-t-10 no-click disabled"
            ></Congregation>

            <label for="name">{{ 'NAME' | translate }} </label>
            <input
                class="input-block m-b-20 m-t-10 disabled"
                v-model="name"
                disabled/>

            <label for="email">{{ 'EMAIL' | translate }} </label>
            <input
                class="input-block m-b-20 m-t-10 disabled"
                v-model="email"
                disabled/>

            <label for="password">{{ 'PASSWORD' | translate }} </label>
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
                ref="save-button"
                @click="save()">{{ 'SAVE' | translate }}</button>
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
    name: 'Profile',
    data: () => ({
        id: null,
        email: null,
        password: null,
        name: null,
        congregation: null,
        phone: null,
        valid: {
            password: false,
            all: false,
        },
    }),
    watch: {
        password: function() {
            this.validate("password");
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.reload();
        },
        async reload() {
            await this.$store.dispatch('getMe');
            let user = this.$store.getters.user;
            this.id = user.id;
            this.name = user.name;
            this.email = user.email;
            this.phone = user.phone;
            this.congregation = user.congregation;
        },
        async save() {
            if (!this.valid.all) {
                this.$refs['save-button'].classList.add('shake');
                setTimeout(() => {
                    this.$refs['save-button'].classList.remove('shake');
                }, 500);
                return false;
            }
            let payload = {
                id: this.id,
                password: this.password,
                phone: this.phone
            };
            try {
                await $http.put('/users/' + this.id, payload);
                this.$toast.success("SUCCESS_SAVE");
            } catch (e) {
                console.error(e);
                this.errMsg = e.response.data;
                this.signupError = true;
            }
        },
        validate(key) {
            let obj = {
                password: () => {
                    this.valid.password = this.$validate.password(this.password);
                },
            }
            obj[key]();
            this.valid.all = this.valid.password;
        },
    }
}
</script>

<style lang="less" scoped>
.profile {
    padding: 16px;
}
</style>
