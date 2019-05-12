<template>
  <div id="app">

    <MobileContainer title="Ma Belle Mort"/>
  </div>
</template>

<script>
import MobileContainer from "./components/MobileContainer";
import { Client } from 'dialogflow-gateway'

export default {
    name: 'app',
    mounted() {
        new Client('mabellemort-6e5b9').connect()

    },
    components: {
     MobileContainer
    }
}
</script>

<style lang="scss">

  #app {
    display: flex;
    height: 100%;
    width: 100%;

    align-items: center;
    justify-content: center;

    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #dddddd;
    background-color: #FAFAFA;

  }
</style>
