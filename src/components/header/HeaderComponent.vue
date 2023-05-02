<template>
  <header id="cabecalho">
    <router-link to="/">
      <img src="../../assets/logo.png" alt="Hotel Paraíso">
    </router-link>

    <nav>
      <li v-for="item in routes" :key="item">
        <a :href="item.toLowerCase()">{{ item }}</a>
      </li>
    </nav>
  </header>
</template>
<script>
  export default {
    data() {
      return {
        routes: [
          'Home',
          'Sobre',
          'Reservas',
          'Contato'
        ]
      }
    }
  }
</script>
<style scoped></style>