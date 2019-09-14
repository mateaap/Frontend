<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

    document.body.style.backgroundImage = "url('" + require('@/assets/bg.jpg') + "')";
    document.body.style.backgroundRepeat = "no-repeat";

    document.body.style.backgroundSize = "cover";

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
