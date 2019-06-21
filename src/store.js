import Vuex from 'vuex'
import json from './datas';
import Vue from "vue";

Vue.use(Vuex);

const state = {
    actual: 0,
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
    actualResponses: state => {
        if(json[state.actual]) {
            let responses = [];
            json[state.actual].responses.forEach((response) => {
                responses.push(
                    {
                        'type': response.type,
                        'data':
                            {
                            'sender': 'death',
                            'text': response.content[Math.floor(Math.random() * response.content.length)]
                            }
                    }
                );
            });
            return responses;
        }else{
            return []
        }
    },
    actualChoices: state => {
        if(json[state.actual]) {
            if(json[state.actual].intents.type === "choices"){
                return json[state.actual].intents.choices
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