<template>
    <form class="intro view">
        <h1 class="intro__title">Ma Belle Mort</h1>
        <input class="intro__forname" type="text" name="username" v-model="username" placeholder="Votre prénom..." />
        <transition><div v-show="error" class="intro__forname--error">{{ error }}</div></transition>
        <h2 class="intro__subtitle">Contacts</h2>
        <div class="intro__contacts">
            <ul class="intro__list">
                <h3 class="intro__list-title">En ligne</h3>
                <li class="intro__list-item">
                    <div class="user__profile user__profile--active" style="background-image: url(/img/profile/death_profile.png)"></div>
                    <span class="user__name">La Mort</span>
                </li>
            </ul>
            <ul class="intro__list">
                <h3 class="intro__list-title">Inactif</h3>
                <li class="intro__list-item">
                    <div class="user__profile user__profile--inactive" style="background-image: url(/img/profile/truth_profile.png)"></div>
                    <span class="user__name">La Vérité</span>
                </li>
                <li class="intro__list-item">
                    <div class="user__profile user__profile--inactive" style="background-image: url(/img/profile/arte_profile.png)"></div>
                    <span class="user__name">Arte</span>
                </li>
            </ul>
            <ul class="intro__list">
                <h3 class="intro__list-title">Hors ligne</h3>
                <li class="intro__list-item">
                    <div class="user__profile user__profile--offline" style="background-image: url(/img/profile/life_profile.png)"></div>
                    <span class="user__name">La Vie</span>
                </li>
                <li class="intro__list-item">
                    <div class="user__profile user__profile--offline" style="background-image: url(/img/profile/love_profile.png)"></div>
                    <span class="user__name">L'amour</span>
                </li>
                <li class="intro__list-item">
                    <div class="user__profile user__profile--offline" style="background-image: url(/img/profile/god_profile.png)"></div>
                    <span class="user__name">Dieu</span>
                </li>
            </ul>
        </div>
        <div class="intro__btn">
            <input @click.prevent="start" type="submit" href="#" class="white-button" value="Commencer la discussion"/>
        </div>
    </form>
</template>

<script>

    import Vuex from 'vuex';

    export default {
        name: "Outro",
        data(){
            return {
                username: null,
                error: null
            }
        },
        methods: {
            ...Vuex.mapMutations(['SET_VIEW', 'SET_ACTUAL', "SET_USERNAME"]),
            start(){
                if(this.username && this.username.length > 2){
                    this.error = null;
                    this.SET_ACTUAL('m0');
                    this.SET_VIEW(null);
                    this.SET_USERNAME(this.username)
                }else{
                    this.error= "Vous devez entrer votre prénom."
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.intro {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: black;

    &__title {
        margin: 3rem 0 2rem 0;
        font-size: 2.1rem;
        font-weight: normal;
        text-transform: uppercase;
        font-family: 'Daubenton', serif;
        text-shadow: 0 0 15px rgba(255,255,255,0.8);
    }
    &__subtitle{
        font-size: 1.3rem;
        text-align: left;
        font-family: 'Daubenton', serif;
        text-transform: uppercase;
        font-weight: normal;
        margin-bottom: 0.5rem;
        padding: 0 2rem;
    }

    &__forname {
        background-color: rgba(255,255,255,0.2);
        border: none;
        font-size: 1rem;
        font-family: 'Millimetre', sans-serif;
        padding: 1rem;
        margin: 0 2rem;
        outline: none;
        color: white;
        border-radius: 0.5rem;

        &--error {
            color: #D36B6B;
            margin: 10px 0;
            font-size: 0.8rem;
            font-family: 'Millimetre', sans-serif;
        }
    }

    &__contacts {
        flex:1;
        padding: 0 2rem;
        overflow: auto;
    }

    &__list{
        list-style-type: none;
        padding: 0;
    }
    &__list-item{
        display: flex;
        align-items: center;
        margin: 10px 0;
    }
    &__list-title{
        padding-bottom: 0.5rem;
        text-transform: uppercase;
        font-family: 'Daubenton', serif;
        text-align: left;
        font-size: 0.9rem;
        border-bottom: 1px solid rgba(255,255,255,0.5);
    }

    .user__profile {

        position: relative;
        height: 35px;
        width: 35px;
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
    .user__name {
        display: block;
        font-size: 0.9rem;
        margin-left: 0.8rem;
        font-family: 'Helvetica', sans-serif;
        font-weight: normal;
    }

    &__btn {
        margin: 3rem 0;
    }

}
</style>