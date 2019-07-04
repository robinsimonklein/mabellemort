<template>
    <div class="bubble-2" >
        <div class="bubble-2__text" v-html="text" :style="'color:'+randomColor.color+'; background-color: '+randomColor.backgroundColor"></div>
        <div class="bubble-2__triangle" :style="'border-left-color: '+randomColor.backgroundColor+ '; border-top-color: '+ randomColor.backgroundColor"></div>
    </div>
</template>

<script>
    export default {
        name: "Bubble2",
        props: {
            text: {
                type: String,
                default: ""
            },
        },
        data(){
            return {
                colors: [
                    {color: '#ce2c28', backgroundColor: '#ebffb5'},
                    {color: '#4343ff', backgroundColor: '#b3ffd2'},
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
    .bubble-2{
        position: relative;
        text-align: left;
        margin: 1rem 0;

        &__text {
            position: relative;
            font-family: 'Helvetica', sans-serif;
            font-size: 0.9rem;
            padding:1em 1.3rem;
            z-index: 1;
            background: white;
            border-radius: 1rem;
        }

        &__triangle {
            width: 20px;
            height: 20px;
            display: inline-block;
            position: absolute;
            bottom: -20px;
            left: 1.1rem;
            z-index: 1;
            border-width: 10px;
            box-sizing: border-box;
            border-style: solid;
            border-bottom-color: transparent;
            border-right-color: transparent;
        }
    }
</style>