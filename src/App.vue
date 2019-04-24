<template>
  <div id="app">

    <MobileContainer title="Ma Belle Mort"/>
  </div>
</template>

<script>
import MobileContainer from "./components/MobileContainer";

export default {
  name: 'app',
  components: {
    MobileContainer
  }
}
</script>

<style lang="scss">
  @import "scss/_body";

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
