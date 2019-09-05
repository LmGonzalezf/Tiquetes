<template lang="html">
  <section class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div class="col wrapper-box">
        <img class="mx-auto d-block" src="../assets/logoflota.png" alt="Flota Rionegro | Expreso Gomez Villa" title="Flota Rionegro | Expreso Gomez Villa">
        
          <p class="wrapper-box__title text-center">Ingresar</p>
        <div>
          <form class="form form-newaccount" id="loginForm">
            <div class="form-group">
              <label for="inputUser">Usuario</label>
              <input v-model="input.username" @focus="clearError()" id="inputUser" type="text" name="username" class="form-control" placeholder="Username">
            </div>
            <div class="form-group">
              <label for="inputPassword">Password</label>
              <input v-model="input.password" @focus="clearError()" @keyup.enter="login" id="inputPassword" type="password" name="password" class="form-control" placeholder="Password">
            </div>
            <div class="form-group">
              <label for="inputTaquilla">Taquilla</label>
              <input v-model="input.taquilla" @focus="clearError()" @keyup.enter="login" id="inputTaquilla" type="text" name="taquilla" class="form-control" placeholder="Taquilla">
            </div>
            <input type="button" v-on:click="login()" class="btn btn-default" id="submitLogin" value="Entrar">
            <transition name="fade">
              <span class="error-block error-message" v-show="error != null">{{ error }}</span>
             </transition>
             
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Login',
    metaInfo: {
      title: 'Sign in',
      titleTemplate: '%s | Flota Rionegro Expreso Gomez Villa'
    },
    data() {
      return {
        input: {
          username: '',
          password: '',
          taquilla: '',
        },
        error: '',
      }
    },
    methods: {
      async login() {
        if(this.input.username != "" && this.input.password != "") {
            var payload = {'usuario': this.input.username, 'taquilla': this.input.taquilla}
            console.log(payload.taquilla)
            var statuscod = 2;
            await this.$http.post('http://localhost:3000/login',{
                id: this.input.username,
                pass: this.input.password
            })
            .then(function (response) {
                
                
                statuscod=1
            }).catch(function(error) {
                
                if(error.response){statuscod = 2}
            });
            
          if(statuscod == 1){
              await this.$store.dispatch('login', payload )
              this.$router.push({ name: "ventas" });
          } else {
            this.error = 'E-mail or password incorrect'
            console.log("The username and / or password is incorrect");
          }
        } else {
          this.error = 'Enter a valid e-mail and password'
          console.log("A username and password must be present");
        } 
      },
      clearError() {
        this.error = ''
      },
    }
  }
</script>

<style lang="scss">
  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 300ms;
  }
</style>

