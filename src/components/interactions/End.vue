<template>
    <div class="end">
        <a @click.prevent="showOutro" class="end__btn white-button" href="#" v-html="data.btnLabel"></a>
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

                btnLabel: {
                    type: String,
                    default: null
                },

            }
        },
        computed: {
            ...Vuex.mapGetters(['nextNode']),

        },
        methods: {
            ...Vuex.mapMutations(['SET_VIEW', 'ACTIVATE_USER_INTERACTION']),

            scrollMessagesDown(){
                document.querySelector('.messages-container').scroll({
                    left: 0,
                    top: document.querySelector('.messages-container').scrollHeight + 30,
                    behavior: 'smooth'}
                );
            },
            showOutro(){
                this.SET_VIEW('Outro')
            }
        },
        mounted() {
            this.scrollMessagesDown();
            if(this.data.text) {
                this.$root.$emit('printMessage', {
                    'component': 'simple-message',
                    'data': {'text': [this.data.text], 'sender': 'Ma Belle Mort'}
                });
            }
            this.ACTIVATE_USER_INTERACTION();
        }
    }
</script>

<style lang="scss" scoped>
    .end {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        text-align: left;
        padding:3rem;
        box-sizing: border-box;
        z-index: 10;

        &__btn{
            display: block;
            text-align: center;
            font-weight: bold;
            text-decoration: none;

        }
    }
</style>