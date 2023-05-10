<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Reserva #{{ this.$route.params.id }}
      </p>
    </header>

    <!-- Criar carousel das imagens do local -->

    <div class="card-image">
      <figure class="image is-4by3">
        <img src="../../assets/reservas/reserva.png" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content">
      <div class="content">
        <article class="message is-info">
          <div class="message-header">
            Estadia:
          </div>
          <div class="message-body">
            <div class="field">
              <label class="label">Início da estadia:</label>
              <div class="control">
                00-00-0000
              </div>
            </div>
            <div class="field">
              <label class="label">Fim da estadia:</label>
              <div class="control">
                00-00-0000
              </div>
            </div>
            <div class="field">
              <label class="label">Tempo total da estadia:</label>
              <div class="control">
                5 dias
              </div>
            </div>
            <div class="field">
              <label class="label">Custo total da estadia:</label>
              <div class="control">
                R$ 500,00
              </div>
            </div>
            <div class="field">
              <label class="label">Forma de pagamento:</label>
              <div class="control">
                5 x R$ 100,00 no Cartão de Crédito
              </div>
            </div>
            <br>
            <div class="field">
              <label class="label">Estadia solicitada em:</label>
              <div class="control">
                <time datetime="2016-1-1 11:09">11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
            <div class="field">
              <label class="label">Valor da diária:</label>
              <div class="control">
                R$ 100,00
              </div>
            </div>
          </div>
        </article>
        <article class="message is-info">
          <div class="message-header">
            Solicitante:
          </div>
          <div class="message-body">
            <div class="field">
              <label class="label">Nome:</label>
              <div class="control">
                Tobias de Oliveira
              </div>
            </div>
            <div class="field">
              <label class="label">CPF:</label>
              <div class="control">
                000.000.000-00
              </div>
            </div>
          </div>
        </article>
        <article class="message is-info">
          <div class="message-header">
            Acomodação:
          </div>

          <div class="message-body">
            <div class="field">
              <label class="label">Andar:</label>
              <div class="control">
                6º
              </div>
            </div>
            <div class="field">
              <label class="label">Nº do apartamento:</label>
              <div class="control">
                22
              </div>
            </div>
            <ul><span class="is-size-4">6 cômodos</span>
              <li>1 sala de estar.</li>
              <li>2 quartos.</li>
              <li>1 banheiro.</li>
              <li>1 play room.</li>
              <li>1 cozinha.</li>
            </ul>
          </div>
        </article>
      </div>
    </div>
    <footer class="card-footer">
      <button class="button is-primary is-light card-footer-item" @click="openModalEstadia()">Modificar estadia</button>
      <button class="button is-danger is-light card-footer-item" @click="closeModalEstadia()">Cancelar estadia</button>
    </footer>
    <div class="modal" :class="{'is-active': modals.modificarEstadia.active}">
      <div class="modal-background" @click="closeModalEstadia()"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Modificar estadia</p>
          <button class="delete" aria-label="close" @click="closeModalEstadia()"></button>
        </header>
        <section class="modal-card-body">
          <div class="columns">
            <div class="field column is-half">
              <label class="label">Início da estadia:</label>
              <div class="control">
                <input class="input" type="datetime-local">
              </div>
            </div>
            <div class="field column">
              <label class="label">Fim da estadia:</label>
              <div class="control">
                <input class="input" type="datetime-local">
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Salvar mudança</button>
          <button class="button is-danger" @click="closeModalEstadia()">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        modals: {
          modificarEstadia: {
            active: false
          }
        }
      }
    },
    methods: {
      openModalEstadia() {
        this.modals.modificarEstadia.active = true
      },
      closeModalEstadia() {
        this.modals.modificarEstadia.active = false
      }
    }
  }
</script>

<style scoped>
  
</style>