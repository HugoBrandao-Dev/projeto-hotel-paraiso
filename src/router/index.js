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

// Rotas do Admin para o usuários
import UsersComponent from '../components/admin/users/UsersComponent'
import InfoComponent from '../components/admin/users/InfoComponent'
import EditComponent from '../components/admin/users/EditComponent'

// Rotas do Admin para o reservas
import AdminReservasComponent from '../components/admin/reservas/ReservasComponent'
import AdminReservaComponent from '../components/admin/reservas/ReservaComponent'
import AdminReservaEditComponent from '../components/admin/reservas/EditComponent'
import AdminNewReservaComponent from '../components/admin/reservas/NewReservaComponent'
import ComodosComponent from '../components/admin/reservas/ComodosComponent'
import OcupanteComponent from '../components/admin/reservas/OcupanteComponent'

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
    children: [
      {
        path: 'users',
        name: 'Users',
        component: UsersComponent
      },
      {
        path: 'user/:id',
        name: 'UserInfo',
        component: InfoComponent
      },
      {
        path: 'user/edit/:id',
        name: 'UserEdit',
        component: EditComponent
      },
      {
        path: 'reservas',
        name: 'Reservas_admin',
        component: AdminReservasComponent
      },
      {
        path: 'reserva/:id',
        name: 'Reserva_admin',
        component: AdminReservaComponent
      },
      {
        path: 'reservas/new',
        name: 'NewReserva_admin',
        component: AdminNewReservaComponent
      },
      {
        path: 'reserva/edit/:id',
        name: 'ReservaEdit_admin',
        component: AdminReservaEditComponent,
        children: [
          {
            path: 'comodos',
            name: 'Comodos',
            component: ComodosComponent
          },
          {
            path: 'ocupante',
            name: 'Ocupante',
            component: OcupanteComponent
          }
        ]
      },

    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
