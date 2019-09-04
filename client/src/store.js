import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: true,
    loadingStatus: 'notLoading',
    taquilla: '',
    destinos:[],
    usuario:'',
  },
  mutations: {
    SET_LOADING_STATUS(state, status){
      state.loadingStatus = status
    },
    SET_DESTINOS(state, destinos){
      state.destinos = destinos
    },
    SET_TAQUILLA(state, taquilla){
      state.taquilla = taquilla
    },
    SET_USUARIO(state, usuario){
      state.usuario = usuario
    },
    SET_LOGIN(state){
      state.login = true
    }
  },
  actions: {
    async login ({commit}, payload ) {
      commit('SET_LOADING_STATUS', 'loading')
      await Axios.get('http://localhost:3000/destinos')
            .then(function (response) {
              commit('SET_DESTINOS', response.data)
            }).catch(function(error) {
                
                if(error.response){console.log(error)}
            });
      commit('SET_TAQUILLA', payload.taquilla)
      commit('SET_USUARIO', payload.usuario)
      commit('SET_LOGIN')
      console.log(this.state.destinos[0].id)
    },
  }
})
