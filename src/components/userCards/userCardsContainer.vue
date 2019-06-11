<template>
    <div class="user-cards-container">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "userCardsContainer"
    }
</script>

<style lang="scss" scoped>
    .user-cards-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>