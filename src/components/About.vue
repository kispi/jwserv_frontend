<template>
    <div class="about">
        <div class="about-title">
            {{ 'ABOUT_JWSERV' | translate }}
        </div>
        <div class="about-desc" v-html="about"/>
        <div class="tech-stack">
            <div class="c-secondary" @click="toggleShowPowered()" >{{ 'TECH_STACK' | translate }}</div>
                <transition name="slide-fade">
                    <ul v-show="showPowered">
                        <li v-for="(title, index) in stack" :key="index">{{ title }}</li>
                    </ul>
                </transition>
            </div>
        </div>
</template>

<script>
export default {
    data: () => ({
        showPowered: false
    }),
    computed: {
        about() {
            return this.$translate('ABOUT_JWSERV_TXT')
        },
        stack() {
            return ['golang', 'vue', 'aws']
        }
    },
    methods: {
        toggleShowPowered() {
            this.showPowered = !this.showPowered;
        }
    }
}
</script>

<style lang="less" scoped>
.about {
    padding: 64px 16px;

    .about-title {
        font-weight: 800;
        font-size: 32px;
    }

    .about-desc {
        margin-top: 32px;
        padding: 16px;
        line-height: 20px;
        white-space: pre-wrap;
    }

    .tech-stack {
        position: absolute;
        bottom: 80px;
        right: 16px;

        ul {
            padding: 0 !important;

            li {
                list-style-type: none;
                padding: 4px;
                padding-left: 8px;
                animation-duration: .3s;
            }
        }
    }

    .slide-fade-enter-active {
        transition: all .1s ease;
    }
    
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateY(20px);
        opacity: 0;
    }
}
</style>