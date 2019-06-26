<template>
    <div class="floating-message">
        <div class="floating-message__principal">
            <img class="floating-message__principal-img" :class="{'large' : !data.parallax} " :src="principalSrc">
        </div>
        <img v-for="(asset, key) in data.assets" :key="key" :class="['floating-message__floating', key]" :src="floatingElementsSrc[key]" />
    </div>
</template>

<script>
    /* eslint-disable */
    import Vuex from 'vuex';
    import imagesLoaded from 'imagesloaded'

    export default {
        name: "FloatingMessage",
        props: {
            data: {
                id: {
                    type: Number,
                    default: 0
                },
                parallax: {
                    type: Boolean,
                    default: true
                },
                assets: {
                    type: Object,
                    default: null,
                }
            }
        },
        data() {
            return {

            }
        },
        computed: {
            ...Vuex.mapGetters(['nextNode']),
            path(){
                return 'assets/messages/floating/'+this.data.id+'/';
            },
            principalSrc() {
                return this.path + this.data.id + '.png';
            },
            floatingElementsSrc() {
                return {
                    topLeft: this.path + this.data.id + '_tl.png',
                    topCenter: this.path + this.data.id + '_tc.png',
                    topRight: this.path + this.data.id + '_tr.png',
                    centerLeft: this.path + this.data.id + '_cl.png',
                    centerRight: this.path + this.data.id + '_cr.png',
                    bottomLeft: this.path + this.data.id + '_bl.png',
                    bottomCenter: this.path + this.data.id + '_bc.png',
                    bottomRight: this.path + this.data.id + '_br.png',
                }
            }
        },
        methods: {
            scrollMessagesDown(){
                document.querySelector('.messages-container').scroll({
                    left: 0,
                    top: document.querySelector('.messages-container').scrollHeight + 30,
                    behavior: 'smooth'}
                );
            }
        },
        mounted() {
            imagesLoaded(this.$el.querySelector('img'), () => {
                this.scrollMessagesDown();
                if(this.nextNode){
                    this.$root.$emit('goToNextNode', this.nextNode);
                }
            });
        }
    }
</script>

<style lang="scss" scoped>
    .floating-message {
        position: relative;
        width: 100%;

        &__principal {
            padding: 10vh 0;
            z-index: 10
        }

        &__principal-img{
            max-width: 60vw;

            &.large {
                max-width: 80vw;
                width: 80vw;
            }
        }

        &__floating {
            position: absolute;
            width: 50%;

            &.topLeft{
                top: 0;
                left: 0;
            }
            &.topCenter{
                top: 0;
                left: 50%;
                margin-left: -25%;
            }
            &.topRight{
                top: 0;
                right: 0;
            }
            &.centerLeft{
                top: 50%;
                margin-top: -25%;
                left: 0;
            }
            &.centerRight{
                top: 50%;
                margin-top: -25%;
                right: 0;
            }
            &.bottomLeft{
                bottom: 0;
                left: 0;
            }
            &.bottomCenter{
                bottom: 0;
                left: 50%;
                margin-left: -25%;
            }
            &.bottomRight{
                bottom: 0;
                right: 0;
            }
        }
    }
</style>