<template>
    <div class="service-card">

        <div class="row service-card-header flex-row flex-between" v-if="role !== 'public'">
            <i @click="addDetail" class="zmdi zmdi-plus"/>
            <div class="flex-row">
                <i class="zmdi zmdi-edit" @click="edit = true" v-if="!edit"/>
                <i class="zmdi zmdi-save" @click="save()" v-if="edit"/>
                <i class="zmdi zmdi-delete m-l-10" @click="$emit('showAskDelete', record)"></i>
            </div>
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
        <div v-if="record.details" class="row">
            <div class="detail">
                방문지:
                <span
                    class="c-primary m-r-10"
                    :key="detail.id"
                    v-for="detail in record.details">
                    <span class="text-underline" @click="onClickDetail(detail)">{{ detail.name }}</span>
                    <i @click="deleteDetail(detail)" class="zmdi zmdi-close"/>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import * as $http from "axios";

export default {
    name: "ServiceCard",
    data: () => ({
        edit: false,
        started: null,
        ended: null,
        saveSuccess: false,
    }),
    watch: {
        started: function() {
            this.record.startedAt = new Date(this.$moment(this.started).format("YYYY-MM-DD"));
        },
        ended: function() {
            this.record.endedAt = new Date(this.$moment(this.ended).format("YYYY-MM-DD"));
        }
    },
    props: ['record', 'role'],
    mounted() {
        let started;
        let ended;

        if (this.record.startedAt && typeof this.record.startedAt === 'string')
            started = new Date(this.record.startedAt.substring(0, 10));
        if (this.record.endedAt && typeof this.record.endedAt === 'string')
            ended = new Date(this.record.endedAt.substring(0, 10));
        
        this.started = started;
        this.ended = ended;
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
                this.$toast.success("SUCCESS_SAVE");
            } catch (e) {
                if (e.response && e.response.data === "RECORD_ALREADY_EXISTS") {
                    this.$toast.error("ERROR_" + e.response.data);
                } else {
                    console.error(e);
                    this.$toast.error("ERROR_SAVE");
                }
            }
        },
        addDetail() {
            this.detailModal()
        },
        async onClickDetail(detail) {
            this.detailModal(detail)
        },
        async deleteDetail(detail) {
            try {
                const resp = await $http.delete(`/serviceRecords/${this.record.id}/detail/${detail.id}`)
                this.$bus.$emit('onDetailChanged')
            } catch (e) {}
        },
        detailModal(detail) {
            const onConfirm = async (detail) => {
                let promise = $http[detail.id > 0 ? 'put' : 'post'](`/serviceRecords/${this.record.id}/detail/${detail.id > 0 ? detail.id : ''}`, detail)
                try {
                    const resp = await promise
                    this.$bus.$emit('onDetailChanged')
                } catch (e) {}
            }

            this.$modal.input({
                title: '방문지 상세 정보',
                inputs: [{
                    label: '방문지 이름',
                    placeholder: 'EX:) CU 수정점',
                    text: (detail || {}).name,
                    type: 'input',
                }, {
                    label: '메모',
                    placeholder: 'EX:) 호의적',
                    text: (detail || {}).memo,
                    type: 'textarea',
                }],
            }).then(inputs => {
                if (!inputs || inputs.length === 0) return

                if (!inputs[0].text) return

                if (detail.name === inputs[0].text &&
                    detail.memo === inputs[1].text) return

                detail.name = inputs[0].text
                detail.memo = inputs[1].text
                onConfirm(detail)
            })
        }
    }
};
</script>

<style scoped lang="less">
</style>
