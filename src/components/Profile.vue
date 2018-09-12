<template>
    <div class="profile">

        <form>
            <label for="congregation">{{ 'CONGREGATION' | translate }} </label>
            <Congregation
                :congregation="user.congregation"
                class="m-b-20 m-t-10 no-click disabled"
            ></Congregation>

            <label for="name">{{ 'NAME' | translate }} </label>
            <input
                class="input-block m-b-20 m-t-10 disabled"
                v-model="user.name"
                disabled/>

            <label for="email">{{ 'EMAIL' | translate }} </label>
            <input
                class="input-block m-b-20 m-t-10 disabled"
                v-model="user.email"
                disabled/>

            <label for="password">{{ 'NEW_PASSWORD' | translate }} </label>
            <input
                type="password"
                :class="{ 'invalid': !valid.password }"
                class="input-block m-b-20 m-t-10"
                v-model="user.password"
                :placeholder="'PASSWORD' | translate"/>

            <label for="phone">{{ 'PHONE' | translate }}</label>
            <input
                class="input-block m-b-30 m-t-10"
                v-model="user.phone"
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
        user: {},
        valid: {
            password: false,
            all: false,
        },
    }),
    watch: {
        user: {
            handler() {
                this.validate("password");
            },
            deep: true
        }
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
            this.user = this.$store.getters.user;
            this.user.password = null;
        },
        async save() {
            if (!this.valid.all) {
                this.$refs['save-button'].classList.add('shake');
                setTimeout(() => {
                    this.$refs['save-button'].classList.remove('shake');
                }, 500);
                return false;
            }
            try {
                await $http.put('/users/' + this.user.id, this.user);
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
                    this.valid.password = this.$validate.password(this.user.password);
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
