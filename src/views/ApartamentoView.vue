<template>
  <article id="reserva" class="content-article">
    <h1>Apartamento</h1>
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
            <p class="title">Apartamento #{{ this.$route.params.id }}</p>
            <div class="field">
              <label class="label">Andar:</label>
              <div class="control">
                6º
              </div>
            </div>
            <div class="field">
              <label class="label">Nº:</label>
              <div class="control">
                22
              </div>
            </div>
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
            <div class="columns mt-3">
              <div class="field column is-half">
                <label class="label">Início da estadia:</label>
                <div class="control">
                  <input id="iptMinDate" type="date" class="input">
                </div>
              </div>
              <div class="field column">
                <label class="label">Fim da estadia:</label>
                <div class="control">
                  <input id="iptMaxDate" type="date" class="input">
                </div>
              </div>
            </div>
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
  export default {
    mounted() {
      let iptMinDate = document.getElementById('iptMinDate')
      iptMinDate.value = this.defineMinDateTime()
    },
    methods: {
      // Define o dia e hora mínima para a reserva.
      defineMinDateTime() {
        let myData = new Date()

        // DATA
        let dia = myData.getDate()
        let mes = myData.getMonth() + 1

        // Adiciona um '0' caso o mês seja menor que 10
        if (dia < 10) {
          dia = '0' + dia
        }

        // Adiciona um '0' caso o mês seja menor que 10
        if (mes < 10) {
          mes = '0' + mes
        }

        let ano = myData.getFullYear()

        return `${ ano }-${ mes }-${ dia }`
      }
    }
  }
</script>

<style scoped>
  
</style>