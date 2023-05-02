<template>
  <header id="cabecalho">
    <router-link to="/">
      <img src="../../assets/logo.png" alt="Hotel Paraíso">
    </router-link>

    <nav>
      <li v-for="item in Object.keys(routes)" :key="item">
        <router-link :to="routes[item].router">{{ item }}</router-link>
      </li>
    </nav>
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
</style>