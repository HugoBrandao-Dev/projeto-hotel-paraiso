<template>
  <article id="reserva" class="mt-5 content-article">
    <h1>Reserva</h1>
    <hr>
    <div class="columns">
      <section class="column is-half">
        <div class="card">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="../assets/reservas/reserva.png" alt="Placeholder image">
          </figure>
        </div>
      </div>
      </section>
      <section class="column">
        <div class="card">
          <div class="card-content">
            <p class="title">Reserva #{{ this.$route.params.id }}</p>
            <p class="is-size-4">6 Cômodos:</p>
            <p class="is-size-5 ml-3">1 Sala(s) de estar.
              <span class="tag is-info is-light is-rounded"><i class="fas fa-info"></i></span>
            </p>
            <p class="is-size-5 ml-3">3 Quarto(s).
              <span class="tag is-info is-light is-rounded"><i class="fas fa-info"></i></span>
            </p>
            <p class="is-size-5 ml-3">2 Banheiro(s).
              <span class="tag is-info is-light is-rounded"><i class="fas fa-info"></i></span>
            </p>
            <p class="is-size-5 ml-3">1 Cozinha(s).
              <span class="tag is-info is-light is-rounded"><i class="fas fa-info"></i></span>
            </p>
            <p class="is-size-5 ml-3">1 Pet room(s).
              <span class="tag is-info is-light is-rounded"><i class="fas fa-info"></i></span>
            </p>
            <p class="is-size-5 ml-3">1 Play room(s).
              <span class="tag is-info is-light is-rounded"><i class="fas fa-info"></i></span>
            </p>
          </div>
          <footer class="card-footer">
            <button class="button is-success is-light card-footer-item">
              Reservar
            </button>
            <button class="button is-info is is-light card-footer-item">
              Compartilhar
            </button>
          </footer>
        </div>
      </section>
    </div>
  </article>
</template>

<script>
  
</script>

<style scoped>
  
</style>