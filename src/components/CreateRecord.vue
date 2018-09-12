<template>
    <div class="create-record">

        <div class="header-section m-b-40">
            <div class="m-b-20"><span class="required"></span> {{ 'SIGNUP_REQUIRED' | translate }}</div>
        </div>

        <form>
            <label for="area">{{ 'AREA' | translate }} <span class="required"></span></label>
            <input
                class="input-block m-b-20 m-t-10"
                :class="{ 'invalid b-sm': !valid.area }"
                v-model="record.area"
                :placeholder="'AREA' | translate"
                ref="area"/>

            <label for="leader_name">{{ 'LEADER_NAME' | translate }} <span class="required"></span></label>
            <input 
                class="input-block m-b-20 m-t-10"
                :class="{ 'invalid b-sm': !valid.leaderName }"
                v-model="record.leaderName"
                :placeholder="'LEADER_NAME' | translate"/>

            <div class="flex-row">
                <label for="started_at" class="m-r-8">{{ 'STARTED_AT' | translate }} <span class="required"></span></label>
                <div class="flex-row">
                    <label class="flex-fill" for="ended_at">{{ 'ENDED_AT' | translate }}</label>
                </div>
            </div>

            <div class="flex-row">
                <v-date-picker
                    class="editable m-r-8 m-b-20 start-at"
                    mode="single"
                    v-model="startedAt"></v-date-picker>
                <v-date-picker
                    class="editable m-b-20 end-at"
                    mode="single"
                    v-model="endedAt"></v-date-picker>
            </div>

            <div class="flex-row pull-right" style="direction: rtl;">
                <Checkbox :class="{ 'flex-wrap': true }" v-model="incomplete" :text="'NOT_COMPLETED'"/>
                <div class="flex-fill m-r-8" style="line-height: 24px;">
                    {{ 'NOT_COMPLETED' | translate }}
                </div>
            </div>

            <label for="memo">{{ 'MEMO' | translate }}</label>
            <input class="input-block m-b-30 m-t-10" v-model="record.memo" :placeholder="'MEMO' | translate"/>

            <button
                type="button"
                class="btn btn-secondary btn-block"
                :class="{ 'disabled': !valid.all }"
                ref="create-button"
                @click="postServiceRecord()">{{ 'SAVE' | translate }}</button>
        </form>
    </div>
</template>

<script>
import * as $http from "axios";
import Checkbox from "@/components/app/checkbox"

export default {
    name: 'CreateRecord',
    components: { Checkbox },
    data: () => ({
        errMsg: null,
        /* this.startedAt, this.endedAt exist for pass the data to v-calendar. */
        startedAt: null,
        endedAt: null,
        record: {
            area: null,
            leaderName: null,
            memo: null,
            startedAt: null,
            endedAt: null,
        },
        valid: {
            area: false,
            leaderName: false,
            all: false
        },
        incomplete: false,
    }),
    watch: {
        incomplete: function() {
            this.endedAt = this.record.endedAt = this.incomplete ? undefined : this.record.startedAt;
        },
        record: {
            handler(val) {
                this.validate("area");
                this.validate("leaderName");
            },
            deep: true
        },
        startedAt: function(newVal) {  
            this.record.startedAt = new Date(this.$moment(newVal).format("YYYY-MM-DD"));
            if (this.record.startedAt >= this.record.endedAt) {
                this.record.endedAt = this.record.startedAt;
            }

            if (newVal >= this.endedAt) {
                this.endedAt = newVal;
            }
        },
        endedAt: function(newVal) {
            if (!newVal) {
                return
            }

            this.record.endedAt = new Date(this.$moment(newVal).format("YYYY-MM-DD"));
            if (this.record.endedAt <= this.record.startedAt) {
                this.record.startedAt = this.record.endedAt;
            }

            if (newVal <= this.startedAt) {
                this.startedAt = newVal;
            }
        }
    },
    mounted() {
        this.startedAt = this.record.startedAt = new Date(this.$moment().format("YYYY-MM-DD"));
        this.endedAt = this.record.endedAt = this.record.startedAt;
    },
    methods: {
        async postServiceRecord() {
            if (!this.valid.all) {
                this.$refs['create-button'].classList.add('shake');
                setTimeout(() => {
                    this.$refs['create-button'].classList.remove('shake');
                }, 500);
                return false;
            }
            try {
                const resp = await $http({
                    method: 'post',
                    url: '/serviceRecords',
                    data: this.record
                });
                this.$toast.success("SUCCESS_SAVE");
                this.$refs['area'].focus();
            } catch (e) {
                if (e.response && e.response.data === "RECORD_ALREADY_EXISTS") {
                    this.$toast.error("ERROR_" + e.response.data);
                } else {
                    console.log(e);
                    this.$toast.error("ERROR_SAVE");
                }
            }
        },
        validate(key) {
            let obj = {
                area: () => {
                    this.valid.area = this.record.area && this.record.area.length > 0;
                },
                leaderName: () => {
                    this.valid.leaderName = this.record.leaderName && this.record.leaderName.length > 0;
                },
            }
            obj[key]();
            this.valid.all = this.valid.area && this.valid.leaderName;
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.create-record {
    padding: 16px;

    label {
        line-height: 24px;
    }
}
</style>
