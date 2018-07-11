<template>
    <div class="modal-add-congregation">
        <transition name="modal">
            <div class="modal-mask" @click="emitIfMaskIsClicked($event)">
                <div class="modal-wrapper">
                    <div class="modal-container">
                        <div class="modal-header">
                            <slot name="header">
                                <h3>{{ 'ADD_CONGREGATION' | translate }}</h3>
                            </slot>
                        </div>

                        <div class="modal-body">
                            <slot name="body">
                                <p>{{ 'ADD_CONGREGATION_TXT' | translate }}</p>
                                <input class="input-block" v-model="congregationName" :placeholder="$options.filters.translate('ADD_CONGREGATION_PLACEHOLDER')">
                            </slot>
                        </div>

                        <div class="modal-footer">
                            <slot name="footer">
                                <div class="btn-container">
                                    <button class="btn btn-primary modal-default-button" @click="onConfirmCongregation(congregationName)">
                                        {{ 'CONFIRM' | translate }}
                                    </button>
                                    <button class="btn btn-default modal-default-button m-r-10" @click="$emit('close')">
                                        {{ 'CANCEL' | translate }}
                                    </button>
                                </div>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import * as $http from "axios";

export default {
    name: 'ModalAddCongregation',
    data: () => ({
        congregationName: null,
    }),
    mounted() {},
    methods: {
        async addCongregation(congregationName) {
            try {
                let payload = {
                    name: congregationName
                };
                const resp = await $http({
                    method: 'post',
                    url: '/congregations',
                    data: payload
                });
                return Promise.resolve(resp.data);
            } catch (e) {
                return Promise.reject(e.response);
            }
        },
        emitIfMaskIsClicked(e) {
            if (e.target.className === 'modal-wrapper')
                this.$emit('close');
        },
        onConfirmCongregation(congregationName) {
            var promise;
            if (congregationName && congregationName !== "") {
                promise = this.addCongregation(congregationName);    
            }
            this.$emit('close', promise);
        },
    }
}
</script>

<style scoped>
p {
    white-space: pre-wrap;
}
</style>