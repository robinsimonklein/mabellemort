<template>
    <div class="choices-container">
        <Choice  v-for="choice in this.actualChoices" :key="choice.index" :text="choice.text" :follow="choice.follow" color="#9278ED" />
        <h1 @click="SET_ACTUAL(1)">{{ actual }}</h1>
    </div>
</template>

<script>
    /* eslint-disable */

    import Choice from "./Choice";
    import store from '../../store';
    import json from './../../datas';
    import Vuex from 'vuex';

    export default {
        name: "ChoicesContainer",
        store: store,
        data() {
            return {
                // choices: json[this.actual].intents
            }
        },
        methods: {
            ...Vuex.mapMutations([
                'SET_ACTUAL'
            ])
        },
        computed: {
            ...Vuex.mapGetters(['actual', 'actualChoices']),
            /*
            choices() {
                const intents = json[store.state.actual];
                if(intents) {
                    return json[store.state.actual].intents;
                }else{
                    return [];
                }
            }
            */

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