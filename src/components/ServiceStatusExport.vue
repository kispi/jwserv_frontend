<template>
    <div class="service-status-export" id="print-area">
        <!-- <div class="menu m-16 flex-rtl">
            <button class="btn btn-default flex-ltr p-l-40 p-relative" @click="print()">
                <img class="m-t-8 m-r-8 display-inline-block p-absolute" src="../assets/excel.png" style="width: 24px; height: 24px; left: 8px;">
                <span class="text-uppercase display-inline-block">{{ 'PRINT' | translate }}</span>
            </button>
        </div> -->

        <div class="m-b-30 table-wrapper" v-for="(page, pageIndex) in pages" :key="pageIndex">
            <table>
                <tr v-for="(tr, trIndex) in page" :key="trIndex" v-if="!empty(tr)">
                    <td
                        v-bind:colspan="shouldBeSpaned(tdIndex, trIndex)"
                        v-for="(td, tdIndex) in tr"
                        :key="tdIndex"
                        :class="hasContent(tr)">
                        {{ td || "-" }}
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import Pagination from '@/components/app/Pagination'
import * as $http from "axios";

export default {
    components: { Pagination },
    name: 'ServiceStatusExport',
    data: () => ({
        pages: [],
        showEmpty: true,
    }),
    created() {
    },
    computed: {
    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            let params = {
                    all: true,
                    exportType: 'html'
                };
            $http.get('export/serviceRecords', { params })
                .then(r => {
                    this.pages = this.removeEmptyCells(r.data.data);
                })
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
        },
        removeEmptyCells(data) {
            var returnOdds = function(row) {
                let newRow = [];
                row.forEach((td, index) => {
                    if (index % 2 === 0) {
                        newRow.push(td);
                    }
                })
                return newRow;
            }
            data.forEach(page => {
                if (page.length > 0); {
                    page[0] = returnOdds(page[0]);
                }

                for (var i = 1; i < page.length; i++) {
                    if (i % 2 === 1) {
                        page[i] = returnOdds(page[i]);
                    }
                }
            })
            return data;
        },
        hasContent(tr) {
            if (tr.some(td => {
                return td !== "";
            })) {
                return "has-content";
            };
        },
        empty(tr) {
            if (this.showEmpty) {
                return false;
            }
            return !tr.some(td => {
                return td !== "";
            })
        },
        shouldBeSpaned(tdIndex, trIndex) {
            return ((trIndex === 0 || trIndex % 2 === 1) ? 2 : 1);
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.table-wrapper {
    clear: left;
    float: left;
}

table {
    display: block;
    font-size: 12px;
    color: #000;

    tr:not(:first-child) td {
        border: solid 1px rgba(0, 0, 0, 0.5);
    }

    td {
        padding: 4px;
        text-align: center;

        &:not(.has-content) {
            color: #fff;
        }
    }
}
</style>
