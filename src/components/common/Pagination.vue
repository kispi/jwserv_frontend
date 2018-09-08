<template>
    <div class="pagination">
        <div class="flex-row hor-scroll">
            <span
                v-for="(obj, index) in numberOfPages"
                :key="index"
                :class="{ 'bg-secondary c-white': selected === index }"
                @click="onSelectIndex(index)">
                {{ index + 1 }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: ['limit', 'total', 'selected'],
    computed: {
        numberOfPages() {
            if (this.total && this.limit)
                return Math.ceil(this.total / this.limit);
            return 1;
        }
    },
    methods: {
        onSelectIndex(index) {
            this.$emit('onPageSelected', index);
        }
    }
}
    
</script>

<style lang="less" scoped>
.flex-row {
    text-align: center;
    margin: 0 16px 0 16px;

    span {
        min-width: 32px;
        min-height: 32px;
        max-width: 32px;
        max-height: 32px;
        font-size: 16px;
        line-height: 16px;
        padding: 8px;
        margin: 8px;
        border-radius: 50%;
    }
}
</style>
