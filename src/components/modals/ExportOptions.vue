<template>
    <transition name="modal">
        <div class="modal-mask" @click="emitIfMaskIsClicked($event)">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header text-uppercase">
                        <slot name="header">
                            <h3 slot="header" class="c-primary text-center">{{ 'EXPORT_SERVICE_RECORD' | translate }}</h3>
                        </slot>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            <div class="flex-row">
                                <v-date-picker
                                    class="editable m-r-8 m-b-20 start-at"
                                    mode="single"
                                    v-model="from"></v-date-picker>
                                <v-date-picker
                                    class="editable m-b-20 end-at"
                                    mode="single"
                                    v-model="to"></v-date-picker>
                            </div>
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            <div class="btn-container">
                                <slot name="buttons">
                                    <button
                                        class="btn m-5"
                                        :class="btn.class"
                                        v-for="(btn, $index) in buttons"
                                        :key="$index"
                                        @click="onButton(btn.value)">
                                        <img :src="btn.image">
                                        {{ btn.title | translate }}
                                    </button>
                                </slot>
                            </div>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'ExportOptions',
    props: ['initialFrom', 'initialTo'],
    mounted() {
        this.from = this.initialFrom;
        this.to = this.initialTo;
    },
    methods: {
        emitIfMaskIsClicked(e) {
            if (e.target.className === 'modal-wrapper')
                this.$emit('close');
        },
        async excelExport(type) {
            try {
                let params = {
                    from: this.from,
                    to: this.to,
                };
                params.exportType = type;
                if (type === "html") {
                    // this.$router.push("service-status/export");
                    window.open('#/service-status/export?date=' + JSON.stringify(params), '_blank');
                } else if (type === "csv") {
                    this.$download('export/serviceRecords', params, 'area.csv');
                } else if (type === "excel") {
                    this.$download('export/serviceRecords', params, 'area.xlsx');
                }
            } catch (e) {
                console.error(e);
            }
        },
        onButton(exportType) {
            this.$emit('close');
            this.excelExport(exportType);
        }
    },
    data: () => ({
        from: null,
        to: null
    }),
    computed: {
        buttons() {
            return [{
                title: "CSV",
                class: "btn-primary btn-block",
                value: "csv"
            }, {
                title: "EXCEL",
                class: "btn-secondary btn-block",
                value: "excel"
            }, {
                title: "HTML",
                class: "btn-accent btn-block",
                value: "html"
            }]
        },
    },
}
</script>

<style scoped>
.modal-body {
    margin: 0;
    margin-top: 30px;
}
</style>