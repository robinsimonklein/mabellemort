<template>
    <div class="choices-container">
        <!--Choice  v-for=" choice in this.choices" :key="choice.follow" :text="choice.text" :follow="choice.follow" color="#9278ED" /-->
        <h1 @click="setActual">{{ actual }}</h1>
    </div>
</template>

<script>
    /* eslint-disable */

    import Choice from "./Choice";
    import store from '../../store';
    import Vuex from 'vuex';

    global.v = Vuex

    export default {
        name: "ChoicesContainer",
        store: store,
        data() {
            return {
                // choices: json[this.actual].intents
            }
        },
        methods: {
            setActual: () => {
                store.commit('SET_ACTUAL', 1);
            }
        },
        computed: {
            ...Vuex.mapGetters(['actual'])

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