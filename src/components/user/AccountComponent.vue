<template>
  <div class="card">
    <header class="card-header p-3 is-justify-content-space-between">
      <router-link to="update" class="button is-warning">Atualizar</router-link>
      <button class="button is-danger" @click="openDeleteAccountModal()">Deletar</button>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="field">
          <label class="label">Nome:</label>
          <div class="control is-capitalized">{{ this.user.name }}</div>
        </div>
        <div class="field">
          <label class="label">Email:</label>
          <div class="control">{{ this.user.email }}</div>
        </div>
        <div class="field" v-show="this.user.cpf">
          <label class="label">CPF:</label>
          <div class="control">{{ this.user.cpf }}</div>
        </div>
        <div class="field" v-show="this.user.passportNumber">
          <label class="label">Número do Passaporte / Passport Number:</label>
          <div class="control">{{ this.user.passportNumber }}</div>
        </div>
        <div class="field">
          <label class="label">Telefone:</label>
          <div class="control">{{ this.user.phoneCode }} {{ this.user.phoneNumber }}</div>
        </div>
        <div class="field" v-show="this.user.address.cep">
          <label class="label">CEP:</label>
          <div class="control">{{ this.user.address.cep }}</div>
        </div>
        <div class="field" v-show="this.user.address.state">
          <label class="label">Cidade:</label>
          <div class="control">{{ this.user.address.city }} / {{ this.user.address.state }}</div>
        </div>

        <div class="field" v-show="this.user.address.neighborhood">
          <label class="label">Bairro:</label>
          <div class="control">{{ this.user.address.neighborhood }}</div>
        </div>
        <div class="field" v-show="this.user.address.road">
          <label class="label">Rua:</label>
          <div class="control">{{ this.user.address.road }}</div>
        </div>
        <div class="field" v-show="this.user.address.houseNumber">
          <label class="label">Nº da residência:</label>
          <div class="control">{{ this.user.address.houseNumber }}</div>
        </div>
        <div class="field" v-show="this.user.address.information">
          <label class="label">Informações adicionais:</label>
          <div class="control">
            <p>{{ this.user.address.information }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" :class="{'is-active': modal.deleteAccount.active}">
      <div class="modal-background" @click="closeDeleteAccountModal()"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Deletar conta</p>
          <button class="delete" aria-label="close" @click="closeDeleteAccountModal()"></button>
        </header>
        <section class="modal-card-body">
          <p>Deseja realmente deletar sua conta?</p>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary">Sim</button>
          <button class="button is-danger" @click="closeDeleteAccountModal()">Não</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  // import Endpoints from '../../tools/EndpointsConfig'
  import EventBus from '../../EventBus'

  export default {
    created() {
      EventBus.$on('userAccount', userAccount => {
        let self_user_link = userAccount._links.find(link => link.rel == 'self_user').href
        
        let token = localStorage.getItem('token_hotel_paraiso') || ''
        let axiosConfig = {
          headers: {
            Authorization: `Bearer ${ token }`
          }
        }

        axios.get(self_user_link, axiosConfig)
          .then(res => {
            this.user = res.data
          })
      })
    },
    data() {
      return {
        axiosConfig: {},
        user: {
          _id: '',
          name: '',
          email: '',
          phoneCode: '',
          phoneNumber: '',
          birthDate: '',
          cpf: '',
          passportNumber: '',
          address: {
            country: '',
            cep: '',
            state: '',
            city: '',
            neighborhood: '',
            road: '',
            houseNumber: '',
            information: ''
          },
          _links: []
        },
        modal: {
          deleteAccount: {
            active: false
          }
        }
      }
    },
    methods: {
      openDeleteAccountModal() {
        this.modal.deleteAccount.active = true
      },
      closeDeleteAccountModal() {
        this.modal.deleteAccount.active = false
      }
    }
  }
</script>

<style scoped>
  
</style>