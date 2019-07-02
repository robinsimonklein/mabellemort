<template>
    <div class="intro view">
        <h1 class="intro__title">Ma Belle Mort</h1>
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
                    <div class="user__profile user__profile--active" style="background-image: url(/img/profile/truth_profile.png)"></div>
                    <span class="user__name">La Vérité</span>
                </li>
                <li class="intro__list-item">
                    <div class="user__profile user__profile--active" style="background-image: url(/img/profile/arte_profile.png)"></div>
                    <span class="user__name">Arte</span>
                </li>
            </ul>
            <ul class="intro__list">
                <h3 class="intro__list-title">Hors ligne</h3>
                <li class="intro__list-item">
                    <div class="user__profile user__profile--active" style="background-image: url(/img/profile/life_profile.png)"></div>
                    <span class="user__name">La Vie</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Intro",

    }
</script>

<style lang="scss" scoped>
.intro {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: black;

    &__title {
        font-size: 2rem;
        font-weight: normal;
        text-transform: uppercase;
        font-family: 'Daubenton', serif;
    }

    &__contacts {
        padding: 0 2rem;
    }

    &__list{
        list-style-type: none;
        padding: 0;
    }
    &__list-item{
        display: flex;
        align-items: center;
    }

    .user__profile {

        position: relative;
        height: 40px;
        width: 40px;
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

        }

        &--active{
            &:after {
                background-color: #6BD37B;
            }
        }
        &--inactive{
            &:after {
                background-color: #6BD37B;
            }
        }
        &--offline{
            &:after {
                background-color: #6BD37B;
            }
        }
    }
    .user__name {
        margin-left: 0.9rem;
    }

}
</style>