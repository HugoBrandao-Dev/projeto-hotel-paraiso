import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SobreView from '../views/SobreView.vue'
import ReservasView from '../views/ReservasView.vue'
import ContatoView from '../views/ContatoView.vue'
import CadastroView from '../views/CadastroView.vue'
import ReservaView from '../views/ReservaView.vue'

// Rotas do usuário (logado).
import UserView from '../views/user/UserView.vue'
import AccountComponent from '../components/user/AccountComponent'
import UpdateComponent from '../components/user/UpdateComponent'
import ReservasComponent from '../components/user/ReservasComponent'
import ReservaComponent from '../components/user/ReservaComponent'

// Rotas do Adminstrador.
import AdminView from '../views/admin/AdminView.vue'

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
    path: '/reserva/:id',
    name: 'Reserva',
    component: ReservaView
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
  },
  {
    path: '/user',
    name: 'User',
    component: UserView,
    children: [
      {
        path: 'account',
        name: 'UserAccount',
        component: AccountComponent
      },
      {
        path: 'update',
        name: 'UserUpdate',
        component: UpdateComponent
      },
      {
        path: 'reservas',
        name: 'UserReservas',
        component: ReservasComponent
      },
      {
        path: 'reserva/:id',
        name: 'UserReserva',
        component: ReservaComponent
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminView,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
