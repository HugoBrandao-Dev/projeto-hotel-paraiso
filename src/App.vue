<template>
  <div id="app">
    <HeaderComponent @validateToken="validateToken()" />
    <main>
      <router-view />
    </main>
    <NewsletterComponent />
    <FooterComponent />
  </div>
</template>

<script>
  import axios from 'axios'
  import EventBus from './EventBus'
  import Endpoints from './tools/EndpointsConfig'

  // Components
  import HeaderComponent from './components/header/HeaderComponent'
  import NewsletterComponent from './components/newsletter/NewsletterComponent'
  import FooterComponent from './components/footer/FooterComponent'

  export default {
    components: {
      HeaderComponent,
      NewsletterComponent,
      FooterComponent
    },
    created() {
      this.configDataTargets()
      this.configDropdowns()
      this.validateToken()
    },
    data() {
      return {
        userAccount: {
          isLogged: false,
          isClient: false,
          _links: []
        }
      }
    },
    methods: {
      /*
      Método que linka os dropdown com os elementos que serão exibidos quando um dado dropdown é 
      clicado.
      */
      configDropdowns() {
        document.addEventListener('DOMContentLoaded', () => {
          const $dropdowns = Array.prototype.slice.call(document.querySelectorAll('.dropdown'), 0);
          $dropdowns.forEach( el => {
            el.addEventListener('click', function() {
              el.classList.toggle('is-active');
            });
          });

        });
      },
      /* 
      Método que linka os botões com os elementos que serão exibidos quando um dado botão é clicado.
      */
      configDataTargets() {
        document.addEventListener('DOMContentLoaded', () => {

          // Get all "navbar-burger" elements
          const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

          // Add a click event on each of them
          $navbarBurgers.forEach( el => {
            el.addEventListener('click', () => {

              // Get the target from the "data-target" attribute
              const target = el.dataset.target;
              const $target = document.getElementById(target);

              // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
              el.classList.toggle('is-active');
              $target.classList.toggle('is-active');

            });
          });

        });
      },
      async validateToken() {
        try {
          let token = localStorage.getItem('token_hotel_paraiso') || ''

          if (token) {
            let axiosConfig = {
              headers: {
                Authorization: `Bearer ${ token }`
              }
            }

            try {
              const responseValidate = await axios.post(Endpoints.POST_VALIDATE(), {}, axiosConfig)
              this.userAccount.isLogged = true
              this.userAccount.isClient = responseValidate.data.isClient
              this.userAccount._links = responseValidate.data._links
              EventBus.$emit('userAccount', this.userAccount)
            } catch (errorResponseValidate) {
              localStorage.removeItem('token_hotel_paraiso')
            }
          }
        } catch (error) {
          console.error(error)
        }
      },
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    font-size: 100%;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
  }

  nav, ul {
    list-style: none;
  }

  a {
    text-decoration: none;
    cursor: pointer;
    opacity: 0.9;
  }

  a:hover {
    opacity: 1;
  }

  /* PÁGINAS INICIAIS PARA OS ENDPOINTS */

  .content-article {
    padding: 100px 50px;
  }

  .content-article h1 {
    font-size: 2.5rem;
    color: #191c03;
  }

  .content-article hr {
    width: 200px;
    height: 2px;
    background-color: #c3c63b;
    border: none;
    margin: 35px 0;
    width: 50%;
    margin: 10px 0;
  }

  @media screen and (max-width: 700px) {
    .content-article {
      margin-top: 80px;
      padding: 4% 6%;
    }
  }
</style>
