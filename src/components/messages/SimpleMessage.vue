<template>
    <div class="simple-message">
        {{ data.text }}
    </div>
</template>

<script>
    export default {
        name: "SimpleMessage",
        props: {
            data: {
                text: Array,
                default: null
            }
        }
    }
</script>

<style lang="scss" scoped>
    .simple-message {

    }
</style>