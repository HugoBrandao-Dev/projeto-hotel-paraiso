<template>
  <header id="cabecalho">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand is-flex is-align-items-center">
        <router-link to="/">
          <img src="../../assets/logo.png" alt="Hotel Paraíso">
        </router-link>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="menu">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="menu" class="navbar-menu">
        <div class="navbar-end">
          <a 
            v-for="item in routes.user" 
            :key="item.router"
            :href="item.router"
            class="navbar-item"
          >
            {{ item.name }}
          </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Administração
            </a>
            <div class="navbar-dropdown is-boxed">
              <a v-for="item in routes.admin"
                :key="item.router" 
                :href="item.router"
                class="navbar-item" 
              >
                <i :class="item.iconClass" aria-hidden="true"></i>
                <span>{{ item.name }}</span>
              </a>
              <hr class="dropdown-divider">
              <a href="/admin/apartments" class="dropdown-item">
                <i class="fas fa-tools mr-2" aria-hidden="true"></i>
                <span>Apartamentos</span>
              </a>
            </div>
          </div>
          
          <div class="navbar-item">
            <button
              id="btn-login" 
              type="button" 
              class="navbar-item button" 
              @click="openLoginModal()"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="modal" :class="{'is-active': modals.login.active}">
      <div class="modal-background" @click="closeLoginModal()"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Login</p>
          <button class="delete" aria-label="close" @click="closeLoginModal()"></button>
        </header>
        <section class="modal-card-body">
          <form id="form-login">
            <div class="field">
              <div class="control has-icons-left has-icons-right">
                <input 
                  class="input"
                  :class="{'is-danger': forms.login.iptEmail.hasError}"
                  type="email"
                  placeholder="Email"
                  v-model="forms.login.iptEmail.value"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
                <span class="icon is-small is-right" v-show="forms.login.iptEmail.hasError">
                  <i class="fas fa-exclamation-triangle"></i>
                </span>
              </div>
              <p class="help is-danger" v-show="forms.login.iptEmail.hasError">
                {{ forms.login.iptEmail.error }}
              </p>
            </div>
            <div class="field">
              <div class="control has-icons-left has-icons-right">
                <input 
                  class="input"
                  :class="{'is-danger': forms.login.iptPassword.hasError}"
                  type="password"
                  placeholder="Senha"
                  v-model="forms.login.iptPassword.value"
                />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
                <span class="icon is-small is-right" v-show="forms.login.iptPassword.hasError">
                  <i class="fas fa-exclamation-triangle"></i>
                </span>
              </div>
              <p class="help is-danger" v-show="forms.login.iptPassword.hasError">
                {{ forms.login.iptPassword.error }}
              </p>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button id="btn-access" class="button" @click="login()">Entrar</button>
          <a id="btn-cadastrar" class="button" href="/cadastro">Cadastrar</a>
        </footer>
      </div>
    </div>
  </header>
</template>
<script>
  import validator from 'validator'
  import axios from 'axios'
  import Endpoints from '../../tools/EndpointsConfig'

  export default {
    data() {
      return {
        isLogged: false,
        isClient: false,
        modals: {
          login: {
            active: false
          }
        },
        routes: {
          user: [
            {
              name: 'Home',
              router: '/'
            },
            {
              name: 'Sobre',
              router: '/sobre'
            },
            {
              name: 'Apartamentos',
              router: '/apartamentos'
            },
            {
              name: 'Contato',
              router: '/contato'
            },
            {
              name: 'Minhas reservas',
              router: '/user/reservas'
            }
          ],
          admin: [
            {
              name: 'Usuários',
              iconClass: 'fas fa-users mr-2',
              router: '/admin/users'
            },
            {
              name: 'Reservas',
              iconClass: 'fas fa-hotel mr-2',
              router: '/admin/reservas'
            }
          ]
        },
        forms: {
          login: {
            hasErrors: false,
            iptEmail: {
              value: '',
              hasError: false,
              error: ''
            },
            iptPassword: {
              value: '',
              hasError: false,
              error: ''
            }
          }
        }
      }
    },
    methods: {
      isValidEmail() {
        return validator.isEmail(this.forms.login.iptEmail.value)
      },
      isValidPassword() {
        return validator.isStrongPassword(this.forms.login.iptPassword.value)
      },
      setError(field, msg) {
        this.forms.login.hasErrors = true
        this.forms.login[field].hasError = true
        this.forms.login[field].error = msg
      },
      clearErrorFields() {
        this.forms.login.hasErrors = false

        this.forms.login.iptEmail.hasError = false
        this.forms.login.iptEmail.error = ''

        this.forms.login.iptPassword.hasError = false
        this.forms.login.iptPassword.error = ''
      },
      clearFields() {
        this.forms.login.hasErrors = false
        this.forms.login.iptEmail.value = ''
        this.forms.login.iptPassword.value = ''
      },
      openLoginModal() {
        this.modals.login.active = true
      },
      closeLoginModal() {
        this.clearFields()
        this.clearErrorFields()
        this.modals.login.active = false
      },
      login() {
        this.clearErrorFields()

        if (!this.isValidEmail()) {
          this.setError('iptEmail', 'Email inválido.')
        }

        if (!this.isValidPassword()) {
          this.setError('iptPassword', 'Senha inválida.')
        }

        if (!this.forms.login.hasErrors) {

          const login = {
            email: this.forms.login.iptEmail.value,
            password: this.forms.login.iptPassword.value
          }

          axios.post(Endpoints.POST_LOGIN(), login)
            .then(res => {
              localStorage.setItem('token_hotel_paraiso', res.data.token)
              this.clearFields()
              this.closeLoginModal()
            })
            .catch(error => {
              error.response.data.RestException.ErrorFields.map(item => {
                this.setError(item.field, item.hasError.error)
              })
            })
        } else {
          console.error('Formulário inválido.')
        }
      }
    }
  }
</script>
<style scoped>
  #cabecalho {
    background-color: #fff;
    width: 100%;
    /* Para ficar em cima do hero */
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px 50px;
  }

  #cabecalho img {
    width: 200px;
  }

  /* Modal de login */

  #btn-access {
    color: #fff;
    background-color: #c3c63b;
    border-color: #c3c63b;
  }

  #btn-cadastrar, #btn-login {
    background-color: #fff;
    color: #c3c63b;
    border-color: #c3c63b;
  }

  #btn-login {
    transition-delay: 0.01s;
    transition-duration: 0.1s;
    transition-timing-function: linear;
  }

  #btn-login:hover {
    color: #fff;
    background-color: #c3c63b;
    border-color: #c3c63b;
  }

  @media screen and (max-width: 700px) {
    #cabecalho {
      padding: 4% 6%;
    }
  }
</style>