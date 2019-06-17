<template>
    <div class="user-cards-container" :class="{'tidy' : tidy}">
        <user-card v-for="(choice, key) in actualChoices" :key="key" :class="getClass(key)" :id="'card-'+key" :text="choice.text" :follow="choice.follow" :color="'blue'"></user-card>
        <div class="user-cards__control" @click="next"></div>
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
                index: 2,
                tidy: true
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
                if(this.tidy){
                    this.tidy = false;
                    return;
                }
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

        .user-cards__control {
            position: absolute;
            display: block;
            width: 30vw;
            height: 12vh;
            left: 50vw;
            bottom: 0;
            margin-left: -15vw;
            z-index: 10;
        }
    }

</style>