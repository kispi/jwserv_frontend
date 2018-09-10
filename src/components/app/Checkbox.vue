<template>
    <div class="checkbox display-inline-block" @click="update()">
        <div class="b-sm box">
            <transition name="fade">
                <i class="zmdi zmdi-check" v-if="val"/>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Checkbox',
    props: ['value', 'text'],
    data: () => ({
        val: null,
    }),
    created() {
        this.val = this.value;
    },
    methods: {
        update() {
            this.val = !this.val;
            this.$emit('input', this.val);
        }
    },
}    
</script>

<style lang="less" scoped>
</style>
