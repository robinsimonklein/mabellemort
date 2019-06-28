<template>
    <div :ref="'frame'" class="frame"></div>
</template>

<script>
    export default {
        name: "Frame",
        methods: {
            resizeFrame(){
                this.$refs.frame.style.height = window.innerHeight+"px";
            }
        },
        mounted(){
            this.resizeFrame();
        }
    }
</script>

<style lang="scss" scoped>
    .frame {
        display: block;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        z-index: 100;
        pointer-events: none; // Allow scroll under frame
        box-sizing: border-box;
        border: 45px solid;
        border-image: url('~@/assets/images/cadre.png') 65 / 45px round;

        transform: scaleY(1.005); // Temporary fix

    }
</style>