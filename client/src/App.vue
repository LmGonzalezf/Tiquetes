<template>
  <div v-show="this.$store.state.login" id="app">
    <div v-show="this.$store.state.login" id="nav">
      <b-nav tabs>
      <b-nav-item :active='$route.name =="ventas"' to="/ventas">Ventas</b-nav-item>
      <b-nav-item :active='$route.name =="despachos"' to="/despachos">Despachos</b-nav-item>
      <b-nav-item :active='$route.name =="cierres"' to="/cierres">Cierres</b-nav-item>
      <b-nav-item :active='$route.name =="consultas"' to="/consultas">Consultas</b-nav-item>
      <b-nav-item :active='$route.name =="remesas"' to="/remesas">Remesas</b-nav-item>
      </b-nav>
      
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
  padding: 4px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #ffffff;
}
</style>
