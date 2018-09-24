<script>
import * as $http from 'axios';

export default {
    mounted() {
        this.getMaxDateRange();
    },
    methods: {
        async getMaxDateRange() {
            try {
                let params = [{ limit: 1, orderby: "startedAt" }, { limit: 1, orderby: "-startedAt" }];
                const from = await $http.get('serviceRecords', { params: params[0] });
                const to = await $http.get('serviceRecords', { params: params[1] });
                this.from = new Date(this.$moment(from.data.data[0].startedAt).format("YYYY-MM-DD"));
                this.to = new Date(this.$moment(to.data.data[0].startedAt).format("YYYY-MM-DD"));
            } catch (e) {
                console.error(e);
            }
        },
    },
};
</script>
