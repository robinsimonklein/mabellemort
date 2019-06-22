<template>
    <div class="color-palette">
        <span class="color-palette__text">Choisis ta couleur...</span>

        <div class="color-palette__wrap">
            <div class="color-palette__item color-palette__item--1">
                <div @click="selectColor(0, data.choices[0].next, data.choices[0].color, 0)" class="color-palette__dot" :style="'background-color:' + data.choices[0].color" ></div>
            </div>
            <div class="color-palette__item color-palette__item--2">
                <div @click="selectColor(1, data.choices[1].next, data.choices[1].color, 1)" class="color-palette__dot" :style="'background-color:' + data.choices[1].color" ></div>
            </div>
            <div class="color-palette__item color-palette__item--3">
                <div @click="selectColor(2, data.choices[2].next, data.choices[2].color, 2)" class="color-palette__dot" :style="'background-color:' + data.choices[2].color" ></div>
            </div>
            <div class="color-palette__item color-palette__item--4">
                <div @click="selectColor(3, data.choices[3].next, data.choices[3].color, 3)" class="color-palette__dot" :style="'background-color:' + data.choices[3].color" ></div>
            </div>
            <div class="color-palette__item color-palette__item--5">
                <div @click="selectColor(4, data.choices[4].next, data.choices[4].color, 4)" class="color-palette__dot" :style="'background-color:' + data.choices[4].color" ></div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vuex from 'vuex';
    import TweenLite from 'gsap'

    export default {
        name: "ColorPalette",
        props: {
            data: {
                choices: {
                    color: {
                        type: String,
                        default: null
                    },
                    next: {
                        type: Number,
                        default: null
                    }
                }
            }
        },
        data(){
            return {
                dots: []
            }
        },
        methods: {
            ...Vuex.mapMutations(['SET_BG_COLOR']),

            selectColor(index, nextId, color){
                this.SET_BG_COLOR(color);
                // On masque toutes les autres couleurs
                this.dots.forEach((dot, i) => {
                    if(i !== index){
                        dot.style.opacity = 0;
                    }
                });

                // Animation de remplissage avec la couleur
                // eslint-disable-next-line
                TweenLite.to(this.dots[index], 1, {scale: 20, ease: Power2.easeOut});
                TweenLite.to(this.$el, 1, {opacity: 0, ease: Power2.easeOut, delay: 0.7, onComplete: () => {
                        this.$root.$emit('goToNextNode', nextId);
                    }})
                // this.$root.$emit('goToNextNode', nextId);
            },
        },
        mounted() {
            this.$el.querySelectorAll('.color-palette__dot').forEach((el, i) => {
                this.dots[i] = el;
                // eslint-disable-next-line
                TweenLite.to(el, 1, {x: '20vw', delay: i*0.03, ease: Power2.easeOut})
            })
        }
    }
</script>

<style lang="scss" scoped>
    .color-palette {
        $item-size: 20vw;
        $palette-radius: 25vw;
        position: fixed;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100vh;
        width: 100vw;
        background-color: rgba(black, 0.9);
        z-index: 900;

        &__wrap{
            position: absolute;
            top: 50%;
            left: 50%;
            height: $item-size;
            width: $item-size;
            margin-left: $item-size / -2;
            margin-top: $item-size / -2;
        }

        &__item{
            position: absolute;
            display: inline-block;
            bottom: 0;
            left: 0;

            &--1 {

            }

            &--2 {
                transform: rotate(72deg);
                transform-origin: center center;
            }
            &--3 {
                transform: rotate(144deg);
                transform-origin: center center;
            }
            &--4 {
                transform: rotate(218deg);
                transform-origin: center center;
            }
            &--5 {
                transform: rotate(290deg);
                transform-origin: center center;
            }


        }

        &__dot {
            display: inline-block;
            height: $item-size;
            width: $item-size;
            border-radius: 100%;

        }

        &__text {
            position: absolute;
            top: 5vh;
            left: 50%;
            transform: translateX(-50%);
        }

    }
</style>