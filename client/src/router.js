import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Ventas from './views/Ventas.vue'
import Despachos from './views/Despachos.vue'
import Cierres from './views/Cierres.vue'
import Consultas from './views/Consultas.vue'
import Remesas from './views/Remesas.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/ventas',
      name: 'ventas',
      component: Ventas
    },
    {
      path: '/despachos',
      name: 'despachos',
      component: Despachos
    },
    {
      path: '/cierres',
      name: 'cierres',
      component: Cierres
    },
    {
      path: '/consultas',
      name: 'consultas',
      component: Consultas
    },
    {
      path: '/remesas',
      name: 'remesas',
      component: Remesas
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
