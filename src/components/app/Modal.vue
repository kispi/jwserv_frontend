<template>
    <transition name="modal">
        <div
            v-if="showModal"
            class="global-modal"
            @click="closeOnClickMask">
            <div class="global-modal-container">
                <component
                    @close="onClose"
                    :options="(event || {}).options"
                    :is="selectedModal"/>
            </div>
        </div>
    </transition>
</template>

<script>
import ModalBasic from '@/components/modals/ModalBasic';
import ModalImages from '@/components/modals/ModalImages';
import ModalInput from '@/components/modals/ModalInput';

export default {
    name: 'Modal',
    components: {
        ModalBasic,
        ModalImages,
        ModalInput,
    },
    data: () => ({
        showModal: false,
        event: null,
        selectedModal: null,
    }),
    created() {
        this.$bus.$on('onDidOpenModal', this.onDidOpenModal)
        document.addEventListener('keydown', this.onKeydown)
    },
    beforeDestroy() {
        this.$bus.$off('onDidOpenModal', this.onDidOpenModal)
        document.removeEventListener('keydown', this.onKeydown)
    },
    methods: {
        onDidOpenModal(event) {
            this.selectedModal = event.component
            if (!this.selectedModal) {
                console.error('Modal component is undefined')
                return
            }

            this.showModal = true
            this.event = event
        },
        onClose(event) {
            this.showModal = false
            if (event !== undefined) {
                this.$bus.$emit('onDidCloseModal', event)
            }
            this.event = null
        },
        closeOnClickMask(event) {
            if (event.target.classList.contains('global-modal')) {
                this.showModal = false
            }
        },
        onKeydown(event) {
            if (event.keyCode === 27) {
                this.showModal = false
            }
        }
    }
}
</script>
