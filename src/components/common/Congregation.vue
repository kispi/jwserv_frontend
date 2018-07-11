<template>
    <div class="congregation" ref="congregation">
        <Alert @close="addCongregationError = false" v-if="addCongregationError">
            <h3 slot="header">{{ errMsg | translate }}</h3>
            <div slot="body">{{ errMsg + "_TXT" | translate }}</div>
        </Alert>
        <AddCongregation @close="onAddCongregationConfirmed" v-if="showAddCongregation"></AddCongregation>
        <div class="selected-congregation select" @click="toggleShowCongregations()">
            <span v-if="congregation">{{ congregation.name }}</span>
            <span v-if="!congregation">{{ 'SELECT_CONGREGATION' | translate }}</span>
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
    data: () => ({
        showCongregations: false,
        showAddCongregation: false,
        addCongregationError: false,
        congregations: null,
        congregation: null,
        errMsg: null,
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
            try {
                const resp = await $http({method: 'get', url: '/congregations' + '?orderby=name'});
                this.congregations = resp.data.data;

            } catch (e) {
                console.error(e.response);
            }
        },
        documentClick(e){
            let el = this.$refs.congregation;
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
            this.congregation = congregation;
            this.$emit('onCongregationSelected', this.congregation);
        },
        onAddCongregationClick() {
            this.showCongregations = false;
            this.showAddCongregation = true;
        },
        onAddCongregationConfirmed(result) {
            this.showAddCongregation = false;
            if (typeof result === 'Promise') {
                result
                    .then(r => {
                        console.log(r);
                    })
                    .catch(e => {
                        this.addCongregationError = true;
                        this.errMsg = e.response.data;
                    })
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .congregation-list {
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