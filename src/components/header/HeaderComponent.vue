<template>
  <header id="cabecalho">
    <router-link to="/">
      <img src="../../assets/logo.png" alt="Hotel Paraíso">
    </router-link>

    <nav>
      <li v-for="item in Object.keys(routes)" :key="item">
        <router-link :to="routes[item].router">{{ item }}</router-link>
      </li>
      <li>
        <button 
          id="btn-login" 
          type="button" 
          class="button is-small" 
          @click="openLoginModal()"
        >
          Login
        </button>
      </li>
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
          <button id="btn-cadastrar" class="button">Cadastrar</button>
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
          'Home': {
            router: '/'
          },
          'Sobre': {
            router: 'sobre'
          },
          'Reservas': {
            router: 'reservas'
          },
          'Contato': {
            router: 'contato'
          }
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
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 50px;
  }

  #cabecalho img {
    width: 200px;
  }

  #cabecalho nav {
    display: flex;
  }

  #cabecalho nav li {
    margin: 0 15px;
  }

  #cabecalho nav li:first-child {
    margin-left: 0;
  }

  #cabecalho nav li:last-child {
    margin-right: 0;
  }

  #cabecalho nav li a {
    color: #191c03;
  }

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
      flex-direction: column;
    }
    #cabecalho img {
      margin-bottom: 15px;
    }
  }
</style>