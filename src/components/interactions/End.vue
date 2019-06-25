<template>
    <div class="end">
        <a class="end__btn" href="#">{{ data.btnLabel }}</a>
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
            ...Vuex.mapMutations(['ACTIVATE_USER_INTERACTION']),

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
            this.$root.$emit('printMessage', {'component':'simple-message', 'data': {'text':[ this.data.text ], 'sender': 'Ma Belle Mort'}});
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
        padding: 20px;
        text-align: left;
        margin: 1rem 0;
        box-sizing: border-box;
        z-index: 10;

        &__btn{
            display: block;
            background-color: red;
            padding: 1rem;
            text-align: center;
            color: white;
            font-weight: bold;
            text-decoration: none;

        }
    }
</style>