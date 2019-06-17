<template>
    <div class="user-cards-container">
        <user-card v-for="(choice, key) in actualChoices" :key="key" :class="getClass(key)" :id="'card-'+key" :text="choice.text" :color="'blue'"></user-card>
    </div>
</template>

<script>
    /* eslint-disable */

    import UserCard from "./UserCard";
    import store from '../../store';
    import Vuex from 'vuex';

    export default {
        name: "UserCardsContainer",
        props: {
            choices : {
                type: Array,
                default: null
            }
        },
        components: {UserCard},
        data() {
            return {
                index: 0
            }
        },
        computed: {
            ...Vuex.mapGetters(['actual', 'loading', 'actualChoices']),
            totalCards() {
                return this.actualChoices.length;
            },
            secondCard() {
                if(this.index + 1 >= this.totalCards) {
                    return 0;
                }else {
                    return this.index + 1
                }
            },
            thirdCard() {
                if(this.secondCard + 1 >= this.totalCards) {
                    return 0;
                }else {
                    return this.secondCard + 1
                }
            }
        },
        methods: {
            next() {
                if(this.index + 1 >= this.totalCards) {
                    this.index = 0;
                }else {
                    this.index++
                }
            },
            getClass(key) {
                switch (key) {
                    case this.index :
                        return 'active';
                    case this.secondCard :
                        return 'small';
                    case this.thirdCard :
                        return 'small--left';
                    default:
                        return 'hidden'
                }
            },
            select(){
                console.log('send');
                if(key === this.index) {
                    console.log('send');
                }
            },
            send(){
                const card = document.getElementById('card-'+this.index);
                const messagesContainer = document.querySelector('.messages-container__wrap');
                card.parentNode.removeChild(card);
                card.classList.add('fluid');
                messagesContainer.appendChild(card);


            }
        },
        mounted() {
            console.log('total', this.totalCards);
            console.log('index', this.index);
            console.log('second', this.secondCard);
            console.log('third', this.thirdCard);
        }
    }
</script>

<style lang="scss" scoped>
    .user-cards-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>