import Vuex from 'vuex'
import messages_prez from './scenario/messages_prez';
import interactions from './scenario/interactions';
import events from './scenario/events';
import ends from './scenario/ends';
import Vue from "vue";

Vue.use(Vuex);

const state = {
    testMode: true,
    demoMode: true,
    view:null,
    scenario: Object.assign({}, messages_prez, interactions, events, ends),
    actual: 'm23',
    userInteraction: false,
    loading: false,
    bgColor: '#000',
    username: null
};

const mutations = {
    SET_VIEW: (state, value) => {
        state.view = value
    },
    SET_ACTUAL: (state, id) => {
        state.actual = id
    },
    SET_LOADING: (state, bool) => {
        state.loading = bool
    },
    SET_USERNAME: (state, username) => {
        state.username = username
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
    demoMode: state => state.demoMode,
    view: state => state.view,
    actual: state => state.actual,
    bgColor: state => state.bgColor,
    scenario: state => state.scenario,
    userInteraction: state => state.userInteraction,
    loading: state => state.loading,
    username: state => state.username,

    actualNode: state => {
        if(state.scenario[state.actual]) {
            return state.scenario[state.actual]
        }else{
            // TODO: Error, next node doesn't exists
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
            return state.scenario[state.actual].next
        }else{
            // TODO: Error, there is no continuation
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

global.store = store; // Accessible from navigator console

export default store;