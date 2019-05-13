<template>
    <div class="mobile-container">

    </div>
</template>

<script>
    import ChoicesContainer from "./choices/ChoicesContainer";
    import MessagesContainer from "./messages/MessagesContainer";
    import Message from "./messages/Message";
    import store from './../store.js';

    export default {
        name: "MobileContainer",
        props: {
            title: String
        },

        components: {Message, MessagesContainer, ChoicesContainer},

    }
</script>

<style lang="scss" scoped>
    .mobile-container{
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 100%;

        @media screen and (min-width:540px) {
            height: 80%;
            width: 90%;
            max-width: 400px;
            overflow: hidden;
            box-shadow: 0 0 20px rgba(200, 200, 200, 0.1);
        }
    }

    .messages-container {
        flex:1;
        background-color: black;
        padding: 15px;
        overflow: auto;
    }
</style>