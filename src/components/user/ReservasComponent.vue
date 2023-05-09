<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Reservas</p>
    </header>
    <div class="card-content">
      <div class="box" v-for="cont in 3" :key="cont">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img src="../../assets/reservas/reserva64.png" alt="Image">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>Apartamento</strong><br><small>Reserva de 4 dias</small>
                <br>
                Início da estadia: 00-00-0000 <br>
                Fim da estadia: 00-00-0000
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-left">
                <a class="level-item" aria-label="reply" title="Compartilhar">
                  <span class="icon is-small">
                    <i class="fas fa-reply" aria-hidden="true"></i>
                  </span>
                </a>
                <router-link 
                  :to="{
                    name: 'UserReserva',
                    params: {
                      id: cont
                    }
                  }"
                  class="button is-small is-info is-outlined">Detalhes</router-link>
              </div>
            </nav>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  
</style>