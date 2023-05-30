<template>
  <article id="reservas" class="content-article">
    <h1>Reservas</h1>
    <hr>
    <div class="columns">
      <form class="filtro column is-one-third is-align-self-flex-start">
        <div class="card">
          <div class="card-content">
            <p class="title">Filtros</p>
              <div class="columns">
                <div class="field column">
                  <label class="label">Cômodos: {{ forms.filter.iptRooms.value }}</label>
                  <div class="control">
                    <div 
                      class="select is-small"
                      :class="{'is-danger': forms.filter.iptRooms.hasError}"
                    >
                      <select
                        v-model="forms.filter.iptRooms.value"
                      >
                        <option 
                          v-for="item in roomsList" 
                          :key="item" 
                          :value="item"
                        >
                          {{ item }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <p class="help is-danger" v-show="forms.filter.iptRooms.hasError">
                    {{ forms.filter.iptRooms.error }}
                  </p>
                </div>
              </div>
              <div class="columns">
                <div class="field column is-half">
                  <label class="label">Menor diária:</label>
                  <div class="control">
                    <input 
                      class="input is-small"
                      :class="{'is-danger': forms.filter.iptLowerDailyRate.hasError}"
                      type="number"
                      placeholder="100"
                      v-model="forms.filter.iptLowerDailyRate.value"
                    />
                  </div>
                  <p class="help is-danger" v-show="forms.filter.iptLowerDailyRate.hasError">
                    {{ forms.filter.iptLowerDailyRate.error }}
                  </p>
                </div>
                <div class="field column">
                  <label class="label">Maior diária:</label>
                  <div class="control">
                    <input 
                      class="input is-small" 
                      type="number" 
                      placeholder="500"
                      v-model="forms.filter.iptHighestDailyRate.value"
                    />
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
        <div v-for="cont in 7" :key="cont" class="tile is-parent column is-one-third">
          <article class="tile is-child box">
            <figure class="image is-16by9">
              <img src="../assets/reservas/reserva.png">
            </figure>
            <p class="title is-6 mt-2">Diária: R$200,00</p>
              <router-link 
                :to="{ name: 'Reserva', params: { id: cont } }"
                class="button is-info is-light"
              >
                Acessar
              </router-link>
          </article>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
  export default {
    data() {
      return {
        roomsList: [10,8,6,4],
        forms: {
          filter: {
            iptRooms: {
              value: '',
              hasError: false,
              error: ''
            },
            iptLowerDailyRate: {
              value: '',
              hasError: false,
              error: ''
            },
            iptHighestDailyRate: {
              value: '',
              hasError: false,
              error: ''
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
</style>