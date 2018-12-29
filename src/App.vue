<template>
  <div id="app">
    <div id="wrap">
    </div>
    <div id="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
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

#wrap {
    min-height: 100%;
}

#main {
    padding: 20px;
    overflow: auto;
}
</style>
