<template>
    <div class="choices-container">
        <div class="loader"> {{ loading ? 'Ma Belle Mort est en train d\'écrire...' : ''}}</div>
        <div v-if="this.actualChoices != 'DIALOGFLOW'">
            <Choice v-for="(choice, key) in this.actualChoices" :key="key" :text="choice.text" :follow="choice.follow" color="#9278ED" />
        </div>
        <form @submit="sendDialogflowMessage" v-if="this.actualChoices === 'DIALOGFLOW'" class="user-input__wrap"><input v-model="dfmessage" type="text" placeholder="Votre message..." class="user-input"><button type="submit" class="user-input__btn">Envoyer</button></form>
    </div>
</template>

<script>
    /* eslint-disable */

    import Choice from "./Choice";
    import store from '../../store';
    import Vuex from 'vuex';

    export default {
        name: "ChoicesContainer",
        store: store,
        data() {
            return {
                dfmessage: null,
            }
        },
        methods: {
            ...Vuex.mapMutations([
                'SET_ACTUAL', 'SET_LOADING'
            ]),
            sendDialogflowMessage(e){
                e.preventDefault();
                this.$root.$emit('sendDialogflowMessage', this.dfmessage);
                this.SET_LOADING(true);
                this.dfmessage = '';
            }
        },
        computed: {
            ...Vuex.mapGetters(['actual', 'loading', 'actualChoices']),

        },
        mounted(){

        },
        components: {Choice}
    }
</script>

<style lang="scss" scoped>
    .choices-container{
        width: 100%;
        background-color: #000;
    }
    .loader{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        padding: 5px;
    }
    .user-input {
        display: inline-block;
        width: 100%;
        padding: 10px 8px;
        font-size: 15px;
        background-color: #333;
        outline: none;
        box-shadow: none;
        color: white;
        border: none;
        box-sizing: border-box;

        &__wrap{
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 8px;
            box-sizing: border-box;
        }

        &::placeholder{
            color: white;
            opacity: 0.5;
        }

        &__btn{
            color: white;
            font-size: 15px;
            font-weight: bold;
            margin-left: 5px;
            background: none;
            border: none;
        }
    }
</style>