<template>
  <div id="app">
      <div class="mobile-container">
          <div class="messages-container" id="messages-container">
              <div class="messages-container__wrap">
                  <component v-for="(message, key) in messages" :key="key" :is="message.component" :data="message.data"></component>
                  <div v-if="loading" class="loader">Ma Belle Mort est en train d'écrire...</div>
                  <!--
                      <Message v-if="message.type === 'text'" :sender="message.sender" :content="message.content"/>
                      <Popup v-if="message.type === 'popup'" :sender="message.sender" :title="message.content.title" :text="message.content.text" :choices="actualChoices" :color="message.content.color"/>
                      <UserCard v-if="message.type === 'card'" :sender="message.sender" :class="'fluid'" :text="message.text" :color="message.color"/>
                      <ColorPalette :colors="['red', 'blue', 'green', 'white', 'violet']"/>
                   -->

              </div>
          </div>

          <component v-if="userEvent" :is="'user-cards-container'" :data="''"></component>
      </div>
  </div>
</template>

<script>
    /* eslint-disable */

import Message from "./components/messages/Message";
import SimpleMessage from "./components/messages/SimpleMessage";
import Vuex from 'vuex';
import UserCardsContainer from "./components/userCards/UserCardsContainer";
import UserCard from "./components/userCards/UserCard";
import Popup from "./components/interactions/Popup";
import ColorPalette from "./components/interactions/ColorPalette";
import CanvasDraw from "./components/interactions/CanvasDraw";


export default {
    name: 'app',
    data() {
        return {
            messages: [],

        }
    },
    methods: {
        ...Vuex.mapMutations(['SET_ACTUAL', 'SET_LOADING', 'SET_USER_EVENT']),

        printUserMessage(type, data, color){
            // On masque la carte
            this.messages.push({'type': type, 'data': data, 'color': color});
        },
        printResponse(response){
            // Masquer l'interaction de l'utilisateur
            this.SET_USER_EVENT(false);

            this.SET_LOADING(true);
            setTimeout(()=>{
                this.messages.push({
                    'component': response.component,
                    'data': response.data,
                });
                this.SET_LOADING(false);
            }, Math.random() * 2000 + 1000);
        },
        goToNextNode(id){
            this.SET_ACTUAL(id);
            console.log('actual', id)
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
        ...Vuex.mapGetters(['actual', 'userEvent', 'loading', 'actualNode', 'state'])
    },
    mounted(){

        this.$root.$on('selectChoice', (el, type, data, nextId) => {

            this.printUserMessage(el, data.text, data.color);

            this.SET_ACTUAL(nextId.default);

            // this.printDeathResponses(this.actualResponses);

        });
        this.$root.$on('goToNextNode', (nextId) => {
            this.goToNextNode(nextId);
        });
        console.log(this.actualNode)

        this.printResponse(this.actualNode);

    },
    components: {
        SimpleMessage,
        CanvasDraw,
        ColorPalette,
        Popup,
        UserCard,
        UserCardsContainer,
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