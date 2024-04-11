import Vue from 'vue'
import VueCarousel from 'vue-carousel'
import App from './App.vue'
import router from './router'

Vue.use(VueCarousel)

// Import do framework Bulma
import './../node_modules/bulma/css/bulma.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
