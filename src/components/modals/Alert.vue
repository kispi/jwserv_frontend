<template>
    <div class="modal-mask" @click="emitIfMaskIsClicked($event)">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <slot name="header">
                    default header
                    </slot>
                </div>

                <div class="modal-body">
                    <slot name="body">
                    </slot>
                </div>

                <div class="modal-footer">
                    <slot name="footer">
                        <div class="btn-container">
                            <button type="button" class="btn btn-primary modal-default-button" @click="$emit('close')">
                                {{ 'OK' | translate }}
                            </button>
                        </div>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Alert',
    data: () => ({}),
    mounted() {},
    methods: {
        emitIfMaskIsClicked(e) {
            if (e.target.className === 'modal-wrapper')
                this.$emit('close');
        }
    }
}
</script>

<style scoped>

</style>