<template>
    <div class="service-status">
        <ServiceCard :record="record" v-for="record in serviceRecords" :key="record.id"></ServiceCard>
    </div>
</template>

<script>
import ServiceCard from '@/components/ServiceCard'
import * as $http from "axios";

export default {
    components: { ServiceCard },
    name: 'ServiceStatus',
    data () {
        return {
            serviceRecords: null,
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
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
