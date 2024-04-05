<template>
  <article>
    <h1>Apartamento</h1>
    <hr>
    <div class="columns">
      <div class="column is-three-fifths mx-auto">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-size-4">
              Apartamento #{{ this.$route.params.id }}
            </p>
          </header>
          <div class="card-image">
            <figure class="image is-16by9">
              <img src="../../../assets/reservas/reserva.png" alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content">
            <div class="is-flex is-justify-content-space-between">
              <div class="box has-background-primary has-text-white">
                <p>
                  Diária: <strong class="is-size-4 has-text-white">{{ apartment.daily_price | formatPrice }}</strong>
                </p>
              </div>    
              <span 
                class="tag is-large is-capitalized" 
                :class="applyTagColor(apartment.reserve.status)" 
                title="Status atual do apartamento.">{{ apartment.reserve.status }}</span>
            </div>
            <div class="field">
              <label class="label">Andar:</label>
              <div class="control">
                <p>{{ apartment.floor }}</p>
              </div>
            </div>
            <div class="field">
              <label class="label">Número:</label>
              <div class="control">
                <p>{{ apartment.number }}</p>
              </div>
            </div>
            <div class="field">
              <label class="label">4 Cômodos:</label>
              <div class="control">
                <ul>
                  <li v-for="room in apartment.rooms" :key="room.room" class="is-capitalized">
                    {{ room.quantity }}x {{ room.room }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="field">
              <label class="label">Aceita animais:</label>
              <div class="control">
                <p>{{ apartment.accepts_animals ? 'Sim' : 'Não' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
  import axios from 'axios'
  import Endpoints from '@/tools/EndpointsConfig'

  export default {
    created() {

      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${ localStorage.getItem('token_hotel_paraiso') }`
        }
      }

      axios.get(Endpoints.GET_APARTMENT(this.$route.params.id), axiosConfig)
        .then(res => this.apartment = res.data)
        .catch(error => console.error(error))
    },
    data() {
      return {
        apartment: {
          floor: 4,
          number: 10,
          daily_price: 230,
          rooms: [
            {
              room: 'sala de estar',
              quantity: 1
            },
            {
              room: 'cozinha',
              quantity: 1
            },
            {
              room: 'banheiro',
              quantity: 2
            },
            {
              room: 'quarto',
              quantity: 2
            }
          ],
          reserve: {
            status: 'livre'
          }
        }
      }
    },
    filters: {
      formatPrice(price) {
        if (price)
          return price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})
      },
      formatDateTime(dateTime) {
        if (dateTime) {
          let formated = new Date(dateTime)
          return `${ formated.toLocaleDateString() } ${ formated.toLocaleTimeString() }`
        }
      }
    },
    methods: {
      applyTagColor(status) {
        if (status) {
          switch (status) {
            case 'livre':
              return 'is-primary'
            case 'reservado':
              return 'is-link'
            case 'ocupado':
              return 'is-danger'
            default:
              return 'is-dark'
          }
        }
        return ''
      }
    }
  }
</script>

<style scoped>
  
</style>