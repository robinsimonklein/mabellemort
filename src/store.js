import Vuex from 'vuex'
import Vue from "vue";

Vue.use(Vuex);

const state = {
    actual: 0
};

const mutations = {
    SET_ACTUAL: (state, id) => {
        state.actual = id
    }
};

const getters = {
    actual: state => state.actual
};

let store = new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: getters,
    actions: {

    },
    strict: true
});

global.store = store; // Accessible depuis la console navigateur

export default store;