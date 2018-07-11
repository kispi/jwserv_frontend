<template>
    <div class="service-card">
        <div class="row service-card-header">
            <i class="zmdi zmdi-delete m-r-10"></i>
            <i class="zmdi zmdi-edit"></i>   
        </div>
        <div class="row">
            <div class="area col-xs-6">{{ record.area }}</div>
            <div class="leader col-xs-6">{{ record.leaderName }}</div>
        </div>
        <div class="row">
            <div class="start-at col-xs-6">{{ record.startedAt.substring(0, 10) }}</div>
            <div class="end-at col-xs-6">{{ record.endedAt.substring(0, 10) }}</div>
        </div>
        <div class="row">
            <div class="memo">{{ record.memo }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ServiceCard",
    props: ["record"],
};
</script>

<style scoped lang="less">
</style>
