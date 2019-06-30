<template>
    <div class="popup" :class="{'fluid' : fluid}">
        <div class="popup__wrap" :style="'border-color: ' + data.color">
            <span class="popup__title">{{ data.title }}</span>
            <p class="popup__text">{{ data.text }}</p>
            <div class="popup__actions">
                <button @click="selectChoice(data.choices[0].next, 0)" class="popup__button popup__button--1" :class="{'popup__button--disabled' : data.selected === 1}" :style="'background-color:' + data.color">{{ data.choices[0].text }}</button>
                <button @click="selectChoice(data.choices[1].next, 1)" class="popup__button popup__button--2" :class="{'popup__button--disabled' : data.selected === 0}" :style="'color:' + data.color + '; border-color:' + data.color">{{ data.choices[1].text }}</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Popup",
        props: {
            data: {
                title: {
                    type: String,
                    default: 'Ma Belle Mort'
                },
                text: {
                    type: String,
                    default: ''
                },
                choices: {
                    type: Array,
                    default: null
                },
                color: {
                    type: String,
                    default: 'grey'
                },
                selected: {
                    type: Number,
                    default: null
                }
            },
            fluid: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            selectChoice(nextId, selected){
                if(this.fluid){
                    return;
                }
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
                this.$root.$emit('goToNextNode', nextId);
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
            if(this.fluid){
                this.scrollMessagesDown();
            }
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
            width: 100%;
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

            .fluid &{
                width: 100%;
            }
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