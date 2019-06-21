<template>
    <div class="user-card" :class="{'fluid' : fluid}" :style="'background-color: ' + data.color" @click="selectChoice">
        <div class="user-card__text-wrap">
            <p class="user-card__text">{{ data.text }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserCard",
        props: {
            data: {
                text: {
                    type: String,
                    default: ''
                },
                color: {
                    type: String,
                    default: 'red'
                },
                next: {
                    type: Number,
                    default: null
                }
            },
            fluid: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            selectChoice(){
                this.$root.$emit('printUserMessage', {'component':'UserCard', 'data': {'text': this.data.text, 'color': this.data.color}});
                this.$root.$emit('goToNextNode', this.data.next);
            },
            scrollMessagesDown(){
                document.querySelector('.messages-container').scroll({
                    left: 0,
                    top: document.querySelector('.messages-container').scrollHeight + 30,
                    behavior: 'smooth'}
                );
            }
        },
        mounted() {
            if(this.fluid){
                this.scrollMessagesDown();
            }
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

            transition: all 0.5s ease;
        }

        $card-scale: 0.2;

        &.active {
            .tidy &{
                transform: scale($card-scale) rotate(30deg);
                transform-origin: bottom;
                margin-bottom: 0;
                z-index: 4;
            }
        }


        &.hidden {
            opacity: 0;
            z-index: 0;
            transform: scale($card-scale) rotate(-30deg);
            transform-origin: bottom;
            margin-bottom: 0;
        }

        &.small {
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