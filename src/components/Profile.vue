<template>
    <div class="profile">

        <Alert
            v-if="showAlertChangeCongregation"
            @close="onCloseAlert(false)">
            <h3 slot="header" class="c-warning">{{ 'WARNING_ROLE_RESET' | translate }}</h3>
            <div slot="body">{{ 'WARNING_ROLE_RESET_TXT' | translate }}</div>
            <div class="btn-container" slot="footer">
                <button class="btn btn-default" @click="onCloseAlert(false)">{{ 'CANCEL' | translate }}</button>
                <button class="btn btn-primary" @click="onCloseAlert(true)">{{ 'OK' | translate }}</button>
            </div>
        </Alert>

        <form>
            <label for="congregation">{{ 'CONGREGATION' | translate }} </label>
            <Congregation
                :congregation="selectedCongregation"
                v-on:onCongregationSelected="onCongregationSelected"
                class="m-t-10"
                :class="{ 'disabled no-click': user.role === 'admin', 'm-b-20': user.role !== 'admin' }"
            ></Congregation>
            <span class="display-block c-danger m-t-5 m-b-20" v-if="user.role === 'admin'">{{ 'ADMIN_CANNOT_CHANGE_CONGREGATION' | translate }}</span>

            <label for="name">{{ 'NAME' | translate }} </label>
            <input
                class="input-block m-b-20 m-t-10 disabled"
                v-model="user.name"
                disabled/>

            <label for="nickname">{{ 'NICKNAME' | translate }} </label>
            <input
                class="input-block m-b-20 m-t-10 disabled"
                v-model="user.nickname"
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
                maxlength="11"
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
import Alert from "@/components/modals/Alert";
import Congregation from "@/components/common/Congregation";

export default {
    components: {
        Alert, Congregation
    },
    name: 'Profile',
    data: () => ({
        showAlertChangeCongregation: false,
        selectedCongregation: null,
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
            this.selectedCongregation = this.user.congregation;
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
                this.reload();
            } catch (e) {
                console.error(e);
                this.errMsg = e.response.data;
                this.signupError = true;
            }
        },
        onCongregationSelected(congregation) {
            if (this.selectedCongregation.id !== congregation.id) {
                this.showAlertChangeCongregation = true;
            }
            this.selectedCongregation = congregation;
        },
        onCloseAlert(ok) {
            this.showAlertChangeCongregation = false;
            if (!ok) {
                this.selectedCongregation = this.user.congregation;
            } else {
                this.user.congregation = this.selectedCongregation;
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
