<template>
    <div class="service-status-export" id="print-area">

        <Alert @close="showHelp = false" v-if="showHelp">
            <h3 class="c-primary" slot="header">
                {{ 'HELP_EXPORT' | translate }}
            </h3>
            <div class="pre-line" slot="body">{{ 'HELP_EXPORT_TXT' | translate }}</div>
        </Alert>

        <div class="m-b-55 table-wrapper" v-for="(page, pageIndex) in pages" :key="pageIndex">
            <table>
                <tr v-for="(tr, trIndex) in page" :key="trIndex" v-if="!empty(tr)">
                    <td
                        v-bind:colspan="shouldBeSpaned(tdIndex, trIndex)"
                        v-for="(td, tdIndex) in tr"
                        :class="hasContent(td)"
                        :key="tdIndex">
                        {{ td || "-" }}
                    </td>
                </tr>
            </table>
        </div>
    </div>

</template>

<script>
import Alert from '@/components/modals/Alert'
import * as $http from "axios";

export default {
    components: { Alert },
    name: 'ServiceStatusExport',
    data: () => ({
        pages: [],
        showEmpty: true,
        showHelp: false,
    }),
    mounted() {
        this.init();
        setTimeout(() => {
            this.showHelp = true;
        }, 500);
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
        hasContent(td) {
            return (td === "" ? "" : "has-content");
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
    display: block;
}

table {
    font-size: 12px;
    color: #000;
    display: contents;

    tr {
        &:first-child td {
            border-top: double 3px rgba(0, 0, 0, 0.5);
        }

        &:last-child td {
            border-bottom: double 3px rgba(0, 0, 0, 0.5);
        }

        &:not(:first-child) td {
            border-top: solid 1px rgba(0, 0, 0, 0.5);
        }
    }

    td {
        padding: 4px;
        text-align: center;

        &:not(.has-content) {
            color: #fff;
        }

        &:first-child {
            border-left: double 3px rgba(0, 0, 0, 0.5);
        }

        &:last-child {
            border-right: double 3px rgba(0, 0, 0, 0.5);
        }

        &:not(:first-child) {
            border-left: solid 1px rgba(0, 0, 0, 0.5);
        }

    }
}
</style>
