<template>
    <div class="floating-message">
        <div class="floating-message__principal">
            <img v-for="(asset, key) in assets" :key="key" :class="[{'large' : !data.parallax}, key===0 ? 'floating-message__principal-img' : 'floating-message__floating']" :ref="'asset-'+key" :src="assets[key]" :data-rellax-speed="rellaxSpeeds[key]" data-rellax-percentage="1" />
        </div>
    </div>
</template>

<script>
    /* eslint-disable */
    import Vuex from 'vuex';
    import imagesLoaded from 'imagesloaded';
    import Rellax from 'rellax';

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
                layers: {
                    type: Number,
                    default: 0
                },
            }
        },
        data() {
            return {
                rellax: null,
                rellaxSpeeds: [0, 0.3, 0.6]
            }
        },
        computed: {
            ...Vuex.mapGetters(['nextNode']),
            path(){
                return 'assets/messages/floating/'+this.data.id+'/';
            },
            assets(){
                const assets = [];
                assets[0] = this.path+this.data.id+'.png';

                for(let i=0; i < this.data.layers; i++){
                    const j = i+1;
                    assets[j] = this.path+this.data.id+'_'+ j +'.png';
                }
                return assets;
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


            this.rellax = new Rellax('.floating-message__floating', {
                wrapper: '.messages-container',
                center: true,
                round: true
            });
        }
    }
</script>

<style lang="scss" scoped>
    .floating-message {
        position: relative;
        width: 100%;
        margin-top: 10vh;

        &__principal {
            position: relative;
            padding: 10vh 0;
            z-index: 10
        }

        &__principal-img{
            position: relative;
            max-width: 60vw;

            &.large {
                max-width: 80vw;
                width: 80vw;
            }
        }

        &__floating {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
        }
    }
</style>