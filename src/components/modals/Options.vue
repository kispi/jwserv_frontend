<template>
    <transition name="modal">
        <div class="modal-mask" @click="emitIfMaskIsClicked($event)">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header text-uppercase">
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
                                <slot name="buttons">
                                    <button
                                        class="btn m-5"
                                        :class="btn.class"
                                        v-for="(btn, $index) in buttons"
                                        :key="$index"
                                        @click="$emit('close', btn.value)">
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
    name: 'Options',
    props: ['title', 'text', 'buttons'],
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