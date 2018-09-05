<template>
    <div class="service-card">
        <div class="row service-card-header">
            <i class="zmdi zmdi-delete m-r-10" @click="$emit('showAskDelete', record)"></i>
            <i class="zmdi zmdi-edit" @click="edit = true" v-if="!edit"></i>
            <i class="zmdi zmdi-save" @click="edit = false" v-if="edit"></i>
        </div>
        <div class="row">
            <input class="area col-xs-6" v-model="record.area" :disabled="!edit">
            <input class="leader col-xs-6" v-model="record.leaderName" :disabled="!edit">
        </div>
        <div class="row">
            <input class="start-at col-xs-6" v-model="dayFormatStartedAt" :disabled="!edit">
            <input class="end-at col-xs-6" v-model="dayFormatEndedAt" :disabled="!edit">
        </div>
        <div class="row">
            <input class="memo" v-model="record.memo" :disabled="!edit">
        </div>
    </div>
</template>

<script>
export default {
    name: "ServiceCard",
    data: () => ({
        edit: false,
    }),
    props: ["record"],
    computed: {
        dayFormatStartedAt() {
            if (this.record.startedAt && this.record.startedAt !== "") {
                return this.record.startedAt.substring(0, 10);
            }
        },
        dayFormatEndedAt() {
            if (this.record.endedAt && this.record.endedAt !== "") {
                return this.record.endedAt.substring(0, 10);
            }
        }
    }
};
</script>

<style scoped lang="less">
</style>
