<template>
  <article id="reserva-edit">
    <h1>Edição de uma reserva</h1>
    <hr>
    <div>
      <h2 class="title is-2">Clientes</h2>
      <div class="content">
        <div class="columns">
          <SearchFilterComponent @userFound="userFound($event)" />
        </div>
      </div>
      <div class="container is-max-desktop">
        <table class="table is-striped is-fullwidth" v-if="users.length">
          <thead>
            <tr>
              <th class="is-hidden-touch">Selecione</th>
              <th>Nome</th>
              <th><abbr title="CPF ou Número do Passaporte do cliente">CPF/NP</abbr></th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th class="is-hidden-touch">Selecione</th>
              <th>Nome</th>
              <th><abbr title="CPF ou Número do Passaporte do cliente">CPF/NP</abbr></th>
            </tr>
          </tfoot>
          <tbody>
            <tr 
              v-for="user in users"
              :key="user._id"
              @click="forms.reserve.iptClient.value = user"
              :class="{'is-selected': user._id == forms.reserve.iptClient.value._id }"
            >
              <td class="is-hidden-touch">
                <input type="hidden" :value="user._id">
                <input type="radio" name="user" :value="user._id" v-model="forms.reserve.iptClient.value._id">
              </td>
              <td class="is-capitalized">{{ user.name }}</td>
              <td v-if="user.cpf">{{ user.cpf }}</td>
              <td v-else>{{ user.passportNumber }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="container mt-4">
      <h2 class="title is-2">Informações</h2>
      <div class="columns">
        <div class="field column is-one-third">
          <label class="label">Início da estadia:</label>
          <div class="control">
            <input 
              id="iptStartDate"
              type="date" 
              class="input"
              :class="{
                'is-normal': !forms.reserve.iptStartDate.hasError,
                'is-danger': forms.reserve.iptStartDate.hasError
              }"
              v-model="forms.reserve.iptStartDate.value">
          </div>
          <p class="help" :class="{ 'is-danger': forms.reserve.iptStartDate.hasError }">
            {{ forms.reserve.iptStartDate.error }}
          </p>
        </div>
        <div class="field column is-one-third">
          <label class="label">Fim da estadia:</label>
          <div class="control">
            <input 
              id="iptEndDate"
              type="date" 
              class="input"
              :class="{
                'is-normal': !forms.reserve.iptEndDate.hasError,
                'is-danger': forms.reserve.iptEndDate.hasError
              }"
              v-model="forms.reserve.iptEndDate.value">
          </div>
          <p class="help" :class="{ 'is-danger': forms.reserve.iptEndDate.hasError }">
            {{ forms.reserve.iptEndDate.error }}
          </p>
        </div>
        <div class="field column is-one-third">
          <label class="label">Status:</label>
          <div class="control">
            <div 
              class="select" 
              :class="{'is-danger': forms.reserve.iptStatus.hasError}"
            >
              <select v-model="forms.reserve.iptStatus.value">
                <option 
                  v-for="item in statusList" 
                  :key="item" 
                  :selected="forms.reserve.iptStatus.value"
                >
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
            <p 
              class="help" 
              :class="{'is-danger': forms.reserve.iptStatus.hasError}"
            >
              {{ forms.reserve.iptStatus.error }}
            </p>
        </div>
      </div>
    </div>
    <div class="buttons is-right">
      <button class="button is-link is-large" @click="updateReserve()">Atualizar</button>
    </div>
  </article>
</template>

<script>
  import validator from 'validator'
  import SearchFilterComponent from '../users/SearchFilterComponent'
  import axios from 'axios'
  import Endpoints from '@/tools/EndpointsConfig'

  export default {
    components: {
      SearchFilterComponent
    },
    created() {
      this.getUsers()
    },
    data() {
      return {
        axiosConfig: {
          headers: {
            Authorization: `Bearer ${ localStorage.getItem('token_hotel_paraiso') }`
          }
        },
        statusList: ['reservado', 'ocupado'],
        users: [],
        forms: {
          reserve: {
            hasErrors: false,
            iptClient: {
              value: { _id: '' },
              hasError: false,
              error: ''
            },
            iptStartDate: {
              value: '',
              hasError: false,
              error: ''
            },
            iptEndDate: {
              value: '',
              hasError: false,
              error: ''
            },
            iptStatus: {
              value: 'reservado',
              hasError: false,
              error: ''
            }
          },
          searchClient: {
            type: 'name',
            hasErrors: false,
            iptName: {
              value: '',
              hasError: false,
              error: ''
            },
            iptCPF: {
              value: '',
              hasError: false,
              error: ''
            },
            iptPassportNumber: {
              value: '',
              hasError: false,
              error: ''
            }
          }
        }
      }
    },
    methods: {
      userFound(event) {
        this.users = event.users
      },
      getUsers() {
        axios.get(Endpoints.GET_USERS(), this.axiosConfig)
          .then(res => {
            this.users = res.data.users
          })
          .catch(error => console.error(error))
      },
      setError(form, field, msg) {
        this.forms[form].hasErrors = true
        this.forms[form][field].hasError = true
        this.forms[form][field].error = msg
      },
      clearErrorFields() {
        let allForms = Object.keys(this.forms)
        for (let f of allForms) {
          this.forms[f].hasErrors = false
          let allFields = Object.keys(this.forms[f])
          for (let k of allFields) {
            if (Object.keys(this.forms[f][k]).includes('hasError')) {
              this.forms[f][k].hasError = false
              this.forms[f][k].error = ''
            }
          }
        }
      },
      isValidStartDate() {
        return validator.isDate(this.forms.reserve.iptStartDate.value)
      },
      isValidEndDate() {
        return validator.isDate(this.forms.reserve.iptEndDate.value)
      },
      isValidStatus() {
        return validator.isIn(this.forms.reserve.iptStatus.value, this.statusList)
      },
      isValidUser() {
        let hasLength = this.forms.reserve.iptClient.value._id.length == 24
        let isAlphanumeric = validator.isAlphanumeric(this.forms.reserve.iptClient.value._id, ['pt-BR'])
        return hasLength && isAlphanumeric
      },
      updateReserve() {
        this.clearErrorFields()
        let editReserve = {}

        if (this.forms.reserve.iptClient.value._id) {
          if (!this.isValidUser())
            this.setError('reserve', 'iptClient', 'Cliente inválido.')
          else
            editReserve.client_id = this.forms.reserve.iptClient.value._id
        }

        if (this.forms.reserve.iptStartDate.value) {
          if (!this.isValidStartDate())
            this.setError('reserve', 'iptStartDate', 'Data de início inválida.')
          else
            editReserve.start = this.forms.reserve.iptStartDate.value
        }

        if (this.forms.reserve.iptEndDate.value) {
          if (!this.isValidEndDate())
            this.setError('reserve', 'iptEndDate', 'Data de fim inválida.')
          else
            editReserve.end = this.forms.reserve.iptEndDate.value
        }

        if (this.forms.reserve.iptStatus.value) {
          if (!this.isValidStatus())
            this.setError('reserve', 'iptStatus', 'O Status é inválido.')
          else
            editReserve.status = this.forms.reserve.iptStatus.value
        }

        if (!this.forms.reserve.hasErrors) {
          axios.put(Endpoints.PUT_RESERVE(this.$route.params.id), editReserve, this.axiosConfig)
            .then(() => {
              alert('Reserva atualizada com sucesso')
              this.$router.push('/admin/reservas')
            })
            .catch(error => {
              if (error.response.data.RestException.ErrorFields && error.response.data.RestException.ErrorFields.length) {
                error.response.data.RestException.ErrorFields.map(el => {
                  this.setError('reserve', el.field, el.hasError.error)
                })
              }
            })
        }
      }
    }
  }
</script>

<style scoped>
  
</style>