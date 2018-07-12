<template>
    <div class="service-status">
        <Confirm
            :title="$options.filters.translate('CONFIRM_DELETE_SERVICE_RECORD')"
            :text="$options.filters.translate('CONFIRM_DELETE_SERVICE_RECORD_TXT')"
            v-if="showAskDelete"
            v-on:close="onClose">
        </Confirm>
        <ServiceCard
            :record="record"
            v-for="record in serviceRecords"
            :key="record.id"
            v-on:showAskDelete="showAskDelete = true"
            ></ServiceCard>
    </div>
</template>

<script>
import Confirm from '@/components/modals/Confirm';
import ServiceCard from '@/components/ServiceCard';
import * as $http from "axios";

export default {
    components: { ServiceCard, Confirm },
    name: 'ServiceStatus',
    data () {
        return {
            serviceRecords: null,
            showAskDelete: false,
        }
    },
    mounted() {
        this.reload();
    },
    methods: {
        async reload() {
            let params = {
                orderby: "-id",
                limit: 20
            }
            const resp = await $http.get(
                '/serviceRecords', { params }
            );
            this.serviceRecords = resp.data.data;
        },
        onClose(option) {
            this.showAskDelete = false;
            console.log(option);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
