<template>
    <div class="free-response">
        <form class="free-response__form">
            <input type="text" class="free-response__input" name="response" />
            <input type="submit" name="send" value="Envoyer"/>
        </form>
    </div>
</template>

<script>
    export default {
        name: "FreeResponse",
        props: {
            data: {

            },
            fluid: {
                type: Boolean,
                default: false
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
            if(this.fluid){
                this.scrollMessagesDown();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .free-response {
        position: fixed;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0 45px 45px 45px;
        box-sizing: border-box;
        width: 100vw;
        left: 0;
        bottom: 0;
        z-index: 900;
        font-family: 'Millimetre', Arial, sans-serif;

        &__form{
            display: block;
            box-sizing: border-box;
            width: 100%;

        }

        &__input{
            display: inline-block;
            box-sizing: border-box;
            width: 100%;
            background: #444;
            border: none;
            font-size: 1rem;
            font-family: 'Millimetre', Arial, sans-serif;
            padding: 15px 15px;
            color: white;
            border-radius: 5px;
            outline: none;
        }

    }
</style>