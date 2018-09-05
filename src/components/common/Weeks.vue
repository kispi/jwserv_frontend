<template>
    <div class="weeks">
        <div class="flex-row">
            <span
                class="p-16 f-700 f-20"
                :class="{ 'selected': all.id === selected.id }"
                @click="onSelectDayFilter(all)">
                {{ all.name | translate }}
            </span>
        </div>
        <div class="flex-row week">
            <span
                class="p-16 f-700 f-20"
                v-for="obj in week"
                :key="obj.id"
                :class="{ 'selected': obj.id === selected.id }"
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
        all: { id: 0, name: 'ALL' },
        selected: { id: 0, name: 'ALL' },
        week: [
            { id: 1, name: 'SUN' },
            { id: 2, name: 'MON' },
            { id: 3, name: 'TUE' },
            { id: 4, name: 'WED' },
            { id: 5, name: 'THU' },
            { id: 6, name: 'FRI' },
            { id: 7, name: 'SAT' },
        ],
    }),
    methods: {
        onSelectDayFilter(day) {
            this.selected = day;
            this.$emit('onDaySelected', this.selected);
        }
    }
}
    
</script>

<style lang="less" scoped>
.flex-row {
    text-align: center;
    background: rgba(0, 0, 0, 0.5);
    color: rgba(255, 255, 255, 0.85);
    margin: 0 16px 0 16px;

    .selected {
        background: #DC3545;
    }
}
</style>
