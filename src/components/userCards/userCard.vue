<template>
    <div class="user-card" :style="'background-color: ' + color">
        <div class="user-card__text-wrap">
            <p class="user-card__text">ds nkfnsdnfjdsfn jsdf dsf bsdfb s vgvv hdbsdfjdb</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "userCard",
        props: {
            color: {
                type: String,
                default: 'red'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .user-card {
        $card-width: 70vw;

        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: $card-width / -2;
        display: block;
        width: $card-width;
        margin-bottom: 12vh;
        box-sizing: border-box;

        &:after {
            content: "";
            display: block;
            padding-bottom: 150%;
        }

        &.small {
            $card-scale: 0.2;
            transform: scale($card-scale);
            transform-origin: bottom;
            margin-bottom: 0;

            &--left {
                transform: scale($card-scale) rotate(-45deg);
                transform-origin: bottom;
                margin-bottom: 0;
            }
            &--right {
                transform: scale($card-scale) rotate(45deg);
                transform-origin: bottom;
                margin-bottom: 0;
            }
        }

        &__text-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            height: 100%;
            width: 100%;
            overflow: hidden;
            box-sizing: border-box;
        }

        &__text {
            margin: 0;
        }
    }
</style>