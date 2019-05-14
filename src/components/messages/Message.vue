<template>
    <div class="message" v-bind:class="[sender]"><span>{{ content }}</span></div>
</template>

<script>
    export default {
        name: "Message",
        props: {
            content: String,
            sender: String
        },
        methods : {
            scrollMessagesDown(){
                document.querySelector('.messages-container').scroll(0, document.querySelector('.messages-container').scrollHeight + 30);
            }
        },
        mounted(){
            this.scrollMessagesDown();
        }
    }
</script>

<style lang="scss" scoped>
    .message {
        display: block;
        margin: 5px 0;

        span {
            display: inline-block;
            padding: 5px 10px;
            border: 1px solid;
            font-size: 14px;
            max-width: 70%;
        }

        &.user{
            text-align: right;
            span {
                text-align: left;
                border-color: #55B470;
                color: black;
                background-color: rgba(#55B470, 0.8);
            }
        }

        &.bot{
            text-align: left;
            span {
                border-color: #EBFCB4;
                color: black;
                background-color: rgba(#EBFCB4, 0.8);
            }
        }
    }
</style>