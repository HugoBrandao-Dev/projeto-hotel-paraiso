<template>
  <article id="user" class="content-article">
    <h1>Usuário</h1>
    <hr>
    <div class="columns mt-3">
      <aside class="card menu column is-one-quarter is-align-self-flex-start">
        <div class="card-content">
          <p class="menu-label">OPÇÕES</p>
          <ul class="menu-list">
            <li>
              <router-link to="/user/account" class="is-size-5">Conta</router-link>
            </li>
            <li>
              <router-link to="/user/reservas" class="is-size-5">Reservas</router-link>
            </li>
          </ul>
        </div>
      </aside>
      <div class="column">
        <router-view :user="user" @updateUserInfos="updateUserInfos()" />
      </div>
    </div>
  </article>
</template>

<script>
  import EventBus from '@/EventBus'
  import axios from 'axios'

  export default {
    created() {
      EventBus.$on('userAccount', userAccount => {
        this.user._links = userAccount._links
        this.updateUserInfos()
      })
    },
    data() {
      return {
        asdf: null,
        user: {
          address: {},
          _links: []
        }
      }
    },
    methods: {

      // Método que atualiza as informações a serem renderizadas.
      updateUserInfos() {
        const axiosConfig = {
          headers: {
            Authorization: `Bearer ${ localStorage.getItem('token_hotel_paraiso') }`
          }
        }

        let self_user_link = this.user._links.find(el => el.rel == 'self_user').href
        axios.get(self_user_link, axiosConfig)
          .then(res => {
            this.user = res.data
          })
          .catch(error => {
            console.error(error)
          })
      }
    }
  }
</script>

<style scoped>
</style>