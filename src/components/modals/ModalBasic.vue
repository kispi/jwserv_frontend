<template>
    <div class="modal-basic">
        <div class="head flex-row flex-between items-start">
            <div
                class="title"
                :class="titleClass"
                v-html="$translate(title)"/>
            <i
                @click="$emit('close')"
                class="zmdi zmdi-close"/>
        </div>
        <div
            class="body pre-line"
            :class="bodyClass"
            v-html="body"/>
        <div
            v-if="buttons"
            class="buttons">
            <div class="flex-row">
                <button
                    @click="onClickButton(btn)"
                    :key="idx"
                    v-for="(btn, idx) in buttons"
                    :class="btn.class">
                    {{ btn.label | translate }}
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ModalBasic',
    props: ['options'],
    computed: {
        title() {
            return (this.options || {}).title
        },
        titleClass() {
            return (this.options || {}).titleClass
        },
        body() {
            return (this.options || {}).body
        },
        bodyClass() {
            return (this.options || {}).bodyClass
        },
        buttons() {
            return (this.options || {}).buttons || []
        },
    },
    methods: {
        onClickButton(btn) {
            this.$emit('close', this.buttons.indexOf(btn))
        },
    },
}
</script>