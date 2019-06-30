<template>
    <div class="shifumi">
        <user-cards-container :data="userCards" :shifumi="true"/>
    </div>
</template>

<script>
    /* eslint-disable */

    import UserCardsContainer from "../userCards/UserCardsContainer";
    export default {
        name: "Shifumi",
        components: {UserCardsContainer},
        props: {
            data: {
                win: {
                    type: String,
                    default: ""
                },
                loose: {
                    type: String,
                    default: ""
                },
                equal: {
                    type: String,
                    default: ""
                }
            },
        },
        data(){
            return {
                userCards: {
                    choices: [
                        {
                            "text": "Pierre",
                            "next": ""
                        },
                        {
                            "text": "Feuille",
                            "next": ""
                        },
                        {
                            "text": "Ciseaux️",
                            "next": ""
                        }
                    ]
                },
                deathChoice: {
                    text: null,
                    number: null,
                }
            }
        },
        methods: {
            selectChoice(nextId, selected){

                /*
                this.$root.$emit('printUserMessage', {
                    'component':'Popup',
                    'data': {
                        'title': this.data.title,
                        'text': this.data.text,
                        'choices': this.data.choices,
                        'color': this.data.color,
                        'selected': selected
                    }
                });

                 */
            },
            scrollMessagesDown(){
                document.querySelector('.messages-container').scroll({
                    left: 0,
                    top: document.querySelector('.messages-container').scrollHeight + 30,
                    behavior: 'smooth'}
                );
            }
        },
        mounted() {
            this.deathChoice.number = Math.round(Math.random() * 2 + 1);
            this.deathChoice.text = this.userCards.choices[this.deathChoice.number].text;


            this.$root.$on('shifumiChoice', (choice) => {

                    if(choice.number[0] === 'Ciseaux'){
                        switch (this.deathChoice.text) {
                            case 'Ciseaux' :
                                this.$root.$emit('goToNextNode', this.data.equal);
                                break;
                            case 'Pierre' :
                                this.$root.$emit('goToNextNode', this.data.loose);
                                break;
                            case 'Feuille' :
                                this.$root.$emit('goToNextNode', this.data.win);
                                break;
                        }
                    }else if(choice.text === 'Pierre') {
                        switch (this.deathChoice.text) {
                            case 'Ciseaux' :
                                this.$root.$emit('goToNextNode', this.data.win);
                                break;
                            case 'Pierre' :
                                this.$root.$emit('goToNextNode', this.data.equal);
                                break;
                            case 'Feuille' :
                                this.$root.$emit('goToNextNode', this.data.loose);
                                break;
                        }
                    }else if(choice.text === 'Feuille'){
                        switch(this.deathChoice.text) {
                            case 'Ciseaux' :
                                this.$root.$emit('goToNextNode', this.data.loose);
                                break;
                            case 'Pierre' :
                                this.$root.$emit('goToNextNode', this.data.win);
                                break;
                            case 'Feuille' :
                                this.$root.$emit('goToNextNode', this.data.equal);
                                break;
                        }
                }
            });
        }
    }
</script>

<style lang="scss" scoped>
    .popup {
        position: fixed;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw;
        top: 0;
        left: 0;
        background-color: rgba(black, 0.7);
        z-index: 900;
        font-family: 'Millimetre', Arial, sans-serif;

        &.fluid {
            position: relative;
            height: auto;
            width: auto;
            top: inherit;
            left: inherit;
            margin: 1rem 0;
            z-index: 1;
            background: none;
        }

        &__wrap {
            background-color: white;
            border-style: solid;
            border-width: 2px;
            width: 85%;
            border-radius: 20px;
            padding: 20px;
            box-sizing: border-box;
        }

        &__title {
            color: black;
            text-transform: uppercase;
            font-weight: bold;
            font-size: 1.2rem;
            font-family: 'Millimetre', Arial, sans-serif;
        }

        &__text {
            font-size: 15px;
            color: black;
            font-family: 'Millimetre', Arial, sans-serif;
        }

        &__actions {

        }

        &__button {
            font-size: 0.8rem;
            border-radius: 0;
            border-style: solid;
            border-width: 2px;
            text-transform: uppercase;
            padding: 8px 30px;
            margin: 0 10px;
            font-weight: bold;
            font-family: 'Millimetre', Arial, sans-serif;
            outline: 0!important;

            color: black;
            border-color: black;
            background-color: black;

            &--disabled {
                opacity: 0.2;
            }
        }
    }
</style>