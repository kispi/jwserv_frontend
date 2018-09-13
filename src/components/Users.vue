<template>
    <div class="users">

        <transition name="modal">
            <Confirm
                :text="$options.filters.translate('CONFIRM_CHANGE_ROLE_TXT')"
                v-if="showAskChangeRole"
                v-on:close="onConfirmChangeRole">
                <h3 slot="header" class="c-warning">{{ 'CONFIRM_CHANGE_ROLE' | translate }}</h3>
            </Confirm>
        </transition>

        <transition name="modal">
            <Alert @close="showNoAdminAlert = false" v-if="showNoAdminAlert">
                <h3 slot="header" class="c-danger">{{ errMsg | translate }}</h3>
                <div slot="body">{{ errMsg + "_TXT" | translate }}</div>
            </Alert>
        </transition>

        <table>
            <thead class="text-uppercase">
                <tr>
                    <td v-for="(key, index) in tableHeader" :key="index">{{ key.toUpperCase() | translate }}</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.name }}</td>
                    <td style="min-width: 100px;">
                        <Selector
                            v-model="user.role"
                            :items="roles"
                            :translate="true"
                            v-if="me.role === 'admin'"
                            v-on:change="onChange($event, user)"/>
                        <div v-else>{{ user.role.toUpperCase() | translate }}</div>
                    </td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.phone }}</td>
                    <td>{{ user.lastActivity | formatDate("YYYY-MM-DD") }}</td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
import * as $http from 'axios'
import Selector from '@/components/app/Selector'
import Alert from '@/components/modals/Alert'
import Confirm from '@/components/modals/Confirm'

export default {
    name: 'users',
    components: { Alert, Confirm, Selector },
    data: () => ({
        errMsg: null,
        showAskChangeRole: false,
        showNoAdminAlert: false,
        me: null,
        users: null,
        last: {
            event: null,
            user: null,
        },
    }),
    mounted() {
        this.reload();
    },
    computed: {
        tableHeader() {
            return ["name", "role", "email", "phone", "last_activity"]
        },
        roles() {
            return ["admin", "writer", "public"]
        }
    },
    methods: {
        async reload() {
            this.me = this.$store.getters.user;
            if (!this.me.congregation) {
                await this.$store.dispatch("getMe");
            }

            try {
                await this.$store.dispatch('getUsers');
                this.users = this.$store.getters.users;
                this.users.sort(function(a, b) {
                    return a.name.localeCompare(b.name);
                })
            } catch (e) {
                console.error(e);
            }
        },
        async onConfirmChangeRole(e) {
            let lastUser = this.last.user;

            this.showAskChangeRole = false;
            if (e === "ok") {
                this.save(lastUser);
            } else {
                this.rollBackRole(lastUser);
            }
        },
        async save(user) {
            try {
                const resp = await this.$store.dispatch('changeUserRole', user);
                this.$toast.success("SUCCESS_SAVE");
            } catch (e) {
                if (e.response && e.response.data === "ERROR_NEEDS_ADMIN") {
                    this.showNoAdminAlert = true;
                    this.errMsg = e.response.data;
                }
                this.rollBackRole(user);
            }
        },
        rollBackRole(user) {
            user.role = this.last.event.oldVal;

            // I hate below but vue doesn't watch for some property inside of an object in array.
            let backup = this.users;
            this.users = null;
            setTimeout(() => {
                this.users = backup;
            })
        },
        onChange(e, user) {
            this.showAskChangeRole = true;
            this.last = {
                event: e,
                user: user
            }
        }
    },
}
    
</script>

<style lang="less" scoped>
.users {
    padding: 16px;
    display: block;
    overflow: scroll;
}
</style>
