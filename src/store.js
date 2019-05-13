import Vuex from 'vuex'
import Vue from "vue";

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        actual: 0,
    },
    mutations: {
        setActual (id) {
            this.state.actual = id
        }
    },
    getters: {

    },
    actions: {

    }
});