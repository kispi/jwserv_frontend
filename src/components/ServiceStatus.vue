<template>
    <div class="service-status">

        <transition name="fade" tag="div">
            <div class="search" v-if="showSearch">
                <input v-model="query"/>
            </div>
        </transition>

        <transition name="modal">
            <Confirm
                :title="$options.filters.translate('CONFIRM_DELETE_SERVICE_RECORD')"
                :text="$options.filters.translate('CONFIRM_DELETE_SERVICE_RECORD_TXT')"
                v-if="showAskDelete"
                v-on:close="onCloseAskDelete">
            </Confirm>
        </transition>

        <transition-group name="list-complete" tag="div" class="service-cards">
            <ServiceCard
                :record="record"
                v-for="record in serviceRecords"
                :key="record.id"
                v-on:showAskDelete="onShowAskDelete"
                class="list-complete-item"
            ></ServiceCard>
        </transition-group>

    </div>
</template>

<script>
import Confirm from '@/components/modals/Confirm';
import ServiceCard from '@/components/ServiceCard';
import * as $http from "axios";

export default {
    components: { ServiceCard, Confirm },
    name: 'ServiceStatus',
    data: () => ({
        serviceRecords: null,
        showAskDelete: false,
        selectedRecord: null,
        showSearch: false,
        query: null,
    }),
    created() {
        this.$bus.$on("showSearch", () => {
            this.showSearch = true;
        });
    },
    beforeDestroy: function() {
        this.$bus.$off("showSearch");
    },
    mounted() {
        this.reload();
    },
    methods: {
        async reload() {
            let params = {
                orderby: "-id",
                limit: 20,
            }
            try {
                const resp = await $http.get(
                    '/serviceRecords', { params }
                );
                this.serviceRecords = resp.data.data;
            } catch (e) {
                console.error(e.response);
            }
        },
        onShowAskDelete(record) {
            this.showAskDelete = true;
            this.selectedRecord = record;
        },
        onCloseAskDelete(option) {
            this.showAskDelete = false;
            if (option === "ok" && this.selectedRecord) {
                this.deleteRecord()
            }
        },
        async deleteRecord() {
            try {
                const resp = await $http({ method: 'delete', url: '/serviceRecords/' + this.selectedRecord.id });
                this.reload();
            } catch (e) {
                console.error(e.response);
            }
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.list-complete-item {
    transition: all 0.5s;
}

.list-complete-enter, .list-complete-leave-to {
    opacity: 0;
    transform: translateX(320px);
}

.list-complete-leave-active {
    position: absolute;
}

.service-cards {
    position: fixed;
    height: calc(~"100vh - 150px");
    overflow: scroll;
    left: 0;
    right: 0;
}

.search {
    position: fixed;
    top: 48px;
    right: 0;
    z-index: 1;

    > input {
        padding: 8px;
    }
}
</style>
