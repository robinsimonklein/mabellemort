<template>
  <div id="app">

      <div class="actualHint">Step : {{ actual }} <br><button @click="pingServer('commencer')">Ping Server</button></div>
      <div class="mobile-container">
          <div class="messages-container">
              <div class="messages-container__wrap">
                  <transition-group name="messages-list">
                      <Message v-for="(message, key) in messages" :key="key" :sender="message.sender" :content="message.content"/>
                  </transition-group>
              </div>
          </div>

          <user-cards-container :choices="userChoices"></user-cards-container>
          <!--<choices-container></choices-container>-->
      </div>
  </div>
</template>

<script>
    /* eslint-disable */

import Message from "./components/messages/Message";
import ChoicesContainer from "./components/choices/ChoicesContainer";
import Vuex from 'vuex';
import openSocket from 'socket.io-client';
import UserCardsContainer from "./components/userCards/userCardsContainer";
import UserCard from "./components/userCards/userCard";


export default {
    name: 'app',
    data() {
        return {
            socket: null,
            messages: [],
            userChoices: [
                {
                    text: '1. fdf sgr sffdgndfsl fdsjfdjfds bfhdf',
                    color: 'darkred'
                },
                {
                    text: '2. fdf sgr sffdgndfsl fdsjfdjfds bfhdf',
                    color: 'darkblue'
                },
                {
                    text: '3. fdf sgr sffdgndfsl fdsjfdjfds bfhdf',
                    color: 'darkgreen'
                },
                {
                    text: '4. fdf sgr sffdgndfsl fdsjfdjfds bfhdf',
                    color: 'grey'
                },
                {
                    text: '5. fdf sgr sffdgndfsl fdsjfdjfds bfhdf',
                    color: 'violet'
                }
            ]
        }
    },
    methods: {
        ...Vuex.mapMutations(['SET_ACTUAL', 'SET_LOADING']),

        printUserMessage(content){
            this.messages.push({'sender': 'user', 'content': content});
        },
        printDeathResponses(responses){
            responses.forEach((response, i) => {
                if(i>0){
                    setTimeout(() => {
                        this.messages.push({'sender': 'bot', 'content': response});
                    }, 800 * i);
                }else {
                    this.messages.push({'sender': 'bot', 'content': response});
                }
            });

        },
        pingServer(data) {
            this.socket.emit('dialogflow request', data)
        }

    },
    computed: {
        ...Vuex.mapGetters(['actual','loading', 'actualResponses'])
    },
    mounted(){

        this.socket = openSocket('http://localhost:3000');

        this.$root.$on('selectChoice', (choice, nextId) => {

            this.printUserMessage(choice);

            setTimeout(() => {
                this.SET_LOADING(true);
            }, 1500);
            setTimeout(() => {

                this.SET_ACTUAL(nextId);

                this.printDeathResponses(this.actualResponses);

                this.SET_LOADING(false);
            }, Math.random() * 3000 + 2000)

        });

        this.$root.$on('sendDialogflowMessage', (message) => {
            this.printUserMessage(message);
            this.socket.emit('dialogflow request', message);
        });

        this.printDeathResponses(this.actualResponses);

        this.socket.on('dialogflow response', (message) => {
            this.SET_LOADING(false);
            this.printDeathResponses([message])
        })



    },
    components: {
        UserCard,
        UserCardsContainer,
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
      background-color: black;

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
      -webkit-overflow-scrolling: touch;
  }

  .messages-list-enter-active, .messages-list-leave-active {
      transition: opacity .5s ease-out;
  }
  .messages-list-enter, .messages-list-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
  }
    .actualHint{
        position: fixed;
        top: 10px;
        right: 10px;
        color: white;
        font-size: 12px;
        font-weight: bold;
    }

</style>