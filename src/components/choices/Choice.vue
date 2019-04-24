<template>
    <span class="choice" :style="style">{{ text }}</span>
</template>

<script>
    export default {
        name: "Choice",
        props: {
            text:String,
            color:String
        },
        computed: {
            style () {
                return 'background-color: ' + this.color;
            }
        },
    }
</script>

<style scoped>
    .choice{
        display: block;
        font-size: 14px;
        color: black;
        padding: 15px 0;
        border-top: 1px solid black;

    }
</style>