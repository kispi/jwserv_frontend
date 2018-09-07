<template>
    <div class="service-card">
       
        <transition name="modal">
            <Alert @close="saveSuccess = false" v-if="saveSuccess">
                <h3 slot="header" class="c-success">{{ 'SUCCESS_SAVE' | translate }}</h3>
            </Alert>
        </transition>

        <div class="row service-card-header">
            <i class="zmdi zmdi-delete m-r-10" @click="$emit('showAskDelete', record)"></i>
            <i class="zmdi zmdi-edit" @click="edit = true" v-if="!edit"></i>
            <i class="zmdi zmdi-save" @click="save()" v-if="edit"></i>
        </div>
        <div class="row">
            <input class="area col-xs-6" v-model="record.area" :disabled="!edit">
            <input class="leader col-xs-6" v-model="record.leaderName" :disabled="!edit">
        </div>
        <div class="row">
            <v-date-picker class="start-at col-xs-6" v-model="started" :class="{ 'editable': edit }"/>
            <v-date-picker class="end-at col-xs-6" v-model="ended" :class="{ 'editable': edit }"/>
        </div>
        <div class="row">
            <input class="memo" v-model="record.memo" :disabled="!edit">
        </div>
    </div>
</template>

<script>
import Alert from "@/components/modals/Alert";
import * as $http from "axios";

export default {
    name: "ServiceCard",
    components: { Alert },
    data: () => ({
        edit: false,
        started: null,
        ended: null,
        saveSuccess: false,
    }),
    watch: {
        started: function() {
            this.record.startedAt = this.$moment(this.started);
        },
        ended: function() {
            this.record.endedAt = this.$moment(this.ended);
        }
    },
    props: ['record'],
    created() {
    },
    computed: {
        dayFormatStartedAt() {
            if (this.record.startedAt && this.record.startedAt !== "") {
                let date = new Date(this.record.startedAt.substring(0, 10)).getDay();
                return this.record.startedAt.substring(0, 10) + " (" + this.dayToString(date) + ")";
            }
        },
        dayFormatEndedAt() {
            if (this.record.endedAt && this.record.endedAt !== "") {
                let date = new Date(this.record.startedAt.substring(0, 10)).getDay();
                return this.record.endedAt.substring(0, 10) + " (" + this.dayToString(date) + ")";
            }
        },
    },
    mounted() {
        this.started = new Date(this.record.startedAt.substring(0, 10));
        this.ended = new Date(this.record.endedAt.substring(0, 10));
    },
    methods: {
        dayToString(dayNum) {
            let day = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
            return this.$translate(day[dayNum]);
        },
        async save() {
            try {
                const resp = await $http.put('/serviceRecords/' + this.record.id, this.record);
                this.edit = false;
                this.saveSuccess = true;
            } catch (e) {
                console.error(e);
            }
        }
    }
};
</script>

<style scoped lang="less">
</style>
