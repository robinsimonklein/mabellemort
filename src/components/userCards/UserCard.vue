<template>
    <div class="user-card" :class="{'fluid' : fluid}" :style="'background-image:url(/assets/messages/user-card/user-card_' + data.number + '.png)'" @click="selectChoice">
        <div class="user-card__text-wrap">
            <p class="user-card__text" :class="textSize">{{ data.text }}</p>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import TweenLite from 'gsap'
    import Hammer from 'hammerjs'

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
                number: {
                    type: String,
                    default: 1
                },
                next: {
                    type: Number,
                    default: null
                }
            },
            fluid: {
                type: Boolean,
                default: false
            },
            shifumi: {
                type: Boolean,
                default: false
            }
        },
        data(){
            return {
                hidden: false,
                hammer: null
            }
        },
        computed: {
            length(){
                return this.data.text.length;
            },
            textSize() {
                if(this.length<4) {
                    return 'big';
                }else if(this.length<9) {
                    return 'medium';
                }else {
                    return null
                }
            }
        },
        methods: {
            selectChoice(){
                if(!this.fluid  && !this.shifumi) {
                    this.$root.$emit('printUserMessage', {
                        'component': 'UserCard',
                        'data': {
                            'text': this.data.text,
                            'color': this.data.color,
                            'number': this.data.number
                        }
                    });
                    this.$root.$emit('goToNextNode', this.data.next);
                }else if(this.shifumi){
                    this.$root.$emit('shifumiChoice', {
                        'text': this.data.text,
                        'number': this.data.number
                    });
                }
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
            //Configure Hammer

            this.hammer = new Hammer(this.$el);
            this.hammer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
            this.hammer.on('swipedown', (e) => {
                this.$emit('swipedown');
            });

            if(this.fluid){
                this.scrollMessagesDown();
            }else {
                //TweenLite
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
        color: #222;
        margin-left: $user-card-width / -2;
        display: block;
        width: $user-card-width;
        margin-bottom: 12vh;
        box-sizing: border-box;
        z-index: 5;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        transition: all 0.5s ease-in-out;

        &:after {
            content: "";
            display: block;
            padding-bottom: 157.3%;
        }

        &.fluid {
            position: relative;
            left: inherit;
            bottom: inherit;
            margin: 20px 0;
            z-index: 1;
            transition: all 0.5s ease;
        }

        $card-scale: 0.30;

        &.active {
            .tidy &{
                transform: scale($card-scale) translateY(4rem) rotate(30deg);
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
            transform: scale($card-scale) translateY(4rem);
            transform-origin: bottom;
            margin-bottom: 0;
            z-index: 3;

            &--left {
                transform: scale($card-scale) translateY(4rem) rotate(-30deg);
                transform-origin: bottom;
                margin-bottom: 0;
                z-index: 2;

                .active &{
                    transform: scale($card-scale) rotate(-15deg);
                }
            }
            &--right {
                transform: scale($card-scale)  rotate(30deg);
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
            font-family: 'Daubenton', serif;
            text-transform: uppercase;

            &.big{
                font-size: 5rem;
            }

            &.medium {
                font-size: 2rem;
            }
        }
    }
</style>