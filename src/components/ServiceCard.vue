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
                    @click="onClickDetail(detail)"
                    class="text-underline c-primary m-r-5"
                    :key="detail.id"
                    v-for="detail in record.details"
                    v-html="detail.name"
                />
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
            const onConfirm = async name => {
                try {
                    const resp = await $http.post(`/serviceRecords/${this.record.id}/detail`, {
                        record: { id: this.record.id },
                        name,
                    })
                    this.$bus.$emit('onDetailChanged')
                } catch (e) {}
            }

            this.$modal.input({
                title: '방문지 이름',
                body: `<div class="m-b-16">구역 ${this.record.area} 내 방문한 곳을 입력합니다</div>`,
                inputs: [{
                    placeholder: 'EX:) CU 수정점',
                    type: 'input',
                }],
            }).then(inputs => {
                if (!inputs || inputs.length === 0) return

                let name = inputs[0].text
                if (!name) return

                onConfirm(name.toLowerCase())
            })
        },
        async onClickDetail(detail) {
            try {
                const resp = await $http.delete(`/serviceRecords/${this.record.id}/detail/${detail.id}`)
                this.$bus.$emit('onDetailChanged')
            } catch (e) {}
        }
    }
};
</script>

<style scoped lang="less">
</style>
