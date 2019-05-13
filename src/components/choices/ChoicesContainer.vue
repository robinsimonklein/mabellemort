<template>
    <div class="choices-container">
        <Choice  v-for=" choice in this.choices" :key="choice.follow" :text="choice.text" :follow="choice.follow" color="#9278ED" />
        <h1>{{actual}}</h1>
    </div>
</template>

<script>
    /* eslint-disable */

    import Choice from "./Choice";
    import store from '../../store.js';

    export default {
        name: "ChoicesContainer",
        props: {
            actual: Number
        },
        data() {
            return {
                choices: store.tree[store.actual].intents
            }
        },
        methods: {

        },
        mounted(){

        },
        components: {Choice}
    }
</script>

<style lang="scss" scoped>
    .choices-container{
        width: 100%;
        background-color: #222;
    }
</style>