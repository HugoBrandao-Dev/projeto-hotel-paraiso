import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SobreView from '../views/SobreView.vue'
import ApartamentosView from '../views/ApartamentosView.vue'
import ContatoView from '../views/ContatoView.vue'
import CadastroView from '../views/CadastroView.vue'
import ApartamentoView from '../views/ApartamentoView.vue'

// Rotas do usuário (logado).
import UserView from '../views/user/UserView.vue'
import AccountComponent from '../components/user/AccountComponent'
import UpdateComponent from '../components/user/UpdateComponent'
import ReservasComponent from '../components/user/ReservasComponent'
import ReservaComponent from '../components/user/ReservaComponent'

/* ################## ROTAS DO ADMINSTRADOR ################## */

import AdminView from '../views/admin/AdminView.vue'

// Rotas do Admin para o usuário
import UsersComponent from '../components/admin/users/UsersComponent'
import InfoComponent from '../components/admin/users/InfoComponent'
import EditComponent from '../components/admin/users/EditComponent'

// Rotas do Admin para a reserva
import AdminReservasComponent from '../components/admin/reservas/ReservasComponent'
import AdminReservaComponent from '../components/admin/reservas/ReservaComponent'
import AdminReservaEditComponent from '../components/admin/reservas/EditComponent'
import AdminNewReservaComponent from '../components/admin/reservas/NewReservaComponent'

// Rotas AVANÇADAS para apartamentos.
import ApartmentsComponent from '../components/admin/apartments/ApartmentsComponent'
import ApartmentComponent from '../components/admin/apartments/ApartmentComponent'
import NewApartmentComponent from '../components/admin/apartments/NewApartmentComponent'
import EditApartmentComponent from '../components/admin/apartments/EditApartmentComponent'

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
    path: '/apartamentos',
    name: 'Apartamentos',
    component: ApartamentosView
  },
  {
    path: '/apartamentos/:id',
    name: 'Apartamento',
    component: ApartamentoView
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
      },
      {
        path: 'apartments',
        name: 'Apartments_admin',
        component: ApartmentsComponent
      },
      {
        path: 'apartments/new',
        name: 'NewApartment_admin',
        component: NewApartmentComponent
      },
      {
        path: 'apartment/:id',
        name: 'Apartment_admin',
        component: ApartmentComponent
      },
      {
        path: 'apartment/edit/:id',
        name: 'ApartmentEdit_admin',
        component: EditApartmentComponent
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
