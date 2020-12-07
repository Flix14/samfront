import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ip: null,
    status: 0,
    longitud: null,
    latitud: null,
    arrayEstadisticas: [],
    alertas: false,
  },
  getters: {
    alertas: state => {
      return state.alertas
    },
    ip: state => {
      return state.ip
    },
    status: state => {
      return state.status
    },
    longitud: state => {
      return state.longitud
    },
    latitud: state => {
      return state.latitud
    },
    arrayEstadisticas: state => {
      return state.arrayEstadisticas
    },
  },
  mutations: {
    setAlertas(state, alertas) {
      state.alertas = alertas
    },
    setIp(state, ip) {
      state.ip = ip
    },
    setStatus(state, status) {
      state.status = status
    },
    setLatitud(state, latitud) {
      state.latitud = latitud
    },
    setLongitud(state, longitud) {
      state.longitud = longitud
    },
    addEstadistica(state, row) {
      state.arrayEstadisticas.push(row)
    },
  },
  plugins: [new VuexPersistence().plugin]
})
