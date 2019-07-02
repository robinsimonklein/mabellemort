<template>
    <div class="outro view">
        <h1 class="outro__title">Ma Belle Mort</h1>
        <div class="user">
            <div class="user__profile user__profile--offline" style="background-image: url(/img/profile/love_profile.png)"></div>
            <span class="user__name">L'amour</span>
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
                this.SET_VIEW(null);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .outro {
        display: flex;
        padding: 0 2rem;
        flex-direction: column;
        justify-content: center;
        background-color: black;

        &__title {
            font-size: 2.1rem;
            font-weight: normal;
            text-transform: uppercase;
            font-family: 'Daubenton', serif;
            text-shadow: 0 0 15px rgba(255,255,255,0.8);
        }
    }

</style>