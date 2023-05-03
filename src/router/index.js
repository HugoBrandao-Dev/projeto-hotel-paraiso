import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SobreView from '../views/SobreView.vue'
import ReservasView from '../views/ReservasView.vue'
import ContatoView from '../views/ContatoView.vue'
import CadastroView from '../views/CadastroView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/sobre',
    name: 'Sobre',
    component: SobreView
  },
  {
    path: '/reservas',
    name: 'Reservas',
    component: ReservasView
  },
  {
    path: '/contato',
    name: 'Contato',
    component: ContatoView
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: CadastroView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
