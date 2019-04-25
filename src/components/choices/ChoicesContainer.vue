<template>
    <div class="choices-container">
        <Choice text="Un choix" color="#9278ED"/>
        <Choice text="Un autre choix" color="#9278ED"/>
        <Choice text="Troisième choix" color="#9278ED"/>
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
        width: 100%;
        background-color: #222;
    }
</style>