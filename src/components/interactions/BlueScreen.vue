<template>
    <div class="blue-screen">
        <span class="blue-screen__text" v-html="data.text"></span>
        <button @click="goToNext" class="blue-screen__btn" >{{ data.btnLabel }}</button>
    </div>
</template>

<script>
    /* eslint-disable */
    import Vuex from 'vuex';

    export default {
        name: "EndMessage",
        props: {
            data: {
                text: {
                    type: String,
                    default: null
                },

            }
        },
        computed: {
            ...Vuex.mapGetters(['nextNode']),

        },
        methods: {
            ...Vuex.mapMutations(['ACTIVATE_USER_INTERACTION']),

            scrollMessagesDown(){
                document.querySelector('.messages-container').scroll({
                    left: 0,
                    top: document.querySelector('.messages-container').scrollHeight + 30,
                    behavior: 'smooth'}
                );
            },

            goToNext(){
                this.$root.$emit('goToNextNode', this.nextNode);
            }
        },
        mounted() {
            // this.scrollMessagesDown();
            this.ACTIVATE_USER_INTERACTION();
        }
    }
</script>

<style lang="scss" scoped>
    .blue-screen {
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: center;

        left: 0;
        bottom: 0;
        width: 100vw;
        height: 100vh;
        padding: 45px;
        text-align: left;
        box-sizing: border-box;
        z-index: 10;
        background-color: blue;
        font-family: 'Millimetre', Arial, sans-serif;

        &__text{
            margin-bottom: 2rem;
            font-size: 2rem;
        }

        &__btn{
            display: block;
            background-color: red;
            padding: 1rem;
            text-align: center;
            color: white;
            font-weight: bold;
            text-decoration: none;
            font-size: 1rem;
            font-family: 'Millimetre', Arial, sans-serif;

        }
    }
</style>