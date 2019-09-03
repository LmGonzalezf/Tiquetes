<template>
  <div id="app">
    <div v-show="this.$store.state.login" id="nav">
      <router-link to="/about">About</router-link> |
      <router-link to="/ventas">Ventas</router-link> |
      <router-link to="/despachos">Despachos</router-link> |
      <router-link to="/cierres">Cierres</router-link> |
      <router-link to="/consultas">Consultas</router-link> |
      <router-link to="/remesas">Remesas</router-link> |
      <router-link to="/Home">Home</router-link>
    </div>
    <router-view/>
  </div>
</template>


<script>
export default {
  
}
</script>
<style lang="scss">
  @import './assets/scss/variables.scss';
  @import './node_modules/bootstrap/scss/bootstrap.scss';
  @import './assets/scss/form.scss';
  @import './assets/scss/main.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
