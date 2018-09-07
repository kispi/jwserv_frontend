<template>
    <div class="weeks">
        <div class="flex-row week">
            <span
                v-for="obj in week"
                :key="obj.id"
                class="p-8 f-700 f-16"
                :class="{ 'bg-secondary c-white': selected && obj.id === selected.id }"
                @click="onSelectDayFilter(obj)">
                {{ obj.name | translate }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Weeks',
    data: () => ({
        selected: null,
        weekArray: [
            { id: 1, name: 'SUN' },
            { id: 2, name: 'MON' },
            { id: 3, name: 'TUE' },
            { id: 4, name: 'WED' },
            { id: 5, name: 'THU' },
            { id: 6, name: 'FRI' },
            { id: 7, name: 'SAT' },
        ]
    }),
    computed: {
        week() {
            return this.weekArray.map(d => {
                return { id: d.id, name: this.$translate(d.name)[0] }
            })
        } 
    },
    methods: {
        onSelectDayFilter(day) {
            if (!day) {
                this.selected = null;
            } else if (this.selected && day.id === this.selected.id)  {
                this.selected = null;
            } else {
                this.selected = this.weekArray.find(d => {
                    return d.id === day.id;
                })
            }
            this.$emit('onDaySelected', this.selected);
        }
    }
}
    
</script>

<style lang="less" scoped>
.flex-row {
    text-align: center;
    padding: 0 16px 0 16px;
    width: 100%;

    span {
        max-width: 32px;
        max-height: 32px;
        border-radius: 50%;
    }
}
</style>
