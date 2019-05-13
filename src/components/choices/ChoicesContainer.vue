<template>
    <div class="choices-container">
        <Choice  v-for=" choice in this.choices" :key="choice.follow" :text="choice.text" :follow="choice.follow" color="#9278ED" />
    </div>
</template>

<script>
    /* eslint-disable */

    import Choice from "./Choice";
    import store from '../../store';
    import json from '../../datas';

    export default {
        name: "ChoicesContainer",
        store: store,
        data() {
            return {
                choices: json[0].intents
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