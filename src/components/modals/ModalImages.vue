<template>
    <div class="modal-images">
        <div class="flex-row" @click="$emit('close')">
            <div class="flex-wrap center">
                <i
                    @click.stop="onClickLeft"
                    class="zmdi zmdi-chevron-left"
                    :class="chevronLeft"/>
            </div>
            <div
                @click="openInNewTabOrClose(images[currentIndex])"
                class="image p-relative img-cover"
                v-img-cover="(images[currentIndex])"/>
            <div class="flex-wrap center">
                <i
                    @click.stop="onClickRight"
                    class="zmdi zmdi-chevron-right"
                    :class="chevronRight"/>
            </div>
        </div>
        <div class="index flex-row">
            <div
                class="item flex-wrap"
                :class="{'selected': currentIndex === idx}"
                :key="idx"
                v-for="(_, idx) in numArray"/>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ModalImages',
    props: ['options'],
    computed: {
        images() {
            return this.options.images || []
        },
        chevronLeft() {
            return this.currentIndex <= 0 ? 'o-0' : 'cursor-pointer'
        },
        chevronRight() {
            return this.currentIndex >= this.images.length - 1 ? 'o-0' : 'cursor-pointer'
        },
        numArray() {
            return this.$numArray(this.images.length)
        },
    },
    data: () => ({
        currentIndex: 0
    }),
    created() {
        window.addEventListener('keydown', this.onKeydown)
        if (this.options.selectedIndex !== undefined) {
            this.currentIndex = this.options.selectedIndex
        }

        if (!this.options.style) return

        setTimeout(_ => {
            this.applyCustomStyle()
        })
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.onKeydown)
    },
    methods: {
        applyCustomStyle() {
            setTimeout(_ => {
                if (!this.options.style) return
                
                let modalImages = document.getElementsByClassName('modal-images')[0]
                if (!modalImages) return

                let image = document.getElementsByClassName('image')[0]

                Object.keys(this.options.style).forEach(key => {
                    image.style[key]= this.options.style[key]
                })
            })
        },
        openInNewTabOrClose(imageUrl) {
            if (this.options.openTab) {
                window.open(imageUrl, '_blank')
                return
            }
            
            this.$emit('close')
        },
        onKeydown(event) {
            event.preventDefault()
            if (event.keyCode === 37 || event.keyCode === 38) {
                this.onClickLeft()
            }
            if (event.keyCode === 39 || event.keyCode === 40) {
                this.onClickRight()
            }
        },
        onClickLeft() {
            if (this.currentIndex > 0) {
                this.currentIndex--
                this.applyCustomStyle()
            }
        },
        onClickRight() {
            if (this.currentIndex < this.images.length - 1) {
                this.currentIndex++
                this.applyCustomStyle()
            }
        },
    },
}
</script>