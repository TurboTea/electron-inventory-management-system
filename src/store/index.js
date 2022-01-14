import Vue from 'vue'
import Vuex from 'vuex'
import {ipcRenderer} from "electron";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: [],
    auth_login: false,

  },

  getters: {
    authenticated(state){
        return state.auth_login && state.userInfo
    },
    user(state){
        return state.userInfo
    }
 },

  mutations: {
    account_sign_in (state, params) {

      ipcRenderer.send('userInfo:load', params),
      ipcRenderer.on('userInfo:get', (e, userInfo) => {
      state.userInfo = JSON.parse(userInfo)
      localStorage.setItem('userInfo', userInfo)
      
      })
      state.auth_login = true
    },

    


    account_sign_out (state) {
      //console.log('Store sign out');

      localStorage.removeItem('userInfo')

      // localStorage.setItem('auth_login', false)
      state.auth_login = false
    }
  },
  actions: {
    async attempt({ commit, state }, token){
      if (token){
        state.userInfo = token
        state.auth_login = true

      }
      if (!state.token) {
          return
      }
      
  },

  }
})