<template>
  <div class="card">
    <header class="card-header p-3 is-flex is-align-items-center">
      <router-link to="account" class="button is-link is-light is-rounded">
        <span class="icon is-large">
          <i class="fas fa-arrow-left fa-xs"></i>
        </span>
      </router-link>
      <p class="card-header-title">Atualizar informações</p>
    </header>
    <div class="card-content">
      <form id="form-cadastro" class="container is-max-desktop">
        <FormComponent :type="'update'" @updateUser="updateUser($event)" />
      </form>
    </div>
  </div>
</template>

<script>
  // Componentes
  import FormComponent from './FormComponent'
  import axios from 'axios'

  export default {
    components: {
      FormComponent
    },
    props: {
      user: Object
    },
    data() {
      return {
        masks: {
          cpf: '000.000.000-00',
          telefone: '+00 (00) 00000-0000',
          cep: '00000-000'
        },
        windows: {
          termsConditions: {
            active: false
          }
        }
      }
    },
    methods: {
      updateUser(data) {
        const token = localStorage.getItem('token_hotel_paraiso')
        const axiosConfig = {
          headers: {
            Authorization: `Bearer ${ token }`
          }
        }

        const edit_user_link = this.user._links.find(item => item.rel == 'edit_user').href

        axios.put(edit_user_link, data, axiosConfig)
          .then(() => {
            this.$emit('updateUserInfos')
          })
          .catch(error => {
            console.error(error)
          })
      }
    }
  }
</script>

<style scoped>
  .input, .textarea, .checkbox {
    margin-bottom: 10px;
  }

  .checkbox {
    width: 100%;
  }
</style>