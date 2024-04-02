<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">Reservas</p>
    </header>
    <div class="card-content">
      <div class="box" v-for="reserve in reserves" :key="reserve._id">
        <article class="media">
          <div class="media-left">
            <figure class="image is-64x64">
              <img src="../../assets/reservas/reserva64.png" alt="Image">
            </figure>
          </div>
          <div class="media-content">
            <div class="content">
              <p>
                <strong>Apartamento</strong><br><small>Reserva de (X) dia(s)</small>
                <br>
                Início da estadia: {{ reserve.reserve.start | formatDate }} <br>
                Fim da estadia: {{ reserve.reserve.end | formatDate }}
              </p>
            </div>
            <nav class="level is-mobile">
              <div class="level-left">
                <a class="level-item" aria-label="reply" title="Compartilhar">
                  <span class="icon is-small">
                    <i class="fas fa-reply" aria-hidden="true"></i>
                  </span>
                </a>
                <router-link 
                  :to="{
                    name: 'UserReserva',
                    params: {
                      id: reserve._id
                    }
                  }"
                  class="button is-small is-info is-outlined">Detalhes</router-link>
              </div>
            </nav>
          </div>
        </article>
      </div>
    </div>
  </div>
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

      axios.get(Endpoints.GET_RESERVES(), axiosConfig)
        .then(res => {
          this.reserves = res.data.reserves
        })
        .catch(error => {
          console.error(error)
        })
    },
    filters: {
      formatDate(date) {
        if (date) {
          return new Date(date).toLocaleDateString()
        }
      }
    },
    data() {
      return {
        reserves: []
      }
    }
  }
</script>

<style scoped>
  
</style>