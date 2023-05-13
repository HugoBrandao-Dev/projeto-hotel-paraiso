<template>
  <article id="reserva-edit">
    <h1>Edição de informações</h1>
    <hr>
    <div class="tabs is-toggle">
      <ul>
        <li class="is-active">
          <a>
            <span>Cômodos</span>
          </a>
        </li>
        <li>
          <a>
            <span>Ocupante</span>
          </a>
        </li>
      </ul>
    </div>
    <section id="selecao" class="container">
      <router-view />
    </section>
  </article>
</template>

<script>
  
</script>

<style scoped>
  
</style>