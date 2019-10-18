import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: true,
    loadingStatus: 'notLoading',
    taquilla: '',
    destinos:[''],
    usuario:'',
    idsDestinos: [],
    stringDestinos: [],
    defaultOrigen: '',
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
    },
    SET_ID_DESTINOS(state, destinos){
      state.idsDestinos = destinos
    },
    SET_STRING_DESTINOS(state, destinos){
      state.stringDestinos = destinos
    }
  },
  actions: {
    async login ({commit}, payload ) {
      commit('SET_LOADING_STATUS', 'loading')
      commit('SET_TAQUILLA', payload.taquilla)
      await Axios.get('http://localhost:3000/destinos')
            .then(function (response) {
              var stringsDestino = []
              var idsDestino = []
              var preDestinos =['']
              for (let index = 0; index < response.data.length; index++) { 
                stringsDestino.push(''+response.data[index].id + ' - ' + response.data[index].nombre)
                idsDestino.push(response.data[index].id)
                preDestinos.push({value: idsDestino[index], text: stringsDestino[index]}) 
              }
              commit('SET_DESTINOS', preDestinos)
              commit('SET_ID_DESTINOS', idsDestino)
              commit('SET_STRING_DESTINOS', stringsDestino)
            }).catch(function(error) {
                
                if(error.response){console.log(error)}
            });  
      commit('SET_USUARIO', payload.usuario)
      commit('SET_LOGIN')  
    },
  }
})
