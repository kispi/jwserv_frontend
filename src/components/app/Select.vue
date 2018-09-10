<template>
    <div class="select" ref="select">

        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <ul class="item-list shadow pull-right" v-if="showSelect">
                <li v-for="(item, index) in items" :key="index" @click="onSelect(item)">
            </ul>
        </transition>

    </div>
</template>

<script>
export default {
    name: 'Select',
    props: [],
    data: () => ({
        
    }),
    mounted() {
        this.init();
    },
    created() {
        document.addEventListener('click', this.documentClick)
    },
    destroyed() {
        document.removeEventListener('click', this.documentClick)
    },
    methods: {
        async init() {
            this.reload();
        },
        documentClick(e){
            let el = this.$refs['select'];
            let target = e.target;
            if (el !== target && !el.contains(target)) {
                this.showSelect = false;
            }
        },
        toggleshowSelect() {
            this.showSelect = !this.showSelect;
        },
        onSelect(item) {
            this.showSelect = false;
            this.congregation = congregation;
            this.selected = item;
            this.$emit('onSelect', this.congregation);
        },
    }
}
</script>

<style lang="less" scoped>
    .item-list {
        position: absolute;
        animation-duration: .3s;
        margin: 0;
        padding: 0;
        background: #fff;
        overflow: scroll;
        height: 300px;
        left: 32px;
        right: 32px;

        li {
            list-style-type: none;
            border-bottom: 1px solid #eee;
            padding: 16px;
        }

        li:hover {
            background: #eee;
        }
    }

    .selected-item {
        width: 100%;
        display: block;
        border: 1px solid rgba(0, 0, 0, 0.25);
        border-radius: 4px;
        font-size: 20px;
        padding: 12px;
    }
</style>
