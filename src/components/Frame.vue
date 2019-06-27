<template>
    <div class="frame"></div>
</template>

<script>
    export default {
        name: "Frame"
    }
</script>

<style lang="scss" scoped>
    .frame {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        z-index: 100;
        box-sizing: border-box;
    }
</style>