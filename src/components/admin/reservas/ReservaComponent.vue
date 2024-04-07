<template>
  <div id="reserva">
    <h1>Informações da reserva</h1>
    <hr>
    <div class="container">
      <div class="card mt-4">
        <header class="card-header">
          <p class="card-header-title is-size-4">
            Reserva #{{ this.$route.params.id }}
          </p>
        </header>
        <div class="card-image">
          <figure class="image is-16by9">
            <img src="../../../assets/reservas/reserva.png">
          </figure>
        </div>
        <div class="card-content">
          <div class="content">
            <article class="message is-info">
              <div class="message-header">
                <p class="is-size-3">Apartamento reservado</p>
              </div>
              <div class="message-body">
                <div class="field">
                  <label class="label">Andar:</label>
                  <div class="control">
                    <p>{{ apartment.floor }}</p>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Nº:</label>
                  <div class="control">
                    <p>{{ apartment.number }}</p>
                  </div>
                </div>
                <div class="field">
                  <label class="label">{{apartment.rooms | calcRooms}} Cômodos:</label>
                  <div class="control">
                    <ul>
                      <li v-for="room in apartment.rooms" :key="room.room">
                        {{ room.quantity }}x {{ room.room }}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="columns" v-if="apartment.reserve">
                  <div class="field column">
                    <label class="label">Início da estadia:</label>
                    <div class="control">
                      <p>{{ apartment.reserve.start | formatDate }}</p>
                    </div>
                  </div>
                  <div class="field column">
                    <label class="label">Fim da estadia:</label>
                    <div class="control">
                      <p>{{ apartment.reserve.end | formatDate }}</p>
                    </div>
                  </div>
                  <div class="field column">
                    <label class="label">Situação atual:</label>
                    <div class="control">
                      <p class="is-uppercase tag is-large"
                        :class="{
                          'is-link': apartment.reserve.status == 'reservado',
                          'is-danger': apartment.reserve.status == 'ocupado'
                        }"
                      >
                        {{ apartment.reserve.status }}
                      </p>
                    </div>
                  </div>
                </div>
                <div class="columns">
                  <div class="field column">
                    <label class="label">Diária:</label>
                    <div class="control">
                      <p>{{ apartment.daily_price | formatPrice }}</p>
                    </div>
                  </div>
                  <div class="field column">
                    <!-- Criar algoritmo de cálculo total ??? -->
                    <label class="label">Total a ser pago:</label>
                    <div class="control">
                      <p>R$ xxxx</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <article class="message is-info">
              <div class="message-header">
                <p class="is-size-3">Ocupante</p>
              </div>
              <div class="message-body">
                <div class="field">
                  <label class="label">Nome:</label>
                  <div class="control">
                    <p class="is-capitalized">{{ user.name }}</p>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Email:</label>
                  <div class="control">
                    <p>{{ user.email }}</p>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Telefone:</label>
                  <div class="control">
                    <p>{{ user.phoneCode }} {{ user.phoneNumber }}</p>
                  </div>
                </div>
                <div class="field" v-if="user.cpf">
                  <label class="label">CPF:</label>
                  <div class="control">
                    <p>{{ user.cpf }}</p>
                  </div>
                </div>
                <div class="field" v-else>
                  <label class="label">Número do Passaporte:</label>
                  <div class="control">
                    <p>{{ user.passportNumber }}</p>
                  </div>
                </div>
                <div v-if="user.address">
                  <div class="field">
                    <label class="label">País:</label>
                    <div class="control">
                      <p>{{ user.address.country }}</p>
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">Cidade / Estado:</label>
                    <div class="control">
                      <p>{{ user.address.city }} / {{ user.address.state }}</p>
                    </div>
                  </div>
                  <div class="field" v-if="user.address.cep">
                    <label class="label">CEP:</label>
                    <div class="control">
                      <p>{{ user.address.cep }}</p>
                    </div>
                  </div>
                  <div class="field" v-if="user.neighborhood">
                    <label class="label">Bairro:</label>
                    <div class="control">
                      <p>{{ user.neighborhood }}</p>
                    </div>
                  </div>
                  <div class="field" v-if="user.address.road">
                    <label class="label">Rua/Avenida:</label>
                    <div class="control">
                      <p>{{ user.address.road }}</p>
                    </div>
                  </div>
                  <div class="field" v-if="user.address.houseNumber">
                    <label class="label">Nº da casa:</label>
                    <div class="control">
                      <p>{{ user.address.houseNumber }}</p>
                    </div>
                  </div>
                  <div class="field" v-if="user.address.information">
                    <label class="label">Informações adicionais:</label>
                    <div class="control">
                      <p>{{ user.address.information }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Endpoints from '@/tools/EndpointsConfig'

  export default {
    created() {
      axios.get(Endpoints.GET_APARTMENT(this.$route.params.id), this.axiosConfig)
        .then(resposeApartment => {
          this.apartment = resposeApartment.data
          axios.get(Endpoints.GET_USER(resposeApartment.data.reserve.client_id), this.axiosConfig)
            .then(responseClient => {
              this.user = responseClient.data
            })
            .catch(errorClient => console.log(errorClient))
        })
        .catch(errorApartment => console.log(errorApartment))
    },
    data() {
      return {
        axiosConfig: {
          headers: {
            Authorization: `Bearer ${ localStorage.getItem('token_hotel_paraiso') }`
          }
        },
        apartment: { reserve: {} },
        user: { address: {} }
      }
    },
    filters: {
      calcRooms(rooms) {
        if (rooms) {
          let quantities = rooms.map(el => el.quantity)
          return quantities.reduce((a,b) => a + b)
        }
        return 0
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString()
      },
      formatPrice(price) {
        if (price)
          return price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
      }
    }
  }
</script>

<style scoped>
  
</style>