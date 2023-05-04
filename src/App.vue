<template>
  <div id="app">
    <HeaderComponent />
    <main>
      <router-view />
    </main>
    <NewsletterComponent />
    <FooterComponent />
  </div>
</template>

<script>
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
    },
    methods: {
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
      }
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
</style>
