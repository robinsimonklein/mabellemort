<template>
    <span @click="selectChoice" class="choice" :style="style">{{ text }}</span>
</template>

<script>

    import store from '../../store';

    export default {
        name: "Choice",
        props: {
            id: Number,
            text:String,
            color:String,
            follow: Number
        },
        methods: {
            selectChoice(){
                this.$root.$emit('selectChoice', this.text);

                store.actual = this.follow;

            }
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
        cursor: pointer;

    }
</style>