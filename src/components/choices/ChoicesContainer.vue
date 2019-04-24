<template>
    <div class="choices-container">
        <Choice text="Un choix"/>
        <Choice text="Un autre choix"/>
        <Choice text="Troisième choix"/>
    </div>
</template>

<script>
    import Choice from "./Choice";
    export default {
        name: "ChoicesContainer",
        components: {Choice}
    }
</script>

<style lang="scss" scoped>
    .choices-container{
        height: 100px;
        width: 100%;
        background-color: #222;
    }
</style>