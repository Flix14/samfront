import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Searching from '../views/Searching.vue'
import NotFound from '../views/NotFound.vue'
import Estadisticas from '../views/Estadisticas.vue'
import Success from '../views/Success.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/searching',
    name: 'Searching',
    component: Searching
  },
  {
    path: '/notfound',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/success',
    name: 'Success',
    component: Success
  },
  {
    path: '/estadisticas',
    name: 'Estadisticas',
    component: Estadisticas
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
