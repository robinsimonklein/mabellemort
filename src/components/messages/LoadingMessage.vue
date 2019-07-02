<template>
    <div class="loading-message">
        <span v-html="text"></span><span class="loading-message__dot">.</span> <span class="loading-message__dot">.</span><span class="loading-message__dot">.</span>
    </div>
</template>

<script>
    export default {
        name: "LoadingMessage",
        props: {
            text: {
                type: String,
                default: ""
            }
        }
    }
</script>

<style lang="scss" scoped>
.loading-message{
    font-size: 0.9rem;
    font-family: 'Millimetre', Arial, sans-serif;
    font-weight: normal;

    &__dot {
        $animation-duration: 1s;
        display:inline-block;
        font-size: 1.6rem;
        margin: 0 1px;
        animation: opacity $animation-duration ease infinite;

        &:nth-child(2) {
            animation-delay: $animation-duration + 0.1;
        }

        &:nth-child(3) {
            animation-delay: $animation-duration + 0.2;
        }
    }

    @keyframes opacity {
        0%, 60%, 100% {
            opacity: 0;
        }

        30% {
            opacity: 1;
        }
    }
}
</style>