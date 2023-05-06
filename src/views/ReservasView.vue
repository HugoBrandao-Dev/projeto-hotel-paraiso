<template>
  <article id="reservas" class="mt-5 content-article">
    <h1>Reservas</h1>
    <hr>
    <div class="columns">
      <form class="filtro column is-one-third is-align-self-flex-start">
        <div class="card">
          <div class="card-content">
            <p class="title">Filtros</p>
              <div class="columns">
                <div class="field column is-half">
                  <label class="label">Tipo:</label>
                  <div class="control">
                    <div class="select">
                      <select>
                        <option checked>Apartamento</option>
                        <option>Casa</option>
                      </select>
                    </div>
                  </div>
                  <!-- <p class="help">This is a help text</p> -->
                </div>
                <div class="field column">
                  <label class="label">Cômodos:</label>
                  <div class="control">
                    <div class="select">
                      <select>
                        <option checked>4</option>
                        <option>6</option>
                      </select>
                    </div>
                  </div>
                  <!-- <p class="help">This is a help text</p> -->
                </div>
              </div>
              <div class="field">
                <label class="label">Aceita animais?</label>
                <div class="control">
                  <label class="radio">
                    <input type="radio" name="animais">
                    Sim
                  </label>
                  <label class="radio">
                    <input type="radio" name="animais" checked>
                    Não
                  </label>
                </div>
              </div>
          </div>
          <footer class="card-footer">
            <button class="button is-ghost card-footer-item">
              Aplicar
            </button>
            <button class="button is-ghost card-footer-item">
              Limpar
            </button>
          </footer>
        </div>
      </form>
      <div class="lista-reservas column columns is-flex is-flex-wrap-wrap">
        <div class="tile is-parent column is-one-third">
          <article class="tile is-child box">
            <figure class="image is-16by9">
              <img src="../assets/reservas/reserva.png">
            </figure>
            <p class="title is-6 mt-2">Diária: R$200,00</p>
              <button class="button is-info is-light">Acessar</button>
          </article>
        </div>
        <div class="tile is-parent column is-one-third">
          <article class="tile is-child box">
            <figure class="image is-16by9">
              <img src="../assets/reservas/reserva.png">
            </figure>
            <p class="title is-6 mt-2">Diária: R$200,00</p>
              <button class="button is-info is-light">Acessar</button>
          </article>
        </div>
        <div class="tile is-parent column is-one-third">
          <article class="tile is-child box">
            <figure class="image is-16by9">
              <img src="../assets/reservas/reserva.png">
            </figure>
            <p class="title is-6 mt-2">Diária: R$200,00</p>
              <button class="button is-info is-light">Acessar</button>
          </article>
        </div>
        <div class="tile is-parent column is-one-third">
          <article class="tile is-child box">
            <figure class="image is-16by9">
              <img src="../assets/reservas/reserva.png">
            </figure>
            <p class="title is-6 mt-2">Diária: R$200,00</p>
              <button class="button is-info is-light">Acessar</button>
          </article>
        </div>
        <div class="tile is-parent column is-one-third">
          <article class="tile is-child box">
            <figure class="image is-16by9">
              <img src="../assets/reservas/reserva.png">
            </figure>
            <p class="title is-6 mt-2">Diária: R$200,00</p>
              <button class="button is-info is-light">Acessar</button>
          </article>
        </div>
        <div class="tile is-parent column is-one-third">
          <article class="tile is-child box">
            <figure class="image is-16by9">
              <img src="../assets/reservas/reserva.png">
            </figure>
            <p class="title is-6 mt-2">Diária: R$200,00</p>
              <button class="button is-info is-light">Acessar</button>
          </article>
        </div>
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