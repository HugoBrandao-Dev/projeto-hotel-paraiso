<template>
  <article id="user" class="mt-5 content-article">
    <h1>Usuário</h1>
    <hr>
    <div class="columns mt-3">
      <aside class="card menu column is-one-quarter is-align-self-flex-start">
        <div class="card-content">
          <p class="menu-label">OPÇÕES</p>
          <ul class="menu-list">
            <li>
              <router-link to="/user/account" class="is-size-5">Conta</router-link>
            </li>
            <li>
              <router-link to="/user/reservas" class="is-size-5">Reservas</router-link>
            </li>
          </ul>
        </div>
      </aside>
      <div class="column">
        <router-view />
      </div>
    </div>
  </article>
</template>

<script>
  export default {

  }
</script>

<style scoped>
</style>