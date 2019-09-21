<template>
    <div class="modal-input">
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
            v-if="inputs"
            class="inputs">
            <div
                class="form-control"
                :key="idx"
                v-for="(input, idx) in inputs">
                <label v-html="$translate(input.label)"/>
                <input
                    :class="`modal-input-${idx}`"
                    v-if="input.type !== 'textarea'"
                    v-model="input.text"
                    :placeholder="$translate(input.placeholder)"/>
                <textarea
                    v-else
                    v-model="input.text"
                    :placeholder="$translate(input.placeholder)"/>
            </div>
        </div>
        <div class="buttons">
            <div class="flex-row">
                <button @click="$emit('close')" class="btn btn-default" v-html="$translate('CANCEL')"/>
                <button @click="$emit('close', inputs)" class="btn btn-primary" v-html="$translate('CONFIRM')"/>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ModalInput',
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
        inputs() {
            return (this.options || {}).inputs || []
        },
    },
    mounted() {
        this.$nextTick(_ => {
            let dom = document.getElementsByClassName('modal-input-0')
            if (dom && dom.length > 0) {
                dom[0].focus()
            }
        })
    },
}
</script>