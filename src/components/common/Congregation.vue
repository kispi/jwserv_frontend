<template>
    <div class="congregation" ref="congregation">

        <Alert @close="addCongregationError = false" v-if="addCongregationError">
            <h3 slot="header" class="c-danger">{{ errMsg | translate }}</h3>
            <div slot="body">{{ errMsg + "_TXT" | translate }}</div>
        </Alert>

        <AddCongregation @close="onAddCongregationConfirmed" v-if="showAddCongregation"></AddCongregation>
        
        <div class="selected-congregation select" :class="{ 'invalid': invalid }" @click="toggleShowCongregations()">
            <span v-if="selectedCongregation">{{ selectedCongregation.name }}</span>
            <span v-if="!selectedCongregation">{{ 'SELECT_CONGREGATION' | translate }}</span>
        </div>
        
        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <ul class="congregation-list shadow pull-right" v-if="showCongregations">
                <li @click="onAddCongregationClick()">{{ 'ADD_CONGREGATION' | translate }} <span class="add-congregation zmdi zmdi-plus pull-right"></span></li>
                <li v-for="c in congregations" :key="c.id" @click="onSelectCongregation(c)">{{ c.name }}</li>
            </ul>
        </transition>

    </div>
</template>
<script>
import * as $http from "axios";
import Alert from "@/components/modals/Alert";
import AddCongregation from "@/components/modals/AddCongregation";

export default {
    components: { Alert, AddCongregation },
    name: 'Congregation',
    props: ['invalid', 'congregation'],
    data: () => ({
        showCongregations: false,
        showAddCongregation: false,
        addCongregationError: false,
        congregations: null,
        selectedCongregation: null,
        errMsg: null,
    }),
    watch: {
        congregation() {
            this.selectedCongregation = this.congregation;
        }
    },
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
            if (this.congregation) {
                this.selectedCongregation = this.congregation;
            }
        },
        async reload() {
            try {
                const resp = await $http({method: 'get', url: '/congregations' + '?orderby=name'});
                this.congregations = resp.data.data;
            } catch (e) {
                console.error(e.response);
            }
        },
        documentClick(e){
            let el = this.$refs['congregation'];
            let target = e.target;
            if (el !== target && !el.contains(target)) {
                this.showCongregations = false;
            }
        },
        toggleShowCongregations() {
            this.showCongregations = !this.showCongregations;
        },
        onSelectCongregation(congregation) {
            this.showCongregations = false;
            this.selectedCongregation = congregation;
            this.$emit('onCongregationSelected', this.selectedCongregation);
        },
        onAddCongregationClick() {
            this.showCongregations = false;
            this.showAddCongregation = true;
        },
        onAddCongregationConfirmed(promise) {
            this.showAddCongregation = false;
            if (promise) {
                promise
                    .then(r => {
                        this.reload();
                        this.showCongregations = true;
                        this.$toast.success("SUCCESS_SAVE");
                    })
                    .catch(e => {
                        this.addCongregationError = true;
                        this.errMsg = e.data;
                    })
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .congregation-list {
        z-index: 1;
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

    .selected-congregation {
        width: 100%;
        display: block;
        border: 1px solid rgba(0, 0, 0, 0.25);
        border-radius: 4px;
        font-size: 20px;
        padding: 12px;
    }
</style>
