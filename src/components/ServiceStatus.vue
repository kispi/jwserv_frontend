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

        <div class="menu m-16">
            <div class="flex-row">
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
            <button v-if="bookboo" @click="showImages" class="btn btn-primary btn-block m-t-16">구역 사진 (클릭 시 확대)</button>
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
        from: null,
        to: null,
    }),
    watch: {
        keyword: debounce(function(newVal) {
            this.onKeyword(newVal);
        }, 500)
    },
    created() {
        this.$bus.$on('onDetailChanged', this.callApi)
        document.addEventListener('click', this.collapse);
    },
    beforeDestroy: function() {
        this.$bus.$off('onDetailChanged', this.callApi)
        document.removeEventListener('click', this.collapse)
    },
    computed: {
        filters() {
            return [
                {
                    key: "leaderName__icontains",
                    title: "LEADER_NAME"
                }, {
                    key: "area",
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
        bookboo() {
            let me = this.$store.getters.user
            return (me.congregation || {}).name === '경기성남북부'
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
            this.getMaxDateRange();
            this.reload();
        },
        reload() {
            this.params.orderby = "-startedAt,-area";
            this.params.limit = this.limit;

            if (this.keyword && this.keyword !== "" && this.selectedFilter) {
                this.params.filter = this.selectedFilter.key + ":" + this.keyword;
            } else {
                delete this.params.filter;
            }

            this.callApi()
        },
        async callApi() {
            this.$loading(true);
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
        showImages() {
            let images = [
                'compiled.jpeg',
                '1.png',
                '2.png',
            ].map(name => require(`@/assets/images/markets/${name}`))
            
            this.$modal.images({
                images,
                openTab: true,
            })
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
        },
        async getMaxDateRange() {
            try {
                let params = [{ limit: 1, orderby: "startedAt" }, { limit: 1, orderby: "-startedAt" }];
                const from = await $http.get('serviceRecords', { params: params[0] });
                const to = await $http.get('serviceRecords', { params: params[1] });

                if (from.data.total === 0 || !to.data.total === 0) return

                this.from = new Date(this.$moment(from.data.data[0].startedAt).format("YYYY-MM-DD"));
                this.to = new Date(this.$moment(to.data.data[0].startedAt).format("YYYY-MM-DD"));
            } catch (e) {
                console.error(e);
            }
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.list-complete-item {
    transition: all 0.3s;
}

.list-complete-enter, .list-complete-leave-to {
    opacity: 0;
    transform: translateY(320px);
}

input.search {
    height: 40px;
    font-size: 16px;
    width: 160px;
}
</style>
