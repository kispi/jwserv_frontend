<template>
    <div class="dashboard">
        <!-- <Stat :stat="stat" v-for="stat in stats" :key="stat.id"/> -->
    </div>
</template>

<script>
export default {
    name: 'Status',
    // components: {Stat},
    data: () => ({
        stats: null,
    }),
    mounted() {
        this.reloadCards();
    },
    methods: {
        reloadCards() {
            this.stats = [
                {
                    id: 0,
                    title: this.$translate("LOGIN")
                }
            ]
        }
    }
}
</script>

<style scoped>
</style>
