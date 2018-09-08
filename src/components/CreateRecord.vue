<template>
    <div class="create-record">

        <transition name="modal">
            <Alert @close="createFailed = false" v-if="createFailed">
                <h3 slot="header" class="c-danger">{{ errMsg | translate }}</h3>
                <div slot="body">{{ errMsg + "_TXT" | translate }}</div>
            </Alert>
        </transition>

        <transition name="modal">
            <Alert @close="createSuccess = false" v-if="createSuccess">
                <h3 slot="header" class="c-success">{{ 'SUCCESS_SAVE' | translate }}</h3>
            </Alert>
        </transition>

        <div class="header-section m-b-40">
            <div class="m-b-20"><span class="required"></span> {{ 'SIGNUP_REQUIRED' | translate }}</div>
        </div>

        <form>
            <label for="area">{{ 'AREA' | translate }} <span class="required"></span></label>
            <input class="input-block m-b-20 m-t-10" v-model="area" :placeholder="'AREA' | translate" ref="area"/>

            <label for="started_at">{{ 'STARTED_AT' | translate }} <span class="required"></span></label>
            <v-date-picker
                class="editable"
                mode='single'
                v-model='startedAt'>
            </v-date-picker>

            <label for="ended_at">{{ 'ENDED_AT' | translate }}</label>
            <v-date-picker
                class="editable"
                mode='single'
                v-model='endedAt'>
            </v-date-picker>

            <label for="leader_name">{{ 'LEADER_NAME' | translate }} <span class="required"></span></label>
            <input class="input-block m-b-20 m-t-10" v-model="leaderName" :placeholder="'LEADER_NAME' | translate"/>

            <label for="memo">{{ 'MEMO' | translate }}</label>
            <input class="input-block m-b-30 m-t-10" v-model="memo" :placeholder="'MEMO' | translate"/>

            <button type="button" class="btn btn-secondary btn-block" @click="postServiceRecord()">{{ 'SAVE' | translate }}</button>
        </form>
    </div>
</template>

<script>
import Alert from "@/components/modals/Alert";
import Confirm from '@/components/modals/Confirm';
import * as $http from "axios";

export default {
    components: { Alert, Confirm },
    name: 'CreateRecord',
    data: () => ({
        createSuccess: false,
        createFailed: false,
        errMsg: null,
        area: null,
        startedAt: new Date(),
        endedAt: new Date(),
        leaderName: null,
        memo: null,
    }),
    watch: {
        startedAt: function(newVal) {
            if (newVal >= this.endedAt) {
                this.endedAt = newVal;
            }
        },
        endedAt: function(newVal) {
            if (newVal <= this.startedAt) {
                this.startedAt = newVal;
            }
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.initTime();
        },
        initTime() {
        },
        async postServiceRecord() {
            try {
                let payload = {
                    area: this.area,
                    startedAt: this.$moment(this.startedAt),
                    endedAt: this.$moment(this.endedAt),
                    leaderName: this.leaderName,
                    memo: this.memo
                }
                
                const resp = await $http({
                    method: 'post',
                    url: '/serviceRecords',
                    data: payload
                });
                this.createSuccess = true;
            } catch (e) {
                this.errMsg = e.response.data;
                this.createFailed = true;
            }
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.create-record {
    padding: 16px;
}
</style>
