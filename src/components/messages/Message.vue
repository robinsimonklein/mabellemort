<template>
    <div :class="['message', data.sender]"><span>{{ data.text }}</span></div>
</template>

<script>
    export default {
        name: "Message",
        props: {
            data: {
                sender: {
                    type: String,
                    default: 'death'
                },
                text: {
                    type: String,
                    default: ''
                }
            }
        },
        methods : {
            scrollMessagesDown(){
                document.querySelector('.messages-container').scroll({
                    left: 0,
                    top: document.querySelector('.messages-container').scrollHeight + 30,
                    behavior: 'smooth'}
                );
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
            padding: 10px 15px;
            border: 1px solid;
            font-size: 18px;
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

        &.death{
            text-align: left;
            span {
                border-color: #EBFCB4;
                color: black;
                background-color: rgba(#FFF, 0.8);
            }
        }
    }
</style>