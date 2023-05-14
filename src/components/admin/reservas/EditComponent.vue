<template>
  <article id="reserva-edit">
    <h1>Edição de informações</h1>
    <hr>
    <div class="tabs is-toggle">
      <ul>
        <li :class="{'is-active': getRouter == 'Ocupante'}">
          <router-link :to="{ name: 'Ocupante' }">
            <span>Ocupante</span>
          </router-link>
        </li>
        <li :class="{'is-active': getRouter == 'Comodos'}">
          <router-link :to="{ name: 'Comodos' }">
            <span>Cômodos</span>
          </router-link>
        </li>
      </ul>
    </div>
    <section id="selecao" class="container">
      <router-view />
    </section>
  </article>
</template>

<script>
  export default {
    computed: {
      getRouter() {
        return this.$route.name
      }
    }
  }
</script>

<style scoped>
  
</style>