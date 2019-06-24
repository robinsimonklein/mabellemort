<template>
    <div class="simple-message">
        {{ randomText }}
    </div>
</template>

<script>
    /* eslint-disable */
    import Vuex from 'vuex';

    export default {
        name: "SimpleMessage",
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
    .simple-message {
        border: 1px solid white;
        padding: 20px;
        text-align: left;
        margin: 1rem 0;
        background-color: black;
    }
</style>