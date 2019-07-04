<template>
    <div class="bubble-1" >
        <div class="bubble-1__background" :style="'background-color:'+randomColor.backgroundColor"></div>
        <div class="bubble-1__triangle" :style="'border-left-color: '+randomColor.backgroundColor+ '; border-top-color: '+ randomColor.backgroundColor"></div>
        <div class="bubble-1__text" v-html="text" :style="'color:'+randomColor.color"></div>
    </div>
</template>

<script>
    export default {
        name: "Bubble1",
        props: {
            text: {
                type: String,
                default: ""
            },
        },
        data(){
            return {
                colors: [
                    {color: '#ED5849', backgroundColor: '#0F954F'},
                    {color: '#0F954F', backgroundColor: '#ED5849'},
                    {color: '#6C92E2', backgroundColor: '#CC91FC'},
                    {color: '#CC91FC', backgroundColor: '#6C92E2'},
                    {color: '#ED5849', backgroundColor: '#CC91FC'},
                    {color: '#ED5849', backgroundColor: '#EBFEB4'},
                ]
            }
        },
        computed: {
            randomColor() {
                return this.colors[Math.round(Math.random() * (this.colors.length - 1))];
            }
        }
    }
</script>

<style lang="scss" scoped>
    .bubble-1{
        position: relative;
        text-align: left;
        margin: 1rem 0;

        &__text {
            position: relative;
            font-family: 'Helvetica', sans-serif;
            font-size: 0.9rem;
            padding:2.5rem 2rem;
            z-index: 1;
            background: white;
            border-radius: 100%;
        }

        &__background{
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            width: 100%;
            height: 100%;
            z-index: 0;

            &:after {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 100%;
                background-color: white;
            }
        }

        &__triangle {
            width: 20px;
            height: 20px;
            display: inline-block;
            position: absolute;
            bottom: -20px;
            left: 0;
            z-index: 1;
            border-width: 10px;
            box-sizing: border-box;
            border-style: solid;
            border-bottom-color: transparent;
            border-right-color: transparent;
        }
    }
</style>