<template>
    <div class="not-found">
        <div class="f-700 f-28 m-b-30">
            {{ 'NOT_FOUND' | translate }}
        </div>
        <div class="instruction" v-html="instruction">
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        instruction() {
            return this.$translate('NOT_FOUND_INSTRUCTION');
        }
    },
}
</script>

<style lang="less" scoped>
.not-found {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translateX(-50%);
    text-align: center;
    padding: 16px;

    > .instruction {
        font-size: 20px;
        line-height: 24px;
    }
}
</style>