<template>
    <div class="choices-container">
        <div class="loader"> {{ loading ? 'La mort est en train d\'écrire...' : ''}}</div>
        <Choice @ ="test" v-for="choice in this.actualChoices" :key="choice.index" :text="choice.text" :follow="choice.follow" color="#9278ED" />
    </div>
</template>

<script>
    /* eslint-disable */

    import Choice from "./Choice";
    import store from '../../store';
    import Vuex from 'vuex';

    export default {
        name: "ChoicesContainer",
        store: store,
        data() {
            return {

            }
        },
        methods: {
            ...Vuex.mapMutations([
                'SET_ACTUAL'
            ]),
            test(){
                console.log('change')
            }
        },
        computed: {
            ...Vuex.mapGetters(['actual', 'loading', 'actualChoices']),

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
    .loader{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        padding: 5px;
    }
</style>