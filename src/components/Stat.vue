<template>
    <div class="card">
        
    </div>
</template>

<script>
import * as $http from "axios";

export default {
    name: "Stats",
    props: ["stat"],
    data: () => ({
    }),
    computed: {
        vendor() {
            return this.chatroom.vendor;
        }
    },
    mounted() {
    },
    methods: {
        baseParams() {
            return {
                order: "desc",
                sortby: "id",
                join: "none",
                limit: 1
            };
        },
        async init() {
            var params = this.baseParams();
            params.query = "chatroom.id:" + this.chatroom.id;
            const resp = await $http.get(
                "/webchat/messages/" + this.chatroom.vendor.id,
                {
                    params: params
                }
            );
            if (resp.data.data) {
                if (resp.data.data.length > 0) {
                    this.recentMessage = resp.data.data[0].message;
                }
            }
        },
    }
};
</script>

<style scoped lang="less">
</style>
