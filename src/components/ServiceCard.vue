<template>
    <div class="service-card">
        <div class="row service-card-header">
            <i class="zmdi zmdi-delete m-r-10" @click="$emit('showAskDelete', record)"></i>
            <i class="zmdi zmdi-edit" @click="edit = true" v-if="!edit"></i>
            <i class="zmdi zmdi-save" @click="edit = false" v-if="edit"></i>
        </div>
        <div class="row">
            <div class="area col-xs-6">{{ record.area }}</div>
            <div class="leader col-xs-6">{{ record.leaderName }}</div>
        </div>
        <div class="row">
            <div class="start-at col-xs-6">{{ dayFormatStartedAt }}</div>
            <div class="end-at col-xs-6">{{ dayFormatEndedAt }}</div>
        </div>
        <div class="row">
            <div class="memo">{{ record.memo }}</div>
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