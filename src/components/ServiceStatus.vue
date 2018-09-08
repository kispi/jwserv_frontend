<template>
    <div class="service-status">

        <Weeks @onDaySelected="onDaySelected"></Weeks>

        <transition name="fade" tag="div">
            <div class="search" v-if="showSearch">
                <input class="query-value" v-selected v-model="keyword" ref="query-value" />
                <div class="filters">
                    <div class="c-secondary f-700">{{ selectedFilter.title | translate }}</div>
                    <i class="zmdi zmdi-filter-list" @click="showFilters = !showFilters"></i>

                    <transition name="fade">
                        <ul v-if="showFilters">
                            <li class="filter-item" v-for="filter in filters" :key="filter.title" @click="selectFilter(filter)">
                                {{ filter.title | translate }}
                                <i class="zmdi zmdi-check pull-right c-secondary" v-if="selectedFilter.key === filter.key"></i>
                            </li>
                        </ul>
                    </transition>
                </div>
            </div>
        </transition>

        <transition name="modal">
            <Confirm
                :text="$options.filters.translate('CONFIRM_DELETE_SERVICE_RECORD_TXT')"
                v-if="showAskDelete"
                v-on:close="onCloseAskDelete">
                <h3 slot="header" class="c-danger">{{ 'CONFIRM_DELETE_SERVICE_RECORD' | translate }}</h3>
            </Confirm>
        </transition>

        <transition-group name="list-complete" tag="div" class="service-cards">
            <ServiceCard
                :record="record"
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
import ServiceCard from '@/components/ServiceCard';
import Pagination from '@/components/common/Pagination'
import Weeks from '@/components/common/Weeks';
import * as $http from "axios";

export default {
    components: { ServiceCard, Confirm, Weeks, Pagination },
    name: 'ServiceStatus',
    data: () => ({
        serviceRecords: null,
        showAskDelete: false,
        selectedRecord: null,
        total: null,
        showSearch: false,
        showFilters: false,
        selectedDay: null,
        selectedPage: null,
        selectedFilter: null,
        limit: 20,
        keyword: null,
        params: {}
    }),
    watch: {
        keyword: debounce(function(newVal) {
            this.reload(newVal);
        }, 500)
    },
    created() {
        document.addEventListener('click', this.collapse);
    },
    beforeDestroy: function() {
        this.$bus.$off("showSearch");
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
                    key: "memo",
                    title: "MEMO"
                }
            ]
        }
    },
    mounted() {
        this.selectedFilter = this.filters[0];
        this.selectedPage = 0;
        this.reload();
    },
    methods: {
        async reload() {
            this.params.orderby = "-id";
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
        },
        async deleteRecord() {
            try {
                const resp = await $http({ method: 'delete', url: '/serviceRecords/' + this.selectedRecord.id });
                this.reload();
            } catch (e) {
                console.error(e.response);
            }
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
        selectFilter(filter) {
            this.showFilters = false;
            this.selectedFilter = filter;
            this.$refs['query-value'].focus();
            this.reload(this.keyword);
        },
        collapse(e) {
            if (e.target.className === 'nav-bar-button mobile-search') {
                this.showSearch = !this.showSearch;
                return;
            }

            this.showSearch = [
                'nav-bar-button mobile-search',
                'query-value',
                'zmdi zmdi-filter-list',
                'filter-item'
            ].some(c => {
                return c === e.target.className;
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}

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

.service-cards {
    top: 48px;
    bottom: 48px;
    left: 0;
    right: 0;
}

.search {
    position: fixed;
    top: 48px;
    right: 0;
    z-index: 1;

    input {
        width: 226px;
        padding-right: 80px;
    }

    .filters {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        line-height: 40px;

        div {
            font-size: 12px;
        }

        i {
            padding: 8px;
            font-size: 24px;
            color: rgba(0, 0, 0, 0.5);

            &.zmdi-filter-list {
                right: 0;
            }

            &.zmdi-check {
                padding: 0;
            }
        }

        ul {
            position: absolute;
            top: 0;
            right: 0;
            animation-duration: 0.3s;
            padding: 0;
            margin: 0;
            top: 40px;
            width: 140px;

            li {
                line-height: initial;
                padding: 8 16px;
                cursor: pointer;
                border: solid 1px rgba(0, 0, 0, 0.25);
                border-bottom: dotted 1px rgba(0, 0, 0, 0.1);
                background: white;
                list-style-type: none;

                &:hover {
                    background: rgba(0, 0, 0, 0.05);
                }
            }
        }
    }
}
</style>
