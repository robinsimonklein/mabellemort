<template>
  <div id="app">
      <div @click="SET_ACTUAL(1)" class="actualHint">{{ actual }}</div>
      <div class="mobile-container">
          <div class="messages-container">
              <div class="messages-container__wrap">
                  <transition-group name="messages-list">
                      <Message v-for="(message, index) in messages" v-bind:key="index" :sender="message.sender" :content="message.content"/>
                  </transition-group>
              </div>
          </div>
          <ChoicesContainer/>
      </div>
  </div>
</template>

<script>
    /* eslint-disable */

import Message from "./components/messages/Message";
import ChoicesContainer from "./components/choices/ChoicesContainer";
import Vuex from 'vuex';

export default {
    name: 'app',
    data() {
        return {
            messages: []
        }
    },
    methods: {
        ...Vuex.mapMutations(['SET_ACTUAL', 'SET_LOADING']),

        printUserMessage(content){
            this.messages.push({'sender': 'user', 'content': content});
        },
        printDeathResponses(responses){
            responses.forEach((response) => {
                this.messages.push({'sender': 'bot', 'content': response});
            });

        }

    },
    computed: {
        ...Vuex.mapGetters(['actual', 'actualResponses'])
    },
    mounted(){
        this.$root.$on('selectChoice', (choice, nextId) => {

            this.printUserMessage(choice);

            setTimeout(() => {
                this.SET_LOADING(true);
                setTimeout(() => {

                    this.SET_ACTUAL(nextId);

                    this.printDeathResponses(this.actualResponses);

                    this.SET_LOADING(false);
                }, 1500)
            }, 500);


        });

        this.printDeathResponses(this.actualResponses);

    },
    components: {
        ChoicesContainer,
        Message
    }
}
</script>

<style lang="scss">

  #app {
      display: flex;
      height: 100%;
      width: 100%;

      align-items: center;
      justify-content: center;

      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #dddddd;
      background-color: #FAFAFA;
  }


  .mobile-container{
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;

      @media screen and (min-width:540px) {
          height: 80%;
          width: 90%;
          max-width: 400px;
          overflow: hidden;
          box-shadow: 0 0 20px rgba(200, 200, 200, 0.1);
      }
  }

  .messages-container {
      flex:1;
      background-color: black;
      padding: 15px;
      overflow: auto;
  }

  .messages-list-enter-active, .messages-list-leave-active {
      transition: opacity .5s ease-out;
  }
  .messages-list-enter, .messages-list-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
  }

</style>