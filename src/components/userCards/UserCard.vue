<template>
    <div class="user-card" :style="'background-color: ' + color" @click="selectChoice">
        <div class="user-card__text-wrap">
            <p class="user-card__text">{{ text }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserCard",
        props: {
            text: {
                type: String,
                default: ''
            },
            color: {
                type: String,
                default: 'red'
            },
        },
        data() {
            return {

            }
        },
        methods: {
            selectChoice(){
                this.$root.$emit('selectChoice',this.$el, this.text, this.color, this.follow);
            }
        },
        mounted() {
            this.el = this.$el
        }
    }
</script>

<style lang="scss" scoped>

    @import "~@/scss/_abstract/_variables";

    .user-card {
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: $user-card-width / -2;
        display: block;
        width: $user-card-width;
        margin-bottom: 12vh;
        box-sizing: border-box;
        border-radius: 10px;
        z-index: 5;
        transition: all 0.5s ease-in-out;

        &:after {
            content: "";
            display: block;
            padding-bottom: 150%;
        }

        &.fluid {
            position: relative;
            left: inherit;
            bottom: inherit;
            margin: 20px 0;
            float: right;

            transition: all 0.5s ease;
        }

        &.hidden {
            $card-scale: 0.2;
            opacity: 0;
            z-index: 0;
            transform: scale($card-scale) rotate(-30deg);
            transform-origin: bottom;
            margin-bottom: 0;
        }

        &.small {
            $card-scale: 0.2;
            transform: scale($card-scale);
            transform-origin: bottom;
            margin-bottom: 0;
            z-index: 3;

            &--left {
                transform: scale($card-scale) rotate(-30deg);
                transform-origin: bottom;
                margin-bottom: 0;
                z-index: 2;

                .active &{
                    transform: scale($card-scale) rotate(-15deg);
                }
            }
            &--right {
                transform: scale($card-scale) rotate(30deg);
                transform-origin: bottom;
                margin-bottom: 0;
                z-index: 4;
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
            padding: 0 20px;
            text-rendering: geometricPrecision;
        }
    }
</style>