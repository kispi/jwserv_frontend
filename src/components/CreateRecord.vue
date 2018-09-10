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
                v-model="area"
                :placeholder="'AREA' | translate"
                ref="area"/>

            <label for="leader_name">{{ 'LEADER_NAME' | translate }} <span class="required"></span></label>
            <input 
                class="input-block m-b-20 m-t-10"
                :class="{ 'invalid b-sm': !valid.leader }"
                v-model="leader"
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
                    mode='single'
                    v-model='startedAt'>
                </v-date-picker>
                <v-date-picker
                    class="editable m-b-20 end-at"
                    mode='single'
                    v-model='endedAt'>
                </v-date-picker>
            </div>

            <div class="flex-row" style="float: right; direction: rtl;">
                <Checkbox :class="{ 'flex-wrap': true }" v-model="incomplete" :text="'NOT_COMPLETED'"/>
                <div class="flex-fill m-r-8" style="line-height: 24px;">
                    {{ 'NOT_COMPLETED' | translate }}
                </div>
            </div>

            <label for="memo">{{ 'MEMO' | translate }}</label>
            <input class="input-block m-b-30 m-t-10" v-model="memo" :placeholder="'MEMO' | translate"/>

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
        area: null,
        startedAt: new Date(),
        endedAt: new Date(),
        leader: null,
        memo: null,
        valid: {
            area: false,
            leader: false,
            all: false
        },
        incomplete: false,
    }),
    watch: {
        incomplete: function() {
            if (this.incomplete) {
                this.endedAt = undefined;
            } else {
                this.endedAt = this.startedAt;
            }
        },
        area: function() {
            this.validate("area");
        },
        leader: function() {
            this.validate("leader");
        },
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
                let endedAt = (this.endedAt ? this.$moment(this.endedAt) : undefined);
                let payload = {
                    area: this.area,
                    startedAt: this.$moment(this.startedAt),
                    endedAt: endedAt,
                    leaderName: this.leader,
                    memo: this.memo
                }
                
                const resp = await $http({
                    method: 'post',
                    url: '/serviceRecords',
                    data: payload
                });
                this.$toast.success("SUCCESS_SAVE");
            } catch (e) {
                this.$toast.error("ERROR_SAVE");
            }
        },
        validate(key) {
            let obj = {
                area: () => {
                    this.valid.area = this.area && this.area.length > 0;
                },
                leader: () => {
                    this.valid.leader = this.leader && this.leader.length > 0;
                },
            }
            obj[key]();
            this.valid.all = this.valid.area && this.valid.leader;
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
