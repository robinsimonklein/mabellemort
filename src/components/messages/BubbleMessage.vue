<template>
    <div class="bubble-message" :style="'background-color:'" v-html="randomText">
    </div>
</template>

<script>
    /* eslint-disable */
    import Vuex from 'vuex';

    export default {
        name: "BubbleMessage",
        props: {
            data: {
                text: {
                    type: Array,
                    default: null
                },
            }
        },
        computed: {
            ...Vuex.mapGetters(['nextNode']),

            randomText() {
                return this.data.text[Math.round(Math.random() * (this.data.text.length - 1))]
            }
        },
        methods: {
            scrollMessagesDown(){
                document.querySelector('.messages-container').scroll({
                    left: 0,
                    top: document.querySelector('.messages-container').scrollHeight + 30,
                    behavior: 'smooth'}
                );
            }
        },
        mounted() {
            this.scrollMessagesDown();

            if(this.nextNode){
                this.$root.$emit('goToNextNode', this.nextNode);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bubble-message {
        padding: 20px;
        text-align: left;
        margin: 1rem 0;
        background-color: skyblue;
        color:white;
        font-size: 0.6rem;
    }
</style>