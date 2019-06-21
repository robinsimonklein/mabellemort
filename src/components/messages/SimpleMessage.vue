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
                text: Array,
                default: null
            }
        },
        computed: {
            ...Vuex.mapGetters(['nextNode']),

            randomText() {
                return this.data.text[Math.round(Math.random() * (this.data.text.length - 1))]
            }
        },
        mounted() {
            if(this.nextNode){
                this.$root.$emit('goToNextNode', this.nextNode);
                console.log(this.nextNode)
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
    }
</style>