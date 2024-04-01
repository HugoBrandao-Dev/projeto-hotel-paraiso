<template>
  <article id="reservas" class="content-article">
    <h1>Apartamentos</h1>
    <hr>
    <div class="columns">
      <aside class="column is-one-third">
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
      <div class="lista-reservas column columns is-flex is-flex-wrap-wrap is-align-self-flex-start">
        <div v-for="apartment in apartments" :key="apartment._id" class="tile is-parent column is-one-third">
          <article class="tile is-child box">
            <figure class="image is-16by9">
              <img src="../assets/reservas/reserva.png">
            </figure>
            <p class="title is-6 mt-2">Diária: {{ apartment.daily_price | formatPrice }}</p>
              <router-link 
                :to="{ name: 'Apartamento', params: { id: apartment._id } }"
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
  import axios from 'axios'
  import Endpoints from '@/tools/EndpointsConfig'

  export default {
    created() {
      this.getApartments()
    },
    data() {
      return {
        roomsList: [],
        apartments: [],
        forms: {
          filter: {
            hasErrors: false,
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
    filters: {
      formatPrice(price) {
        return price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
      }
    },
    methods: {
      getApartments(queryString = '') {
        let url = queryString ? 
        `${Endpoints.GET_APARTMENTS()}?${queryString}` : 
        Endpoints.GET_APARTMENTS()
        axios.get(url)
          .then(res => {
            this.apartments = res.data.apartments
            this.apartments.map(el => {

              // Seta os valores de quantidade de cômodos que o usuário poderá selecionar no filtro.
              let quantities = el.rooms.map(room => room.quantity)
              let sum = quantities.reduce((a, b) => a + b)
              if (!this.roomsList.includes(sum)) {
                this.roomsList.push(sum)
              }
            })
          })
          .catch(error => {
            console.error(error)
          })
      },
      clearFields() {
        this.forms.filter.iptRooms.value = ''
        this.forms.filter.iptLowerDailyRate.value = ''
        this.forms.filter.iptHighestDailyRate.value = ''
        this.forms.filter.ckbAnimal.value = false
        this.getApartments()
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
        if (this.forms.filter.iptRooms.value) {
          let rooms = (this.forms.filter.iptRooms.value).toString()
          let isInsideRoomsList = validator.isIn(rooms, this.roomsList)

          return isInsideRoomsList
        }
        return true
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
        let queryString = ''

        if (this.forms.filter.iptRooms.value) {
          if (!this.isValidRooms()) {
            this.setError('iptRooms', 'Quantidade de cômodos inválida.')
          } else {
            queryString = queryString.concat(`rooms=${this.forms.filter.iptRooms.value}`)
          }
        }

        if (this.forms.filter.iptLowerDailyRate.value) {
          if (!this.isValidLowerDailyRate()) {
            this.setError('iptLowerDailyRate', 'Diária mínima inválida.')
          } else {
            let minValue = this.forms.filter.iptLowerDailyRate.value
            let stringResult = null
            if (queryString)
              stringResult = `&lowest_daily_price=${ minValue }`
            else
              stringResult = `lowest_daily_price=${ minValue }`
            queryString = queryString.concat(stringResult)
          }
        }

        if (this.forms.filter.iptHighestDailyRate.value) {
          if (!this.isValidHighestDailyRate()) {
            this.setError('iptHighestDailyRate', 'Diária máxima inválida.')

          } else {
            let maxValue = parseFloat(this.forms.filter.iptHighestDailyRate.value)

            // Verifica se a Diária máxima, caso informada, é menor que a Diária mínima.
            if (maxValue <= parseFloat(this.forms.filter.iptLowerDailyRate.value)) {
              this.setError('iptHighestDailyRate', 'Deve ser maior que a mínima.')
            } else {
              let stringResult = null
              if (queryString)
                stringResult = `&highest_daily_price=${ maxValue }`
              else
                stringResult = `highest_daily_price=${ maxValue }`
              queryString = queryString.concat(stringResult)
            }
          }
        }

        if (this.forms.filter.ckbAnimal.value === true) {
          let stringResult = null
          if (queryString)
            stringResult = `&accepts_animals=1`
          else
            stringResult = `accepts_animals=1`
          queryString = queryString.concat(stringResult)
        }

        if (!this.forms.filter.hasErrors) {
          this.getApartments(queryString)
        }
      }
    }
  }
</script>

<style scoped>
</style>