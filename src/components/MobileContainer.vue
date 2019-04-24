<template>
    <div class="mobile-container">{{title}}</div>
</template>

<script>
    export default {
        name: "MobileContainer",
        props: {
            title: String
        }
    }
</script>

<style lang="scss" scoped>
    .mobile-container{
        height: 100%;
        width: 100%;
        background-color: white;

        @media screen and (min-width:540px) {
            height: 80%;
            width: 90%;
            max-width: 400px;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(200, 200, 200, 0.1);
        }
    }
</style>