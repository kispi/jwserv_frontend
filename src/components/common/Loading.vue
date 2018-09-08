<template>
    <div class="loading">
        <Loader/>
    </div>
</template>

<script>
import Loader from "@/components/common/Loader"
export default {
    components: { Loader },
    name: 'Loading',
}
    
</script>

<style lang="less" scoped>
.loading {
    z-index: 9999;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.5);

    .loader {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%);
    }
}
</style>
