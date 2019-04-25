<template>
    <div class="messages-container">
        <Message sender="user" content="Bonjour"/>
        <Message sender="bot" content="Enchantée !"/>
    </div>
</template>

<script>
    import Message from "./Message";
    export default {
        name: "MessagesContainer",
        components: {Message}
    }
</script>

<style lang="scss" scoped>
    .messages-container {
        background-color: black;
        padding: 15px;
        overflow: auto;
    }
</style>