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
              <p class="control has-icons-left">
                <input class="input" type="email" placeholder="Email">
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </p>
            </div>
            <div class="field">
              <p class="control has-icons-left">
                <input class="input" type="password" placeholder="Password">
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </p>
            </div>
          </form>
        </section>
        <footer class="modal-card-foot">
          <button id="btn-access" class="button">Entrar</button>
          <a id="btn-cadastrar" class="button" href="/cadastro">Cadastrar</a>
        </footer>
      </div>
    </div>
  </header>
</template>
<script>
  export default {
    data() {
      return {
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
              name: 'Reservas',
              router: '/reservas'
            },
            {
              name: 'Contato',
              router: '/contato'
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
        modals: {
          login: {
            active: false
          }
        }
      }
    },
    methods: {
      openLoginModal() {
        this.modals.login.active = true
      },
      closeLoginModal() {
        this.modals.login.active = false
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