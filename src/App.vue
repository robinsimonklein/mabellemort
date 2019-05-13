<template>
  <div id="app">
      <div class="mobile-container">
      <div class="messages-container">
          <!-- <Message v-for="message in messages" :key="message.index" :sender="message.sender" :content="message.content"/> -->
      </div>
      <ChoicesContainer/>
      </div>
  </div>
</template>

<script>
    /* eslint-disable */

import Message from "./components/messages/Message";
import ChoicesContainer from "./components/choices/ChoicesContainer";

export default {
    name: 'app',
    data() {
        return {
        }
    },
    methods: {
        printMessage(sender, content){
            this.messages.push({'sender': sender, 'content': content});
            this.setNextResponse();
        },
        setNextResponse(){

        }
    },
    computed: {

    },
    mounted(){

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

</style>