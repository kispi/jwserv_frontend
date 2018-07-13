<template>
    <div class="modal-mask" @click="emitIfMaskIsClicked($event)">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <slot name="header">
                        <h3>{{ title }}</h3>
                    </slot>
                </div>

                <div class="modal-body">
                    <slot name="body">
                        {{ text }}
                    </slot>
                </div>

                <div class="modal-footer">
                    <slot name="footer">
                        <div class="btn-container">
                            <button class="btn btn-secondary modal-default-button" @click="$emit('close', 'cancel')">
                                {{ 'CANCEL' | translate }}
                            </button>
                            <button class="btn btn-primary modal-default-button" @click="$emit('close', 'ok')">
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
    name: 'Confirm',
    props: [ 'title', 'text' ],
    methods: {
        emitIfMaskIsClicked(e) {
            if (e.target.className === 'modal-wrapper')
                this.$emit('close');
        },
    }
}
</script>

<style scoped>
</style>