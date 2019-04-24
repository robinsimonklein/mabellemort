<template>
    <span class="choice">{{ text }}</span>
</template>

<script>
    export default {
        name: "Choice",
        props: {
            text:String
        }
    }
</script>

<style scoped>
    .choice{
        display: inline-block;
        background-color: #444;
        padding: 10px 15px;

    }
</style>