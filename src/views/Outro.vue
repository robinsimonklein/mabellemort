<template>
    <div class="outro view">
        <h1 class="outro__title">Ma Belle Mort</h1>
        <div class="user">
            <div class="user__profile user__profile--offline" style="background-image: url(/img/profile/death_profile.png)"></div>
            <span class="user__name">La Mort est hors-ligne</span>
        </div>
        <div class="outro__message-wrap">
            <div class="outro__message">
                La discution est terminée.
                <br>
                <br>
                Merci d’avoir participé à l’expérience et à bientôt sur&nbsp;<a href="http://arte.tv" target="_blank">Arte.TV</a>
            </div>
        </div>
        <div class="outro__btn">
            <a @click.prevent="start" href="#" class="white-button">Retour à l'accueil</a>
        </div>
    </div>
</template>

<script>
    import Vuex from 'vuex';

    export default {
        name: "Outro",
        methods: {
            ...Vuex.mapMutations(['SET_VIEW']),
            start(){
                this.SET_VIEW('Intro');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .outro {
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-color: black;
        font-family: 'Millimetre', sans-serif;
        background-image: url('~/img/outro_bg.jpg');
        background-size: cover;
        background-position: bottom right;

        &__title {
            margin: 3rem 0 2rem 0;
            font-size: 2.1rem;
            font-weight: normal;
            text-transform: uppercase;
            font-family: 'Daubenton', serif;
            text-shadow: 0 0 15px rgba(255,255,255,0.8);
        }

        &__message-wrap{
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            padding: 2rem 2rem 0 2rem;
            flex: 1;

        }

        &__message {
            font-weight: normal;
            border: 1px solid white;
            font-size: 1rem;
            padding: 2rem 1.2rem;
            font-family: 'Millimetre', sans-serif;
            background-color: black;
            a {
                color: white;
            }
        }

        &__btn {
            margin: 3rem 0;
        }
    }


    .user {
        display: flex;
        align-items: center;
        justify-content: center;
        &__profile {

            position: relative;
            height: 30px;
            width: 30px;
            background-size: cover;
            background-repeat: no-repeat;

            &:after {
                content: '';
                position: absolute;
                bottom: 0;
                right: 0;
                height: 10px;
                width: 10px;
                border-radius: 100%;
                border: 1px solid black;
            }

            &--active{
                &:after {
                    background-color: #6BD37B;
                }
            }
            &--inactive{
                &:after {
                    background-color: #D3976B;
                }
            }
            &--offline{
                &:after {
                    background-color: #D36B6B;
                }
            }
        }
        &__name {
            display: block;
            margin-left: 0.8rem;
        }
    }

</style>