<template>
    <div class="conversation-event" v-html="data.text">
    </div>
</template>

<script>
    /* eslint-disable */
    import Vuex from 'vuex';

    export default {
        name: "ConversationEvent",
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
            scrollMessagesDown(){
                document.querySelector('.messages-container').scroll({
                    left: 0,
                    top: document.querySelector('.messages-container').scrollHeight + 30,
                    behavior: 'smooth'}
                );
            }
        },
        mounted() {
            console.log('event')
            this.scrollMessagesDown();
            if(this.nextNode){
                this.$root.$emit('goToNextNode', this.nextNode);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .conversation-event {
        text-align: center;
        margin: 1rem 0;
        background-color: black;
    }
</style>