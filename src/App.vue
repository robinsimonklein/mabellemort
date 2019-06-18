<template>
  <div id="app">

      <div class="actualHint">Step : {{ actual }} <br><button @click="pingServer('commencer')">Ping Server</button></div>
      <div class="mobile-container">
          <div class="messages-container" id="messages-container">
              <div class="messages-container__wrap">
                  <transition-group name="messages-list">
                      <div v-for="(message, key) in messages" :key="key" >
                          <Message v-if="message.type === 'text'" :sender="message.sender" :content="message.content"/>
                          <Popup v-if="message.type === 'popup'" :sender="message.sender" :title="message.content.title" :text="message.content.text" :choices="actualChoices" :color="message.content.color"/>
                          <UserCard v-if="message.sender === 'user'" :sender="message.sender" :class="'fluid'" :text="message.text" :color="message.color"/>
                      </div>
                  </transition-group>
              </div>
          </div>

          <user-cards-container v-show="loading === false"></user-cards-container>
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
import UserCardsContainer from "./components/userCards/UserCardsContainer";
import UserCard from "./components/userCards/UserCard";
import Popup from "./components/messages/Popup";


export default {
    name: 'app',
    data() {
        return {
            socket: null,
            messages: [],

        }
    },
    methods: {
        ...Vuex.mapMutations(['SET_ACTUAL', 'SET_LOADING']),

        printUserMessage(el, text, color){
            // On masque la carte
            el.parentNode.removeChild(el);
            this.messages.push({'sender': 'user', 'text': text, 'color': color});
        },
        printDeathResponses(responses){
            responses.forEach((response, i) => {
                if(i>0){
                    setTimeout(() => {
                        this.messages.push({'type': response.type, 'sender': 'death', 'content': response.content, 'intents': response.intents });

                    }, 800 * i);
                }else {
                    this.messages.push({'type': response.type, 'sender': 'death', 'content': response.content, 'intents': response.intents});
                }
            });

        },
        pingServer(data) {
            this.socket.emit('dialogflow request', data)
        },

        scrollMessagesDown(){
            document.querySelector('.messages-container').scroll({
                left: 0,
                top: document.querySelector('.messages-container').scrollHeight + 30,
                behavior: 'smooth'}
            );
        }

    },
    computed: {
        ...Vuex.mapGetters(['actual','loading', 'actualResponses', 'actualChoices'])
    },
    mounted(){

        this.socket = openSocket('http://localhost:3000');

        this.$root.$on('selectChoice', (el, text, color, nextId) => {

            this.printUserMessage(el, text, color);

            setTimeout(() => {
                this.SET_LOADING(true);
            }, 1500);
            setTimeout(() => {

                this.SET_ACTUAL(nextId.default);

                console.log(this.actualResponses);
                this.printDeathResponses(this.actualResponses);

                this.SET_LOADING(false);
            }, Math.random() * 3000 + 2000)

        });

        this.$root.$on('sendDialogflowMessage', (message) => {
            this.printUserMessage(message);
            this.socket.emit('dialogflow request', message);
        });

        this.printDeathResponses(this.actualResponses);
        console.log(this.actualResponses)

        this.socket.on('dialogflow response', (message) => {
            this.SET_LOADING(false);
            this.printDeathResponses([message])
        })



    },
    components: {
        Popup,
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
      padding: 15px 15px 15vh 15px;
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