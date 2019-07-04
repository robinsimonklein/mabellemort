<template>
    <component :is="randomBubble" :text="randomText.replace('{{prenom}}', this.username)" ></component>
</template>

<script>
    /* eslint-disable */
    import Vuex from 'vuex';

    import Bubble1 from './bubbles/Bubble1'
    import Bubble2 from './bubbles/Bubble2'

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
        data(){
            return {
                bubbles: ['Bubble1', 'Bubble2']
            }
        },
        computed: {
            ...Vuex.mapGetters(['nextNode', 'username']),

            randomText() {
                return this.data.text[Math.round(Math.random() * (this.data.text.length - 1))]
            },
            randomBubble() {
                return this.bubbles[Math.round(Math.random() * (this.bubbles.length - 1))]
            },
        },
        components: {
            Bubble1,
            Bubble2
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

</style>