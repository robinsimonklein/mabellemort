<template>
  <div id="app">
      <div class="mobile-container">
          <div class="messages-container" id="messages-container" :style="'background-color:' + bgColor">
              <div class="messages-container__wrap">
                  <component v-for="(message, key) in messages" :key="key" :is="message.component" :data="message.data" :fluid="true"></component>
                  <LoadingMessage v-if="loading" :text="'Ma Belle Mort est en train d\'écrire'">Ma Belle Mort est en train d'écrire...</LoadingMessage>
              </div>
          </div>
          <Frame></Frame>
          <component v-if="userInteraction" :is="actualNode.component" :data="actualNode.data"></component>
          <component v-if="view" :is="view"></component>
      </div>
  </div>
</template>

<script>
    /* eslint-disable */

    import Vuex from 'vuex';
    import Frame from "./components/Frame";

    // Import views
    import Intro from './views/Intro';
    import Outro from './views/Outro';

    //Import message components
    import Message from "./components/messages/Message";
    import LoadingMessage from "./components/messages/LoadingMessage";
    import SimpleMessage from "./components/messages/SimpleMessage";
    import BubbleMessage from "./components/messages/BubbleMessage";
    import ImageMessage from "./components/messages/ImageMessage";
    import FloatingMessage from "./components/messages/FloatingMessage";

    //Import events components
    import ConversationEvent from "./components/messages/ConversationEvent";

    //Import interactions components
    import UserCardsContainer from "./components/userCards/UserCardsContainer";
    import UserCard from "./components/userCards/UserCard";
    import Popup from "./components/interactions/Popup";
    import ColorPalette from "./components/interactions/ColorPalette";
    import CanvasDraw from "./components/interactions/CanvasDraw";
    import Shifumi from "./components/interactions/Shifumi";
    import BlueScreen from "./components/interactions/BlueScreen";
    import FreeResponse from "./components/interactions/FreeResponse";
    import End from "./components/interactions/End";


export default {
    name: 'app',
    data() {
        return {
            messages: [],
        }
    },
    methods: {
        ...Vuex.mapMutations(['SET_ACTUAL', 'SET_DONE', 'SET_LOADING', 'ACTIVATE_USER_INTERACTION', 'DISABLE_USER_INTERACTION']),

        printUserMessage(message){
            // Masquer l'interaction de l'utilisateur
            this.DISABLE_USER_INTERACTION();

            this.messages.push({
                'component': message.component,
                'data': message.data,
            });
        },
        printMessage(message, waiting){

            setTimeout(() => {
                // Afficher "... est en train d'écrire"
                if(waiting) {
                    this.SET_LOADING(true);
                }
                setTimeout(()=>{
                    // Afficher le message
                    this.messages.push({
                        'component': message.component,
                        'data': message.data,
                    });
                    this.SET_LOADING(false);
                }, !this.testMode ? Math.random() * 3000 + 1500 : 400);
            }, !this.testMode && waiting ? Math.random() * 500 + 500 : 300);
        },
        displayNode(node){


            // Masquer l'interaction de l'utilisateur
            this.DISABLE_USER_INTERACTION();

            this.SET_DONE(this.actual);

            switch (node.type) {
                case 'message':
                    this.printMessage(node, true);
                    break;
                case 'interaction':
                    setTimeout(() => {
                        this.ACTIVATE_USER_INTERACTION();
                    }, node.delay && !this.testMode ? node.delay : 0);
                    break;
                case 'event':
                    if(this.actualNode.component === 'ConversationEvent'){
                        this.printMessage(this.actualNode, false);
                    }else{
                        setTimeout(() => {
                            this.ACTIVATE_USER_INTERACTION();
                        }, node.delay && !this.testMode ? node.delay : 0);
                    }
                    break;
                default:
                    console.error('%cUne erreur s\'est produite : le noeud demandé n\'existe pas.', 'font-weight: bold');
                    break;
            }
        },
        goToNextNode(id){
            this.SET_ACTUAL(id);
            if(this.actualNode) {
                this.displayNode(this.actualNode);
            }else{
                // TODO: Error, next node doesn't exists
            }
        },
        scrollMessagesDown(){
            document.querySelector('.messages-container').scroll({
                left: 0,
                top: document.querySelector('.messages-container').scrollHeight + 30,
                behavior: 'smooth'}
            );
        },
        resizeApp(){
            document.body.style.height = window.innerHeight+"px";
        },
        reset(){
            this.SET_ACTUAL("m0");
            this.messages = []
        }

    },
    computed: {
        ...Vuex.mapGetters(['testMode', 'view', 'actual', 'scenario', 'bgColor', 'userInteraction', 'loading', 'actualNode', 'state'])
    },
    mounted(){


        // Prepare all $root events listeners
        this.$root.$on('printUserMessage', (message) => {
            this.printUserMessage(message);
        });
        this.$root.$on('printMessage', (message) => {
            this.printMessage(message);
        });
        this.$root.$on('goToNextNode', (nextId) => {
            this.goToNextNode(nextId);
        });
        this.$root.$on('reset', () => {
            this.reset();
        });

        // Fix mobile navbar viewport
        this.resizeApp();
        window.onresize = this.resizeApp;

        // Display first node at launching
        /*
        if(this.testMode) {
            this.displayNode(this.actualNode);
        }

         */

    },
    components: {
        Intro,
        Outro,
        Frame,
        LoadingMessage,
        SimpleMessage,
        BubbleMessage,
        ImageMessage,
        FloatingMessage,
        Message,
        CanvasDraw,
        ColorPalette,
        Shifumi,
        Popup,
        UserCard,
        UserCardsContainer,
        End,
        BlueScreen,
        FreeResponse,
        ConversationEvent,
    }
}
</script>

<style lang="scss">

  #app {
      display: flex;
      height: 100%;
      width: 100vw;

      align-items: center;
      justify-content: center;

      font-family: 'Helvetica', Helvetica, Arial, sans-serif;
      font-weight: bold;
      font-size: 0.8rem;
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
      padding: 45px 45px 15vh 45px;
      overflow: auto;
      -webkit-overflow-scrolling: touch;

      &__wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
      }
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