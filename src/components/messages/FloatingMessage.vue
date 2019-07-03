<template>
    <div class="floating-message">
        <div class="floating-message__principal">
            <img v-for="(asset, key) in assets" :key="key" :class="[{'large' : !data.parallax}, key===0 ? 'floating-message__principal-img' : 'floating-message__floating']" :ref="'asset-'+key" :src="assets[key]" :data-rellax-speed="rellaxSpeeds[key]" data-rellax-percentage="0" />
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
            },
            parallax(element, scrollHeight, force, direction, shift){
                let translate = (scrollHeight * force * direction) - shift;
                element.style.transform = 'translateY('+ translate +'px)';
            }
        },
        mounted() {
            imagesLoaded(this.$el.querySelector('img'), () => {
                this.scrollMessagesDown();
                if(this.nextNode){
                    this.$root.$emit('goToNextNode', this.nextNode);
                }
            });

            const messagesContainer = document.querySelector('.messages-container');
            const images = document.querySelectorAll('.floating-message__floating');

            /*
            messagesContainer.addEventListener('scroll', ()=>{
                const scrollHeight  = messagesContainer.scrollTop;
                images.forEach((image, index)=>{
                    this.parallax(image, scrollHeight, 0.05*index+0.05, -1, -10);
                });

                console.log(scrollHeight)
            });

             */

            this.rellax = new Rellax('.floating-message__floating', {
                wrapper: '.messages-container',
                center: true
            });

            console.log(this.rellax)
        }
    }
</script>

<style lang="scss" scoped>
    .floating-message {
        position: relative;
        width: 100%;

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