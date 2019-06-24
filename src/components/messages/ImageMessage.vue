<template>
    <div class="image-message">
        <img :src="data.src" :alt="data.alt">
    </div>
</template>

<script>
    /* eslint-disable */
    import Vuex from 'vuex';

    export default {
        name: "ImageMessage",
        props: {
            data: {
                src: {
                    type: String,
                    default: ''
                },
                alt: {
                    type: String,
                    default: ''
                }

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
            this.scrollMessagesDown();
            if(this.nextNode){
                this.$root.$emit('goToNextNode', this.nextNode);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .image-message {
        width: 100%;
        display: flex;
        justify-content:flex-start;

        img {
            width: 100%;
            max-width: 70%;
        }
    }
</style>