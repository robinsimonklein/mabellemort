<template>
    <div class="free-response">
        <form @submit.prevent="sendDialogflow" class="free-response__form" novalidate="true">
            <input type="text" class="free-response__input" name="response" v-model="response" id="response" placeholder="Message..." autocomplete="off"/>
            <input type="submit" class="free-response__submit" name="send" value="Envoyer"/>
        </form>
    </div>
</template>

<script>
    import uuidv1 from 'uuid/v1'

    export default {
        name: "FreeResponse",
        props: {
        },
        data() {
            return {
                response: null,
                ACCESS_TOKEN: 'de5f56a7d3ea4b63b3033f5e452209d5',
                AI_SESSION_ID: null
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
            sendDialogflow(e){
                console.log(this.response, e)
            }
        },
        mounted() {
            // config dotenv
            this.AI_SESSION_ID = uuidv1();

            console.log(this.ACCESS_TOKEN, this.AI_SESSION_ID)
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
            display: flex;
            box-sizing: border-box;
            width: 100%;
            border-radius: 5px;
            background: #444;

        }

        &__input{
            display: inline-block;
            box-sizing: border-box;
            width: 100%;
            border: none;
            background: none;
            font-size: 1rem;
            font-family: 'Millimetre', Arial, sans-serif;
            padding: 15px 15px;
            color: white;
            outline: none;
        }

        &__submit{
            color: white;
            font-family: 'Millimetre', Arial, sans-serif;
            font-size: 0.8rem;
            margin-left: 5px;
        }

    }
</style>