<template>
    <div class="free-response">
        <form @submit.prevent="sendDialogflow" class="free-response__form" novalidate="true">
            <input type="text" :ref="'query'" class="free-response__input" name="query" v-model="query" id="query" placeholder="Message..." autocomplete="off"/>
            <input type="submit" class="free-response__submit" name="send" value="Envoyer"/>
        </form>
    </div>
</template>

<script>
    /* eslint-disable */

    import openSocket from 'socket.io-client';

    export default {
        name: "FreeResponse",
        props: {
            data: {
                default: {
                    type: String,
                    default: null
                }
            }
        },
        data() {
            return {
                query: null,
                socket: null,
            }
        },
        methods: {
            scrollMessagesDown(){
                document.querySelector('.messages-container').scroll({
                    left: 0,
                    top: document.querySelector('.messages-container').scrollHeight + 30,
                    behavior: 'smooth'}
                );
            },
            sendDialogflow(){
                //Envoi de la requête à dialogflow
                this.socket.emit('dialogflow request', this.query);

                const userQuery = this.query;

                this.socket.on('dialogflow response', (response) => {

                    this.$root.$emit('printUserMessage',
                        {
                            'component': 'UserCard',
                            'data': {
                                'text': userQuery,
                                'color': 'red',
                                'number': '1-2'
                            }
                        }
                    );
                    this.$root.$emit('printMessage',
                        {
                            'component': 'SimpleMessage',
                            'data': {
                                'text': [response],
                            },
                            'next': this.data.default
                        }
                    );
                    this.$root.$emit('goToNextNode', this.data.default);
                });

                // On efface le champ input
                this.query = ""
            }
        },
        mounted() {
            // Create socket connexion
            this.socket = openSocket('https://mabellemort-server.herokuapp.com:3000');

        }
    }
</script>

<style lang="scss" scoped>
    .free-response {
        position: fixed;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0 45px 45px 45px;
        box-sizing: border-box;
        width: 100vw;
        left: 0;
        bottom: 0;
        z-index: 900;
        font-family: 'Millimetre', Arial, sans-serif;

        &__form{
            display: flex;
            box-sizing: border-box;
            width: 100%;
            border-radius: 5px;
            background: #444;

        }

        &__input{
            display: inline-block;
            box-sizing: border-box;
            width: 100%;
            border: none;
            background: none;
            font-size: 1rem;
            font-family: 'Millimetre', Arial, sans-serif;
            padding: 15px 15px;
            color: white;
            outline: none;
        }

        &__submit{
            color: white;
            font-family: 'Millimetre', Arial, sans-serif;
            font-size: 0.8rem;
            margin-left: 5px;
            -webkit-appearance: none;
        }

    }
</style>