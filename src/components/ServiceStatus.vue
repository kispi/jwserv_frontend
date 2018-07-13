<template>
    <div class="service-status">

        <transition name="modal">
            <Confirm
                :title="$options.filters.translate('CONFIRM_DELETE_SERVICE_RECORD')"
                :text="$options.filters.translate('CONFIRM_DELETE_SERVICE_RECORD_TXT')"
                v-if="showAskDelete"
                v-on:close="onClose">
            </Confirm>
        </transition>

        <transition-group name="list-complete" tag="div">
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
        selectedRecord: null
    }),
    mounted() {
        this.reload();
    },
    methods: {
        async reload() {
            let params = {
                orderby: "-id",
                limit: 20
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
        onClose(option) {
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
<style scoped>
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
</style>
