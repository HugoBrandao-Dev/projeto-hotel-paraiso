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
<style scoped></style>