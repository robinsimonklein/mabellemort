<template>
    <div class="canvas-draw" ref="canvasWrapper">
        <span class="canvas-draw__title">Dessiner Ma Belle Mort</span>
        <canvas id="canvas" class="canvas-draw__area" ref="canvas" :width="width" :height="height"></canvas>
        <ul class="tools">
            <li class="tool__clear" @click="clearDrawing"></li>
            <li class="tool__color-palette">
                <ul>
                    <li v-for="(color, key) in data.colors" :key="key" :class="['tool__color', 'tool__color--' + key, {'active' : tools[0].color === color}]" @click="setColor(color)" :style="'background-color:'+color"></li>
                </ul>
            </li>

            <li @click="send()" class="tool__send">ENVOYER</li>
        </ul>
    </div>
</template>

<script>
    import Vuex from 'vuex';

    export default {
        name: 'CanvasDraw',
        props: {
            data: {
                colors: {
                    type: Array,
                    default: ['#000', '#A05', '#0A4', '#05A'],
                },
                thresholds: {
                    type: Object,
                    default: 0
                },
                next: {
                    type: Object,
                    default: null
                },
                default: null
            },
            brushSize: {
                type: Number,
                default: 12,
            },
            outputName: {
                type: String,
                default: 'canvas',
            },
        },
        data() {
            return {
                startedTime: null,
                canvasContext: null,
                canvasRect: null,
                isDrawing: false,
                lastX: 0,
                lastY: 0,
                tools: [
                    {
                        name: 'Pencil',
                        color: '#000',
                    },
                    {
                        name: 'Eraser',
                    },
                ],
                selectedToolIdx: 0,

                // Etats du dessin
                drawState: {
                    size: 0,
                    duration: 0,
                    oneColor: true,
                    restart: 0
                },
                calculatedNext: null // L'étape définie en fonction du dessin et du comportement de l'utilisateur
            };
        },
        computed: {
            ...Vuex.mapGetters(['demoMode']),

            width(){
                return window.innerWidth - window.innerWidth*0.1
            },
            height() {
                return window.innerWidth - window.innerWidth*0.1
            }
        },
        methods: {
            setCanvas() {
                this.canvasContext = this.$refs.canvas.getContext('2d');
                this.canvasContext.lineJoin = 'round';
                this.canvasContext.lineCap = 'round';
                this.canvasContext.lineWidth = this.brushSize;
                this.canvasContext.strokeStyle = this.tools[this.selectedToolIdx].color;
                this.canvasRect = this.$refs.canvas.getBoundingClientRect();
            },
            bindEvents() {
                this.$refs.canvas.addEventListener('touchstart', (event) => {
                    this.isDrawing = true;
                    [this.lastX, this.lastY] = [event.touches[0].clientX - this.canvasRect.left, event.touches[0].clientY - this.canvasRect.top];

                    // On vérifie si l'utilisateur utilise une autre couleur que le noir
                    if(this.tools[this.selectedToolIdx].color !== this.data.thresholds.oneColor){
                        this.drawState.oneColor = false;
                    }
                });
                this.$refs.canvas.addEventListener('touchmove', this.draw);
                this.$refs.canvas.addEventListener('touchend', () => this.isDrawing = false);
                this.$refs.canvas.addEventListener('touchleave', () => this.isDrawing = false);
            },
            draw(event) {
                if (!this.isDrawing) return;

                if (this.tools[this.selectedToolIdx].name === 'Eraser') {
                    this.canvasContext.globalCompositeOperation = 'destination-out';
                } else {
                    this.canvasContext.globalCompositeOperation = 'source-over';
                    this.canvasContext.strokeStyle = this.tools[this.selectedToolIdx].color;
                }

                this.canvasContext.beginPath();
                this.canvasContext.moveTo(this.lastX, this.lastY);
                this.canvasContext.lineTo(event.touches[0].clientX - this.canvasRect.left, event.touches[0].clientY - this.canvasRect.top);
                this.canvasContext.stroke();
                [this.lastX, this.lastY] = [event.touches[0].clientX - this.canvasRect.left, event.touches[0].clientY - this.canvasRect.top];

                // Compter la "taille" du dessin
                this.drawState.size++;
            },
            setColor(color){
                this.tools[0].color = color;
            },
            clearDrawing(){
                // Reset drawState
                this.drawState.size = 0;
                this.drawState.oneColor = true;

                // Effacer le dessin
                this.canvasContext.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
                // Incrémenter le nombre de restart
                this.drawState.restart++;
            },
            download() {
                const link = document.createElement('a');
                link.download = `${this.outputName}.png`;
                link.href = this.$refs.canvas.toDataURL();
                link.click();
            },
            checkCanvas(){
                // Mise à jour du temps écoulé
                const finishedTime = Date.now();
                this.drawState.duration = Math.floor((finishedTime - this.startedTime)/1000); // in seconds

                // Choix de l'étape suivante en fonciton du dessin et du comportement de l'utilisateur

                if(this.drawState.size <= this.data.thresholds.size){
                    // L'utilisateur n'a pas beaucoup dessiné
                    if(this.data.next.size) {
                        this.calculatedNext = this.data.next.size;
                        return;
                    }
                }
                if(this.drawState.time >= this.data.thresholds.time){
                    // L'utilisateur a pris beaucoup de temps
                    if(this.data.next.time) {
                        this.calculatedNext = this.data.next.time;
                        return;
                    }
                }
                if(this.drawState.oneColor){
                    // L'utilisateur n'a utilisé qu'une seule couleur (noir)
                    if(this.data.next.oneColor) {
                        this.calculatedNext = this.data.next.oneColor;
                        return;
                    }
                }
                if(this.drawState.restart >= this.data.thresholds.restart){
                    // L'utilisateur a recommencé plusieurs fois
                    if(this.data.next.restart) {
                        this.calculatedNext = this.data.next.restart;
                        return;
                    }
                }
                // Si aucun de ces cas
                this.calculatedNext = this.data.next.default;
            },
            send(){
                // On détermine quelle étape sera la suivante
                this.checkCanvas();
                // On passe à l'étape suivante
                if(!this.demoMode) {
                    this.$root.$emit('goToNextNode', this.calculatedNext);
                }else{
                    this.$root.$emit('goToNextNode', "m22");
                }
            }
        },
        mounted() {
            // init canvas
            this.setCanvas();
            this.bindEvents();

            // On met de côté la date de début du dessin
            this.startedTime = Date.now();
        }
    }
</script>
<style lang="scss" scoped>
    .canvas-draw {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 900;
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: black;

        &__area {
            display: inline-block;
            touch-action: none;
        }

        &__title {
            color: white;
            margin-bottom: 1rem;
        }
    }
    #canvas {
        background-color: #ffffff;
        z-index: 0;
    }
    .tools {
        display: flex;
        align-items: center;
        justify-content: space-between;
        list-style-type: none;
        margin-top: 1rem;
        padding: 0;
        width: 90vw;
    }
    .tool {

        &__clear {
            height: 2.5rem;
            width: 2.5rem;
            border-radius: 50%;
            background-color: white;
            background-image: url('~@/assets/picto/trash.svg');
            background-size: 50%;
            background-repeat: no-repeat;
            background-position: center;
        }

        &__color-palette ul{
            display: flex;
            padding: 0;
            list-style-type: none;
        }
        &__color {
            height: 2.3rem;
            width: 2.3rem;
            border-radius: 100%;
            margin: 0 5px;
            box-sizing: border-box;
            border: 8px solid white;
            transition: border 0.2s ease;

            &.active {
                border: 4px solid white;
                transition: border 0.2s ease;
            }

        }

        &__send {
            font-family: 'Millimetre', Arial, sans-serif;
            font-size: 1rem;
            font-weight: bold;
        }
    }

</style>