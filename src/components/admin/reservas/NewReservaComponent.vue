<template>
  <article id="admin-nova-reserva">
    <h1>Nova reserva</h1>
    <hr>
    <div class="content columns">
      <section class="section column is-fullhd-tablet">
        <div class="notification is-danger" v-show="forms.reserve.iptApartment.hasError">
          <button class="delete" @click="forms.reserve.iptApartment.hasError = false"></button>
          {{ forms.reserve.iptApartment.error }}
        </div>
        <div class="tile is-child box" :class="{'has-background-danger': forms.reserve.iptApartment.hasError}">
          <h2>Apartamentos</h2>
          <p>Selecione um apartamento...</p>
          <table class="table">
            <thead>
              <tr>
                <th class="is-hidden-touch"><abbr title="Selecionar apartamento">Selecione</abbr></th>
                <th><abbr title="Andar do apartamento">Andar</abbr></th>
                <th><abbr title="Número do apartamento">Nº</abbr></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th class="is-hidden-touch"><abbr title="Selecionar apartamento">Selecione</abbr></th>
                <th><abbr title="Andar do apartamento">Andar</abbr></th>
                <th><abbr title="Número do apartamento">Nº</abbr></th>
              </tr>
            </tfoot>
            <tbody>
              <tr 
                v-for="apartment in apartments"
                :key="apartment._id"
                @click="forms.reserve.iptApartment.value = apartment"
                :class="{'is-selected': apartment._id == forms.reserve.iptApartment.value._id }"
              >
                <td class="is-hidden-touch">
                  <input type="hidden" :value="apartment._id">
                  <input type="radio" :value="apartment._id" v-model="forms.reserve.iptApartment.value._id">
                </td>
                <td>{{ apartment.floor }}</td>
                <td>{{ apartment.number }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="section column is-fullhd-tablet">
        <div class="notification is-danger" v-show="forms.reserve.iptClient.hasError">
          <button class="delete" @click="forms.reserve.iptClient.hasError = false"></button>
          {{ forms.reserve.iptClient.error }}
        </div>
        <div class="tile is-child box" :class="{'has-background-danger': forms.reserve.iptClient.hasError}">
          <h2>Clientes</h2>
          <p>Selecione um cliente...</p>
          <div class="box">
            <h2>Filtro</h2>
            <div class="content">
              <div class="field">
                <label class="label">Pesquisar por:</label>
                <div class="control">
                  <label class="radio">
                    <input type="radio" checked name="tipo-pesquisa" value="name" v-model="forms.searchClient.type">
                    Nome
                  </label>
                  <label class="radio">
                    <input type="radio" name="tipo-pesquisa" value="cpf" v-model="forms.searchClient.type">
                      CPF
                  </label>
                  <label class="radio">
                    <input type="radio" name="tipo-pesquisa" value="passportNumber" v-model="forms.searchClient.type">
                      Passport Number
                  </label>
                </div>
              </div>
              <div class="field is-grouped" v-if="forms.searchClient.type == 'name'">
                <p class="control is-expanded" :class="{ 'has-icons-right': forms.searchClient.iptName.hasError }">
                  <input
                    class="input is-small"
                    :class="{
                      'is-normal': forms.searchClient.iptName.hasError,
                      'is-danger': forms.searchClient.iptName.hasError
                    }"
                    type="text"
                    placeholder="Tobias de Oliveira"
                    v-model="forms.searchClient.iptName.value"
                  />
                  <span class="icon is-small is-right" v-show="forms.searchClient.iptName.hasError">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                </p>
                <p class="control">
                  <a class="button is-small is-info" @click.prevent="searchClient()">
                    Pesquisar
                  </a>
                </p>
              </div>
              <div class="field is-grouped" v-else-if="forms.searchClient.type == 'cpf'">
                <p class="control is-expanded" :class="{ 'has-icons-right': forms.searchClient.iptCPF.hasError }">
                  <imask-input
                    class="input is-small"
                    :class="{
                      'is-normal': forms.searchClient.iptCPF.hasError,
                      'is-danger': forms.searchClient.iptCPF.hasError
                    }"
                    type="text"
                    placeholder="000.000.000-00"
                    :mask="masks.cpf"
                    :unmask="true"
                    v-model="forms.searchClient.iptCPF.value"
                  />
                  <span class="icon is-small is-right" v-show="forms.searchClient.iptCPF.hasError">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                </p>
                <p class="control">
                  <a class="button is-small is-info" @click.prevent="searchClient()">
                    Pesquisar
                  </a>
                </p>
              </div>
              <div class="field is-grouped" v-else>
                <p class="control is-expanded" :class="{ 'has-icons-right': forms.searchClient.iptPassportNumber.hasError }">
                  <imask-input
                    class="input is-small"
                    :class="{
                      'is-normal': forms.searchClient.iptPassportNumber.hasError,
                      'is-danger': forms.searchClient.iptPassportNumber.hasError
                    }"
                    type="text"
                    placeholder="0A0A0A0A0A"
                    v-model="forms.searchClient.iptPassportNumber.value"
                  />
                  <span class="icon is-small is-right" v-show="forms.searchClient.iptPassportNumber.hasError">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                </p>
                <p class="control">
                  <a class="button is-small is-info" @click.prevent="searchClient()">
                    Pesquisar
                  </a>
                </p>
              </div>
              <p class="help" :class="{ 'is-danger': forms.searchClient.iptName.error }">
                {{ forms.searchClient.iptName.error }}
              </p>
              <p class="help" :class="{ 'is-danger': forms.searchClient.iptCPF.error }">
                {{ forms.searchClient.iptCPF.error }}
              </p>
              <p class="help" :class="{ 'is-danger': forms.searchClient.iptPassportNumber.error }">
                {{ forms.searchClient.iptPassportNumber.error }}
              </p>
            </div>
          </div>
          <table class="table">
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
                <td>{{ user.cpf }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
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
    <div class="buttons is-right">
      <button class="button is-success is-large" @click="openConfirmReservaModal()">Cadastrar</button>
    </div>
    <div class="modal" :class="{'is-active': modals.confirmReserva.active}">
      <div class="modal-background" @click="closeConfirmReservaModal()"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Confirme a reserva</p>
          <button class="delete" aria-label="close" @click="closeConfirmReservaModal()"></button>
        </header>
        <section class="modal-card-body">
          <div id="info-reserve">
            <p class="is-size-5">Reserva</p>
            <div class="columns">
              <div class="field column is-one-third">
                <label class="label">Início:</label>
                <div class="control">
                  <p>{{ forms.reserve.iptStartDate.value }}</p>
                </div>
              </div>
              <div class="field column is-one-third">
                <label class="label">Fim:</label>
                <div class="control">
                  <p>{{ forms.reserve.iptEndDate.value }}</p>
                </div>
              </div>
              <div class="field column is-one-third">
                <label class="label">Status:</label>
                <div class="control">
                  <p
                    class="tag" 
                    :class="{
                      'is-link': forms.reserve.iptStatus.value == 'reservado',
                      'is-danger': forms.reserve.iptStatus.value == 'ocupado'
                    }"
                  >{{ forms.reserve.iptStatus.value }}</p>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div id="info-apartment">
            <p class="is-size-5">Apartamento</p>
            <div class="columns">
              <div class="field column is-half">
                <label class="label">Andar:</label>
                <div class="control">
                  <p>{{ forms.reserve.iptApartment.value.floor }}</p>
                </div>
              </div>
              <div class="field column">
                <label class="label">Nº:</label>
                <div class="control">
                  <p>{{ forms.reserve.iptApartment.value.number }}</p>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div id="info-user">
            <p class="is-size-5">Cliente</p>
            <div class="columns">
              <div class="field column is-half">
                <label class="label">Nome:</label>
                <div class="control">
                  <p class="is-capitalized">{{ forms.reserve.iptClient.value.name }}</p>
                </div>
              </div>
              <div class="field column">
                <label class="label">CPF/NP:</label>
                <div class="control" v-if="forms.reserve.iptClient.value.cpf">
                  <p>{{ forms.reserve.iptClient.value.cpf }}</p>
                </div>
                <div class="control" v-else>
                  <p>{{ forms.reserve.iptClient.value.passportNumber }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="registerReserve()">Cadastrar</button>
          <button class="button is-danger" @click="closeConfirmReservaModal()">Cancelar</button>
        </footer>
      </div>
    </div>
  </article>
</template>

<script>
  import axios from 'axios'
  import validator from 'validator'
  import { IMaskComponent }  from 'vue-imask'
  import Endpoints from '@/tools/EndpointsConfig'

  export default {
    components: {
      'imask-input': IMaskComponent
    },
    created() {
      this.getUsers()
      this.getApartments()
    },
    data() {
      return {
        masks: {
          cpf: '000.000.000-00'
        },
        axiosConfig: {
          headers: {
            Authorization: `Bearer ${ localStorage.getItem('token_hotel_paraiso') }`
          }
        },
        statusList: ['reservado', 'ocupado'],
        modals: {
          confirmReserva: {
            active: false
          }
        },
        forms: {
          reserve: {
            hasErrors: false,
            iptApartment: {
              value: { _id: '' },
              hasErrors: false,
              error: ''
            },
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
        },
        apartments: [],
        users: [],
        searchApartment: {
          iptFloor: {
            value: '',
            hasError: false,
            error: ''
          },
          iptNumber: {
            value: '',
            hasError: false,
            error: ''
          }
        },
      }
    },
    methods: {
      getUsers() {
        axios.get(Endpoints.GET_USERS(), this.axiosConfig)
          .then(res => {
            this.users = res.data.users
          })
          .catch(error => {
            console.error(error)
          })
      },
      getApartments() {
        const URL = Endpoints.GET_APARTMENTS().concat('?status=livre')

        axios.get(URL, this.axiosConfig)
          .then(res => {
            this.apartments = res.data.apartments
          })
          .catch(error => {
            console.error(error)
          })
      },
      openConfirmReservaModal() {
        this.clearErrorFields()

        if (!this.isValidUser()) {
          this.setError('reserve', 'iptClient', 'Cliente não selecionado ou inválido.')
        }

        if (!this.isValidApartment()) {
          this.setError('reserve', 'iptApartment', 'Apartamento não selecionado ou inválido.')
        }

        if (!this.isValidStartDate()) {
          this.setError('reserve', 'iptStartDate', 'Data de início não informada ou inválida.')
        }

        if (!this.isValidEndDate()) {
          this.setError('reserve', 'iptEndDate', 'Data de fim não informada ou inválida.')
        }

        if (!this.isValidStatus()) {
          this.setError('reserve', 'iptStatus', 'O Status é inválido.')
        }

        if (!this.forms.reserve.hasErrors) {
          this.modals.confirmReserva.active = true
        }
      },
      closeConfirmReservaModal() {
        this.modals.confirmReserva.active = false
      },
      clearFields() {

        // Limpeza do formulário de reserva.
        this.forms.reserve.iptClient.value = { _id: '' }
        this.forms.reserve.iptApartment.value = { _id: '' }
        this.forms.reserve.iptStartDate.value = ''
        this.forms.reserve.iptEndDate.value = ''
        this.forms.reserve.iptStatus.value = this.statusList[0]
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
      isValidApartment() {
        let hasLength = this.forms.reserve.iptApartment.value._id.length == 24
        let isAlphanumeric = validator.isAlphanumeric(this.forms.reserve.iptApartment.value._id, ['pt-BR'])
        return hasLength && isAlphanumeric
      },
      isValidUser() {
        let hasLength = this.forms.reserve.iptClient.value._id.length == 24
        let isAlphanumeric = validator.isAlphanumeric(this.forms.reserve.iptClient.value._id, ['pt-BR'])
        return hasLength && isAlphanumeric
      },
      isValidName() {
        if (this.forms.searchClient.iptName.value) {
          let itsValidPT_BR = validator.isAlpha(this.forms.searchClient.iptName.value, ['pt-BR'], {
            ignore: ' \''
          })
          let itsValidEN_US = validator.isAlpha(this.forms.searchClient.iptName.value, ['en-US'], {
            ignore: ' \''
          })

          return itsValidPT_BR || itsValidEN_US
        }
        return true
      },
      isValidCPF() {
        if (this.forms.searchClient.iptCPF.value) {
          if (this.forms.searchClient.iptCPF.value && !this.forms.searchClient.iptPassportNumber.value) {
            let isInt = validator.isInt(this.forms.searchClient.iptCPF.value, {
              allow_leading_zeroes: true
            })
            let isLength = validator.isLength(this.forms.searchClient.iptCPF.value, {
              min: 11,
              max: 11
            })
            return isInt && isLength
          }
        }
        return true
      },
      isValidPassportNumber() {
        if (this.forms.searchClient.iptPassportNumber.value) {
          if (!this.forms.searchClient.iptCPF.value && this.forms.searchClient.iptPassportNumber.value) {
            let hasLengthRight = validator.isLength(this.forms.searchClient.iptPassportNumber.value, {
              min: 7,
              max: 8
            })
            let isAlphanumeric = validator.isAlphanumeric(this.forms.searchClient.iptPassportNumber.value, ['en-US'])

            return hasLengthRight && isAlphanumeric
          }
        }
        return true
      },
      searchClient() {
        this.clearErrorFields()
        let searchInfo = {}

        switch (this.forms.searchClient.type) {
          case 'name':
            if (!this.isValidName()) {
              this.setError('searchClient', 'iptName', 'Nome inválido.')
            }
            break
          case 'cpf':
            if (!this.isValidCPF()) {
              this.setError('searchClient', 'iptCPF', 'Número de CPF inválido.')
            }
            break
          case 'passportNumber':
            if (!this.isValidPassportNumber()) {
              this.setError('searchClient', 'iptPassportNumber', 'Número de Passaporte inválido.')
            }
            break
        }

        if (!this.forms.searchClient.hasErrors) {
          switch (this.forms.searchClient.type) {
            case 'nome':
              searchInfo.name = this.forms.searchClient.iptName.value
              break
            case 'cpf':
              searchInfo.cpf = this.forms.searchClient.iptCPF.value
              break
            default:
              searchInfo.passportNumber = this.forms.searchClient.iptPassportNumber.value
          }

          axios.post(Endpoints.POST_SEARCH_USER(), searchInfo, this.axiosConfig)
            .then(res => {
              this.users = res.data.users
            })
            .catch(error => {
              console.error(error)
            })
        }
      },
      registerReserve() {
        let newReserve = {
          apartment_id: this.forms.reserve.iptApartment.value._id,
          status: this.forms.reserve.iptStatus.value,
          client_id: this.forms.reserve.iptClient.value._id,
          start: this.forms.reserve.iptStartDate.value,
          end: this.forms.reserve.iptEndDate.value
        }

        axios.post(Endpoints.POST_RESERVE(), newReserve, this.axiosConfig)
          .then(() => {
            this.clearFields()
            this.closeConfirmReservaModal()
            this.getApartments()
            alert('Reserva feita com sucesso.')
            this.$router.push('/admin/reservas')
          })
          .catch(error => {
            this.closeConfirmReservaModal()
            if (error.response.data.RestException.ErrorFields) {
              error.response.data.RestException.ErrorFields.map(el => {
                this.setError('reserve', el.field, el.hasError.error)
              })
            }
          })
      }
    }
  }
</script>

<style scoped>
  
</style>