import Vuex from 'vuex'
import json from './datas';
import Vue from "vue";

Vue.use(Vuex);

const state = {
    testMode: false,
    scenario: json,
    actual: 'm0',
    userInteraction: false,
    loading: false,
    bgColor: '#000'
};

const mutations = {
    SET_ACTUAL: (state, id) => {
        state.actual = id
    },
    SET_LOADING: (state, bool) => {
        state.loading = bool
    },
    SET_DONE: (state, id) => {
        if(state.scenario[id]){
            if(state.scenario[id].done != null){
                state.scenario[id].done = true
            }
        }
    },
    ACTIVATE_USER_INTERACTION: (state) => {
        state.userInteraction = true
    },
    DISABLE_USER_INTERACTION: (state) => {
        state.userInteraction = false
    },
    SET_BG_COLOR: (state, color) => {
        state.bgColor = color
    }
};

const getters = {
    testMode: state => state.testMode,
    actual: state => state.actual,
    bgColor: state => state.bgColor,
    scenario: state => state.scenario,
    userInteraction: state => state.userInteraction,
    loading: state => state.loading,

    actualNode: state => {
        if(state.scenario[state.actual]) {
            return json[state.actual]
        }else{
            // TODO: Erreur, le noeud n'existe pas
            return null
        }
    },
    nextNode: state => {
        if(state.scenario[state.actual].next){
            if(state.scenario[state.actual].next.priority){
                const priorityId = state.scenario[state.actual].next.priority;
                const defaultId = state.scenario[state.actual].next.default;
                if(state.scenario[priorityId].done === false){
                    return priorityId
                }else{
                    return defaultId
                }
            }
            return json[state.actual].next
        }else{
            // TODO: Erreur, il n'y a pas de suite
            return null
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