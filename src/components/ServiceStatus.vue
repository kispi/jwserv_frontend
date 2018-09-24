<template>
    <div class="service-status">

        <Confirm
            :text="$options.filters.translate('CONFIRM_DELETE_SERVICE_RECORD_TXT')"
            v-if="showAskDelete"
            v-on:close="onCloseAskDelete">
            <h3 slot="header" class="c-danger">{{ 'CONFIRM_DELETE_SERVICE_RECORD' | translate }}</h3>
        </Confirm>

        <ExportOptions
            v-if="showOptions && from && to"
            v-on:close="showOptions = false"
            :initialFrom="from"
            :initialTo="to">
        </ExportOptions>

        <Weeks @onDaySelected="onDaySelected"></Weeks>

        <div class="menu m-16 flex-row">
            <div class="pull-left flex-row search">
                <input ref="keyword" v-model="keyword" :placeholder="'KEYWORD' | translate" class="search flex-wrap m-r-8">
                <Selector
                    class="flex-wrap"
                    v-model="selectedFilterTitle"
                    :items="filterTitles"
                    :translate="true"
                    v-on:change="onChange"/>
            </div>

            <div class="flex-rtl">
                <button class="btn btn-default flex-ltr p-l-40 p-relative" @click="showOptions = true">
                    <img class="m-t-8 m-r-8 display-inline-block p-absolute" src="../assets/images/excel.png" style="width: 24px; height: 24px; left: 8px;">
                    <span class="text-uppercase display-inline-block">{{ 'EXPORT' | translate }}</span>
                </button>
            </div>
        </div>

        <transition-group name="list-complete" tag="div" class="service-cards">
            <ServiceCard
                :record="record"
                :role="user.role"
                v-for="record in serviceRecords"
                :key="record.id"
                v-on:showAskDelete="onShowAskDelete"
                class="list-complete-item"
            ></ServiceCard>
        </transition-group>

        <Pagination
            :limit="limit"
            :total="total"
            :selected="selectedPage"
            v-on:onPageSelected="onPageSelected"></Pagination>

    </div>
</template>

<script>
import debounce from '@/modules';
import Confirm from '@/components/modals/Confirm';
import ExportOptions from '@/components/modals/ExportOptions';
import ServiceCard from '@/components/ServiceCard';
import Pagination from '@/components/app/Pagination'
import Selector from '@/components/app/Selector';
import Weeks from '@/components/app/Weeks';
import ExportRange from '@/mixins/ExportRange'
import * as $http from "axios";

export default {
    components: { ServiceCard, Selector, Confirm, ExportOptions, Weeks, Pagination },
    name: 'ServiceStatus',
    data: () => ({
        user: null,
        serviceRecords: null,
        showAskDelete: false,
        showOptions: false,
        total: null,
        selectedRecord: null,
        selectedDay: null,
        selectedPage: null,
        selectedFilter: null,
        selectedFilterTitle: "LEADER_NAME",
        limit: 20,
        keyword: null,
        params: {},
    }),
    mixins: [ExportRange],
    watch: {
        keyword: debounce(function(newVal) {
            this.onKeyword(newVal);
        }, 500)
    },
    created() {
        document.addEventListener('click', this.collapse);
    },
    beforeDestroy: function() {
        document.removeEventListener('click', this.collapse)
    },
    computed: {
        filters() {
            return [
                {
                    key: "leaderName__icontains",
                    title: "LEADER_NAME"
                }, {
                    key: "area__icontains",
                    title: "AREA"
                }, {
                    key: "startedAt__icontains",
                    title: "STARTED_AT"
                }, {
                    key: "endedAt__icontains",
                    title: "ENDED_AT"
                }, {
                    key: "memo__icontains",
                    title: "MEMO"
                }
            ]
        },
        filterTitles() {
            let f = this.filters.map(f => {
                return f.title;
            })
            return f;
        },
    },
    mounted() {
        if (!this.$store.getters.user.role)
            this.$store.dispatch('getMe');

        this.selectedFilter = this.filters[0];
        this.init();
    },
    methods: {
        async init() {
            if (this.$store.getters.user)
                this.user = this.$store.getters.user;

            this.selectedPage = 0;
            this.reload();
        },
        async reload() {
            this.$loading(true);
            this.params.orderby = "-startedAt";
            this.params.limit = this.limit;

            if (this.keyword && this.keyword !== "" && this.selectedFilter) {
                this.params.filter = this.selectedFilter.key + ":" + this.keyword;
            } else {
                delete this.params.filter;
            }

            try {
                const resp = await $http.get(
                    '/serviceRecords' + (this.selectedDay ? '/' + this.$options.filters.translate(this.selectedDay.name, "en") : ""), { params: this.params }
                );
                this.serviceRecords = resp.data.data;
                this.total = resp.data.total;
            } catch (e) {
                console.error(e);
            }
            this.$loading(false);
        },
        async deleteRecord() {
            try {
                const resp = await $http({ method: 'delete', url: '/serviceRecords/' + this.selectedRecord.id });
                this.reload();
                this.$toast.success("SUCCESS_DELETE");
            } catch (e) {
                console.error(e.response);
            }
        },
        onKeyword(keyword) {
            delete this.params.offset;
            this.selectedPage = 0;
            this.reload();
        },
        onPageSelected(page) {
            this.params.offset = page * this.params.limit;
            this.selectedPage = page;
            this.reload();
        },
        onDaySelected(day) {
            delete this.params.offset;
            this.selectedDay = day;
            this.onPageSelected(0);
            this.reload();
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
        onChange(event) {
            let filterTitle = event.newVal;
            this.keyword = null;
            this.selectedFilter = this.filters.find(f => {
                return f.title === filterTitle;
            })
            this.$refs['keyword'].focus();
            this.reload(this.keyword);
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.list-complete-item {
    transition: all 0.3s;
}

.list-complete-enter, .list-complete-leave-to {
    opacity: 0;
    transform: translateY(50px);
}

.service-cards {
    top: 48px;
    bottom: 48px;
    left: 0;
    right: 0;
}

input.search {
    height: 40px;
    font-size: 16px;
    width: 160px;
}

.selector {
    width: 80px;

    li, .selected-item, span {
        padding: 11px 4px !important;
    }
}
</style>
