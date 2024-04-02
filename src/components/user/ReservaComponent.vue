<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        Reserva #{{ this.$route.params.id }}
      </p>
    </header>

    <!-- Criar carousel das imagens do apartamento -->

    <div class="card-image">
      <figure class="image is-4by3">
        <img src="../../assets/reservas/reserva.png" alt="Placeholder image">
      </figure>
    </div>
    <div class="card-content" v-if="apartment && reserve.reserve">
      <div class="content">
        <article class="message is-info">
          <div class="message-header">
            Estadia:
          </div>
          <div class="message-body">
            <div class="field">
              <label class="label">Início da estadia:</label>
              <div class="control">
                {{ reserve.reserve.start | formatDate }}
              </div>
            </div>
            <div class="field">
              <label class="label">Fim da estadia:</label>
              <div class="control">
                {{ reserve.reserve.end | formatDate }}
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
                5 x {{ apartment.daily_price | formatPrice }} no Cartão de Crédito
              </div>
            </div>
            <br>
            <div class="field">
              <label class="label">Valor da diária:</label>
              <div class="control">
                {{ apartment.daily_price | formatPrice }}
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
                {{ reserve.reserve.CLIENT_ID[0].name }}
              </div>
            </div>
            <div class="field" v-if="user.cpf">
              <label class="label">CPF:</label>
              <div class="control">
                {{ user.cpf }}
              </div>
            </div>
            <div class="field" v-else>
              <label class="label">Número de Passaport / Passport Number:</label>
              <div class="control">
                {{ user.passportNumber }}
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
                {{ apartment.floor }}º
              </div>
            </div>
            <div class="field">
              <label class="label">Nº do apartamento:</label>
              <div class="control">
                {{ apartment.number }}
              </div>
            </div>
            <ul><span class="is-size-4">{{ totalRooms }} cômodos</span>
              <li v-for="room in apartment.rooms" :key="room.room">
                {{ room.quantity }} - {{ room.room }}
              </li>
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
                <input 
                  class="input"
                  :class="{
                      'is-normal': !forms.reserve.iptStartDate.hasError,
                      'is-danger': forms.reserve.iptStartDate.hasError
                    }"
                  type="date" 
                  v-model="forms.reserve.iptStartDate.value">
              </div>
              <p class="help" :class="{ 'is-danger': forms.reserve.iptStartDate.hasError }">
                {{ forms.reserve.iptStartDate.error }}
              </p>
            </div>
            <div class="field column">
              <label class="label">Fim da estadia:</label>
              <div class="control">
                <input 
                  class="input"
                  :class="{
                      'is-normal': !forms.reserve.iptEndDate.hasError,
                      'is-danger': forms.reserve.iptEndDate.hasError
                    }"
                  type="date" 
                  v-model="forms.reserve.iptEndDate.value">
              </div>
              <p class="help" :class="{ 'is-danger': forms.reserve.iptEndDate.hasError }">
                {{ forms.reserve.iptEndDate.error }}
              </p>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button type="submit" class="button is-success" @click.prevent="updateReservation()">Salvar mudança</button>
          <button class="button is-danger" @click="closeModalEstadia()">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import validator from 'validator'
  import Endpoints from '@/tools/EndpointsConfig'

  export default {
    created() {
      this.getInfos()
    },
    props: {
      user: Object
    },
    data() {
      return {
        apartment: {},
        reserve: {},
        totalRooms: 0,
        modals: {
          modificarEstadia: {
            active: false
          }
        },
        forms: {
          reserve: {
            hasErrors: false,
            iptStartDate: {
              value: '',
              hasError: false,
              error: ''
            },
            iptEndDate: {
              value: '',
              hasError: false,
              error: ''
            }
          }
        }
      }
    },
    filters: {
      formatPrice(price) {
        if (price)
          return price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
      },
      formatDate(date) {
        if (date) {
          return new Date(date).toLocaleDateString()
        }
      }
    },
    methods: {
      async getInfos() {
        try {
          const axiosConfig = {
            headers: {
              Authorization: `Bearer ${ localStorage.getItem('token_hotel_paraiso') }`
            }
          }

          const responseReserve = await axios.get(Endpoints.GET_RESERVE(this.$route.params.id), axiosConfig)
          this.reserve = responseReserve.data

          const responseApartment = await axios.get(Endpoints.GET_APARTMENT(this.$route.params.id), axiosConfig)
          this.apartment = responseApartment.data
          let quantities = this.apartment.rooms.map(el => el.quantity)
          this.totalRooms = quantities.reduce((a, b) => a + b)
        } catch (error) {
          console.error(error)
        }
      },
      openModalEstadia() {
        this.modals.modificarEstadia.active = true
      },
      closeModalEstadia() {
        this.modals.modificarEstadia.active = false
      },
      isValidStartDate() {
        return validator.isDate(this.forms.reserve.iptStartDate.value)
      },
      isValidEndDate() {
        return validator.isDate(this.forms.reserve.iptEndDate.value)
      },
      setError(field, msg) {
        this.forms.reserve.hasErrors = true
        this.forms.reserve[field].hasError = true
        this.forms.reserve[field].error = msg
      },
      clearErrorFields() {
        this.forms.reserve.hasErrors = false

        this.forms.reserve.iptStartDate.hasError = false
        this.forms.reserve.iptStartDate.error = ''

        this.forms.reserve.iptEndDate.hasError = false
        this.forms.reserve.iptEndDate.error = ''
      },
      clearFields() {
        this.forms.reserve.hasErrors = false
        this.forms.reserve.iptStartDate.value = ''
        this.forms.reserve.iptEndDate.value = ''
      },
      updateReservation() {
        this.clearErrorFields()

        let reserveInfos = {}

        reserveInfos.apartment_id = this.$route.params.id
        if (!this.isValidStartDate())
          this.setError('iptStartDate', 'Informe a data de início da reserva.')
        else
          reserveInfos.start = this.forms.reserve.iptStartDate.value

        if (!this.isValidEndDate())
          this.setError('iptEndDate', 'Informe a data de fim da reserva.')
        else
          reserveInfos.end = this.forms.reserve.iptEndDate.value

        if (this.forms.reserve.hasErrors) {
          console.error('Error no formulário')
        } else {
          const axiosConfig = {
            headers: {
              Authorization: `Bearer ${ localStorage.getItem('token_hotel_paraiso') }`
            }
          }

          const edit_reserve_link = this.reserve._links.find(el => el.rel == 'edit_reserve').href

          axios.put(edit_reserve_link, reserveInfos, axiosConfig)
            .then(() => { 
              if (alert('Reserva atualizada')) {
                this.getInfos()
              }
            })
            .catch(error => { console.error(error) })
        }
      }
    }
  }
</script>

<style scoped>
  
</style>