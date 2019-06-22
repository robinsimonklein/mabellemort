<template>
    <div class="color-palette">
        <span class="color-palette__text">Choisis ta couleur...</span>

        <div class="color-palette__wrap">
            <div class="color-palette__item color-palette__item--1">
                <div @click="selectColor(data.choices[0].next, data.choices[0].color)" class="color-palette__dot" :style="'background-color:' + data.choices[0].color" ></div>
            </div>
            <div class="color-palette__item color-palette__item--2">
                <div @click="selectColor(data.choices[1].next, data.choices[1].color)" class="color-palette__dot" :style="'background-color:' + data.choices[1].color" ></div>
            </div>
            <div class="color-palette__item color-palette__item--3">
                <div @click="selectColor(data.choices[2].next, data.choices[2].color)" class="color-palette__dot" :style="'background-color:' + data.choices[2].color" ></div>
            </div>
            <div class="color-palette__item color-palette__item--4">
                <div @click="selectColor(data.choices[3].next, data.choices[3].color)" class="color-palette__dot" :style="'background-color:' + data.choices[3].color" ></div>
            </div>
            <div class="color-palette__item color-palette__item--5">
                <div @click="selectColor(data.choices[4].next, data.choices[4].color)" class="color-palette__dot" :style="'background-color:' + data.choices[4].color" ></div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vuex from 'vuex';

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
        methods: {
            ...Vuex.mapMutations(['SET_BG_COLOR']),

            selectColor(nextId, color){
                this.SET_BG_COLOR(color);
                this.$root.$emit('goToNextNode', nextId);
            },
        }
    }
</script>

<style lang="scss" scoped>
    .color-palette {
        $item-size: 20vw;
        $palette-radius: 12vw;
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
            position: relative;
        }

        &__item{
            position: absolute;
            display: inline-block;
            bottom: 0;
            left: -$item-size/2;
            padding-bottom: $palette-radius;

            &--1 {

            }

            &--2 {
                transform: rotate(72deg);
                transform-origin: bottom center;
            }
            &--3 {
                transform: rotate(144deg);
                transform-origin: bottom center;
            }
            &--4 {
                transform: rotate(218deg);
                transform-origin: bottom center;
            }
            &--5 {
                transform: rotate(290deg);
                transform-origin: bottom center;
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