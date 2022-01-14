import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './plugins/i18n'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

store.dispatch('attempt', localStorage.getItem('userInfo')).then(() => {
new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App),
  
}).$mount('#app')
})