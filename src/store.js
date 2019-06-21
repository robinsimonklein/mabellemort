import Vuex from 'vuex'
import json from './datas';
import Vue from "vue";

Vue.use(Vuex);

const state = {
    actual: 1,
    userEvent: false,
    loading: false
};

const mutations = {
    SET_ACTUAL: (state, id) => {
        state.actual = id
    },
    SET_LOADING: (state, bool) => {
        state.loading = bool
    },
    SET_USER_EVENT: (state, bool) => {
        state.userEvent = bool
    }
};

const getters = {
    actual: state => state.actual,
    userEvent: state => state.userEvent,
    loading: state => state.loading,
    actualNode: state => {
        if(json[state.actual]) {
            return json[state.actual]
        }else{
            // TODO: Erreur, le noeud n'existe pas
            return null
        }
    },
    nextNode: state => {
        return 10
        if(json[state.actual].next){
            return json[state.actual].next
        }else{
            // TODO: Erreur, il n'y a pas de suite
            return 100
        }
    }
};

const actions = {

};

let store = new Vuex.Store({
    state: state,
    mutations: mutations,
    getters: getters,
    actions: actions,
    strict: true
});

global.store = store; // Accessible depuis la console navigateur

export default store;