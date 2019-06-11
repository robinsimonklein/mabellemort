<template>
    <div class="user-card">

    </div>
</template>

<script>
    export default {
        name: "userCard"
    }
</script>

<style lang="scss" scoped>
    .user-card {
        display: block;
        width: 80%;
        background: red;

        &:after {
            content: "";
            display: block;
            padding-bottom: 150%;
        }
    }
</style>