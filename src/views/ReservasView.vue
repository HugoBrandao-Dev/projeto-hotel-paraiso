<template>
  <article id="reservas" class="content-article">
    <h1>Reservas</h1>
    <hr>
    <div class="columns">
      <aside class="column is-one-third is-align-self-flex-start">
        <div class="card">
          <div class="card-content">
            <p class="title">Filtros</p>
              <div class="columns">
                <div class="field column">
                  <label class="label">Cômodos:</label>
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
                      :class="{'is-danger': forms.filter.iptHighestDailyRate.hasError}"
                      type="number"
                      placeholder="500"
                      v-model="forms.filter.iptHighestDailyRate.value"
                    />
                  </div>
                  <p class="help is-danger" v-show="forms.filter.iptHighestDailyRate.hasError">
                    {{ forms.filter.iptHighestDailyRate.error }}
                  </p>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <label class="checkbox">
                    <input type="checkbox" v-model="forms.filter.ckbAnimal.value">
                    Aceita animal.
                  </label>
                </div>
              </div>
          </div>
          <footer class="card-footer">
            <button class="button is-ghost card-footer-item" @click="applyFilters()">
              Aplicar
            </button>
            <button class="button is-ghost card-footer-item" @click="clearFields()">
              Limpar
            </button>
          </footer>
        </div>
      </aside>
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
  import validator from 'validator'

  export default {
    data() {
      return {
        roomsList: [10,8,6,4],
        forms: {
          hasErrors: false,
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
            },
            ckbAnimal: {
              value: false,
              hasError: false,
              error: ''
            }
          }
        }
      }
    },
    methods: {
      clearFields() {
        this.forms.filter.iptRooms.value = ''
        this.forms.filter.iptLowerDailyRate.value = ''
        this.forms.filter.iptHighestDailyRate.value = ''
        this.forms.filter.ckbAnimal.value = false
      },
      clearErrorFields() {
        this.forms.filter.hasErrors = false
        let fields = Object.keys(this.forms.filter)
        fields.forEach(field => {
          if (field.indexOf('ipt') >= 0) {
            this.forms.filter[field].hasError = false
            this.forms.filter[field].error = ''
          }
        })
      },
      isValidRooms() {
        let isEmpty = validator.isEmpty(this.forms.filter.iptRooms.value)
        let isInsideRoomsList = this.roomsList.indexOf(this.forms.filter.iptRooms.value) >= 0

        return isEmpty || isInsideRoomsList
      },
      isValidLowerDailyRate() {
        let isEmpty = validator.isEmpty(this.forms.filter.iptLowerDailyRate.value)
        let isFloat = validator.isFloat(this.forms.filter.iptLowerDailyRate.value, {
          locale: 'pt-BR',
          min: 0
        })

        return isEmpty || isFloat
      },
      isValidHighestDailyRate() {
        let isEmpty = validator.isEmpty(this.forms.filter.iptHighestDailyRate.value)
        let isFloat = validator.isFloat(this.forms.filter.iptHighestDailyRate.value, {
          locale: 'pt-BR',
          min: 0
        })

        return isEmpty || isFloat
      },
      setError(field, msg) {
        this.forms.filter.hasErrors = true
        this.forms.filter[field].hasError = true
        this.forms.filter[field].error = msg
      },
      applyFilters() {
        this.clearErrorFields()

        if (!this.isValidRooms()) {
          this.setError('iptRooms', 'Quantidade de cômodos inválida.')
        }
        if (!this.isValidLowerDailyRate()) {
          this.setError('iptLowerDailyRate', 'Diária mínima inválida.')
        }

        let minValue = this.forms.filter.iptLowerDailyRate.value
        let maxValue = this.forms.filter.iptHighestDailyRate.value
        if (!this.isValidHighestDailyRate()) {
          this.setError('iptHighestDailyRate', 'Diária máxima inválida.')

        // Verifica se a Diária máxima é menor que a Diária mínima.
        } else if (maxValue <= minValue) {
          this.setError('iptHighestDailyRate', 'Deve ser maior que a mínima.')
        }
      }
    }
  }
</script>

<style scoped>
</style>