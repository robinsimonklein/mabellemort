<template>
    <div class="intro view">
        <h1 class="intro__title">Ma Belle Mort</h1>
        <h2 class="intro__subtitle">Contacts</h2>
        <ul class="intro__list">
            <h3 class="intro__list-title">En ligne</h3>
            <li class="intro__list-item">
                <img class="user__profile" src="/img/profile/death_profile.png"/>
                <span class="user__name">La Mort</span>
            </li>
        </ul>
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
}
</style>