<template>
    <transition name="slide-down">
        <div
            class="toast-wrapper"
            v-if="toast.show">
            <div
                class="toast shadow"
                :class="toast.class"
                @click.stop="toastClicked">
                <div v-html="html" />
                <i
                    class="zmdi zmdi-close"
                    v-if="toast.type === 'dismiss'"
                    @click="dismiss"/>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    methods: {
        dismiss() {
            this.$store.dispatch("removeToast");
        },
        toastClicked() {},
    },
    computed: {
        showToast() {
            return this.toast.show;
        },
        toast() {
            return this.$store.getters.toast;
        },
        html() {
            return this.$options.filters.textToHTML(
                this.$translate(this.toast.message)
            );
        }
    },
    watch: {
        showToast() {
            if (this.toast.show) {
                if (this.toastTimeout) {
                    clearTimeout(this.toastTimeout);
                }
                if (!this.toast.type) {
                    this.toastTimeout = setTimeout(() => {
                        this.$store.dispatch("removeToast");
                    }, 3000);
                }
            }
        }
    }
};
</script>
