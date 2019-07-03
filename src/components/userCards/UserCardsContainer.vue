<template>
    <div class="user-cards-container" :class="{'tidy' : tidy}">
        <user-card v-for="(choice, key) in data.choices" :key="key" v-on:swipedown="close" :class="getClass(key)" :id="'card-'+key" :data="{text: choice.text, next: choice.next, color: choice.color, number: (key + 1) + '-' + randomNumbers[key]}" :shifumi="shifumi" :fluid="false"></user-card>
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
            data: {
                choices : {
                    type: Array,
                    default: null
                }
            },
            shifumi: {
                type: Boolean,
                default: false
            }
        },
        components: {UserCard},
        data() {
            return {
                index: 0,
                tidy: true
            }
        },
        computed: {
            ...Vuex.mapGetters(['actual', 'loading']),
            randomNumbers(){
                return [
                    Math.round(Math.random() + 1),
                    Math.round(Math.random() + 1),
                    Math.round(Math.random() + 1)
                ]
            },
            totalCards() {
                return this.data.choices.length;
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
            },
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
            },
            close(){
                this.tidy=true;
            }
        },
        mounted() {

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
        z-index: 200;

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