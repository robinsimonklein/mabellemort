import Vuex from 'vuex'
import json from './datas';
import Vue from "vue";

Vue.use(Vuex);

const state = {
    actual: 0,
    loading: false
};

const mutations = {
    SET_ACTUAL: (state, id) => {
        state.actual = id
    },
    SET_LOADING: (state, bool) => {
        state.loading = bool
    }
};

const getters = {
    actual: state => state.actual,
    loading: state => state.loading,
    actualResponses: state => {
        if(json[state.actual]) {
            const responses = []
            json[state.actual].responses.forEach((response) => {
                if(response.type === 'text'){
                    responses.push(response.texts[Math.floor(Math.random() * response.texts.length)])
                }
            });
            return responses;
        }else{
            return []
        }
    },
    actualChoices: state => {
        if(json[state.actual]) {
            if(json[state.actual].intents){
                return json[state.actual].intents
            }else{
                return json[state.actual].event.type
            }

        }else{
            return []
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