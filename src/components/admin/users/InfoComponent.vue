<template>
  <div class="user-info">
    <h1>Informações do usuário</h1>
    <hr>
    <div class="card">
      <div class="card-content">

        <div class="field">
          <label class="label">Nome:</label>
          <div class="control is-capitalized">{{ user.name }}</div>
        </div>

        <div class="field">
          <label class="label">Email:</label>
          <div class="control">{{ user.email }}</div>
        </div>

        <div class="field" v-if="user.cpf">
          <label class="label">CPF:</label>
          <div class="control">{{ user.cpf }}</div>
        </div>

        <div class="field" v-else>
          <label class="label">Número do passaporte:</label>
          <div class="control">{{ user.passportNumber }}</div>
        </div>

        <div class="field">
          <label class="label">Telefone:</label>
          <div class="control">{{ user.phoneCode }} {{ user.phoneNumber }}</div>
        </div>

        <div v-if="user.address">
          
          <div class="field" v-show="user.address.cep">
            <label class="label">CEP:</label>
            <div class="control">{{ user.address.cep }}</div>
          </div>

          <div class="field">
            <label class="label">País:</label>
            <div class="control">{{ user.address.country }}</div>
          </div>

          <div class="field">
            <label class="label">Cidade:</label>
            <div class="control">{{ user.address.city }} / {{ user.address.state }}</div>
          </div>

          <div class="field" v-show="user.address.neighborhood">
            <label class="label">Bairro:</label>
            <div class="control">{{ user.address.neighborhood }}</div>
          </div>

          <div class="field" v-show="user.address.road">
            <label class="label">Rua:</label>
            <div class="control">{{ user.address.road }}</div>
          </div>

          <div class="field" v-show="user.address.houseNumber">
            <label class="label">Nº da residência:</label>
            <div class="control">{{ user.address.houseNumber }}</div>
          </div>

          <div class="field" v-show="user.address.information">
            <label class="label">Informações adicionais:</label>
            <div class="control">
              <p>{{ user.address.information }}</p>
            </div>
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
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${ localStorage.getItem('token_hotel_paraiso') }`
        }
      }

      axios.get(Endpoints.GET_USER(this.$route.params.id), axiosConfig)
        .then(res => {
          this.user = res.data
        })
        .catch(error => {
          console.error(error)
        })
    },
    data() {
      return {
        user: {}
      }
    }
  }
</script>

<style scoped>
  
</style>
