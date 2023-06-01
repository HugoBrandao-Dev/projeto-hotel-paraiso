<template>
  <article id="reservas">
    <h1>Lista de reservas</h1>
    <hr>
    <div class="content">
      <section id="search-filter" class="columns">
        <div class="column is-half mx-auto">
          <div class="box">
            <hgroup>
              <h2>Filtro</h2>
              <h3>Apartamento</h3>
            </hgroup>
            <div class="columns">
              <div class="field column">
                <label class="label">Status:</label>
                <div class="control">
                  <div 
                    class="select" 
                    :class="{'is-danger': search.apartment.iptStatus.hasError}"
                  >
                    <select v-model="search.apartment.iptStatus.value">
                      <option 
                        v-for="item in statusList" 
                        :key="item.id"
                        :value="item.id"
                        :selected="search.apartment.iptStatus.value"
                      >
                        {{ item.status }}
                      </option>
                    </select>
                  </div>
                </div>
                <p class="help is-danger" v-show="search.apartment.iptStatus.hasError">
                  {{ search.apartment.iptStatus.error }}
                </p>
              </div>
              <div class="field column">
                <label class="label">Andar:</label>
                <div class="control">
                  <input 
                    type="number"
                    class="input"
                    :class="{
                      'is-danger': search.apartment.iptFloor.hasError
                    }"
                    v-model="search.apartment.iptFloor.value"
                  />
                </div>
                <p class="help is-danger" v-show="search.apartment.iptFloor.hasError">
                  {{ search.apartment.iptFloor.error }}
                </p>
              </div>
              <div class="field column">
                <label class="label">Número:</label>
                <div class="control">
                  <input 
                    type="number" 
                    class="input"
                    :class="{
                      'is-danger': search.apartment.iptNumber.hasError
                    }"
                    v-model="search.apartment.iptNumber.value"
                  />
                </div>
                <p class="help is-danger" v-show="search.apartment.iptNumber.hasError">
                  {{ search.apartment.iptNumber.error }}
                </p>
              </div>
            </div>
            <div class="mb-4">
              <h3>Cliente</h3>
              <div>
                <div class="field">
                  <label class="label">Pesquisar por:</label>
                  <div class="control">
                    <label class="radio">
                      <input 
                        type="radio"
                        name="tipo-pesquisa"
                        value="nome"
                        v-model="search.client.type"
                      >
                        Nome
                    </label>
                    <label class="radio">
                      <input 
                        type="radio"
                        name="tipo-pesquisa"
                        value="cpf"
                        v-model="search.client.type"
                      >
                        CPF
                    </label>
                    <label class="radio">
                      <input 
                        type="radio"
                        name="tipo-pesquisa"
                        value="passport-number"
                        v-model="search.client.type"
                      >
                        Passport Number
                    </label>
                  </div>
                </div>
                <div class="field" v-if="search.client.type == 'nome'">
                  <div class="control has-icons-right">
                    <input 
                      class="input"
                      :class="{
                        'is-danger': search.client.iptName.hasError
                      }"
                      type="text"
                      placeholder="Tobias de Oliveira"
                      v-model="search.client.iptName.value"
                    />
                    <span class="icon is-small is-right" v-show="search.client.iptName.hasError">
                      <i class="fas fa-exclamation-triangle"></i>
                    </span>
                  </div>
                  <p class="help is-danger" v-show="search.client.iptName.hasError">
                    {{ search.client.iptName.error }}
                  </p>
                </div>
                <div class="field" v-else-if="search.client.type == 'cpf'">
                  <div class="control has-icons-right">
                    <imask-input
                      class="input"
                      :class="{
                        'is-danger': search.client.iptCPF.hasError
                      }"
                      type="text"
                      placeholder="000.000.000-00"
                      :mask="masks.cpf"
                      :unmask="true"
                      v-model="search.client.iptCPF.value"
                    />
                    <span class="icon is-small is-right" v-show="search.client.iptCPF.hasError">
                      <i class="fas fa-exclamation-triangle"></i>
                    </span>
                  </div>
                  <p class="help is-danger" v-show="search.client.iptCPF.hasError">
                    {{ search.client.iptCPF.error }}
                  </p>
                </div>
                <div class="field columns" v-else>
                    <div class="column is-full-mobile is-half-tablet">
                      <div class="control has-icons-left">
                        <div 
                          class="select"
                          :class="{
                            'is-loading': !countries.length,
                            'is-danger': search.client.iptCountry.hasError
                          }"
                        >
                          <select v-model="search.client.iptCountry.value">
                            <option
                              v-for="item in countries"
                              :key="item.iso2"
                              :value="item.iso2"
                              :selected="search.client.iptCountry.value"
                            >
                              {{ item.name }}
                            </option>
                          </select>
                        </div>
                        <div class="icon is-small is-left">
                          <i class="fas fa-globe"></i>
                        </div>
                      </div>
                      <p class="help is-danger" v-show="search.client.iptCountry.hasError">
                        {{ search.client.iptCountry.error }}
                      </p>
                    </div>
                    <div class="column is-full-mobile is-half-tablet">
                      <div class="control has-icons-right">
                        <imask-input
                          class="input"
                          :class="{
                            'is-danger': search.client.iptPassportNumber.hasError
                          }"
                          type="text"
                          placeholder="0A0A0A0A0A"
                          :mask="masks.passportNumber.custom"
                          v-model="search.client.iptPassportNumber.value"
                        />
                        <span class="icon is-small is-right" v-show="search.client.iptPassportNumber.hasError">
                          <i class="fas fa-exclamation-triangle"></i>
                        </span>
                      </div>
                      <p class="help is-danger" v-show="search.client.iptPassportNumber.hasError">
                        {{ search.client.iptPassportNumber.error }}
                      </p>
                    </div>
                </div>
              </div>
            </div>
            <div class="buttons is-right">
              <button class="button is-ghost" @click="clearFields()">Limpar</button>
              <button class="button is-info" @click="searchReserva()">Buscar</button>
            </div>
          </div>
        </div>
      </section>
      <div class="buttons is-right">
        <a href="/admin/reservas/new" class="button is-primary is-large">
          Nova Reserva
        </a>
      </div>

      <div id="admin-reservas">
        <table class="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th><abbr title="Nome do usuário.">Tipo</abbr></th>
              <th><abbr title="CPF do usuário.">Status</abbr></th>
              <th class="is-hidden-mobile"><abbr title="Telefone de contato do usuário.">Reservado por</abbr></th>
              <th><abbr title="Opções de ação.">Ações</abbr></th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th><abbr title="Nome do usuário.">Tipo</abbr></th>
              <th><abbr title="CPF do usuário.">Status</abbr></th>
              <th class="is-hidden-mobile"><abbr title="Telefone de contato do usuário.">Reservado por</abbr></th>
              <th><abbr title="Opções de ação.">Ações</abbr></th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="reserva in reservas" :key="reserva.id">
              <td>{{ reserva.tipo }}</td>
              <td>
                <span 
                  class="tag" 
                  :class="{
                    'is-success': reserva.status == 'Livre',
                    'is-danger': reserva.status == 'Ocupado'
                  }"
                >
                  {{ reserva.status }}
                </span>
              </td>
              <td class="is-hidden-mobile">
                {{ reserva.reservado_por }}
              </td>
              <td>
                <div class="dropdown is-right is-hidden-desktop">
                  <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" :aria-controls="reserva.id">
                      <span>
                        <i class="fas fa-ellipsis-v"></i>
                      </span>
                    </button>
                  </div>
                  <div class="dropdown-menu" :id="reserva.id" role="menu">
                    <div class="dropdown-content">
                      <div class="dropdown-item">
                        <div class="buttons">
                          <router-link :to="{
                              name: 'Reserva_admin',
                              params: {
                                id: reserva.id
                              }
                            }" class="button is-small is-info" title="Informação completa.">
                            <span class="icon is-small">
                              <i class="fas fa-info"></i>
                            </span>
                          </router-link>
                            <router-link :to="{
                                name: 'ReservaEdit_admin',
                                params: {
                                  id: reserva.id
                                }
                              }" class="button is-small is-warning" title="Editar usuário.">
                              <span class="icon is-small">
                                <i class="fas fa-edit"></i>
                              </span>
                            </router-link>
                            <form @submit.prevent="confirmDeletion()">
                              <input type="hidden" :value="reserva.id">
                              <button type="submit" class="button is-small is-danger" title="Deletar usuário.">
                                <span class="icon is-small">
                                  <i class="fas fa-trash-alt"></i>
                                </span>
                              </button>
                            </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="buttons is-hidden-touch">
                  <router-link :to="{
                    name: 'Reserva_admin',
                    params: {
                      id: reserva.id
                    }
                  }" class="button is-small is-info" title="Informação completa.">
                    <span class="icon is-small">
                      <i class="fas fa-info"></i>
                    </span>
                  </router-link>
                  <router-link :to="{
                    name: 'ReservaEdit_admin',
                    params: {
                      id: reserva.id
                    }
                  }" class="button is-small is-warning" title="Editar usuário.">
                    <span class="icon is-small">
                      <i class="fas fa-edit"></i>
                    </span>
                  </router-link>
                  <form @submit.prevent="confirmDeletion()">
                    <input type="hidden" :value="reserva.id">
                    <button type="submit" class="button is-small is-danger" title="Deletar usuário.">
                      <span class="icon is-small">
                        <i class="fas fa-trash-alt"></i>
                      </span>
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </article>
</template>

<script>
  import validator from 'validator'
  import { IMaskComponent }  from 'vue-imask'

  import axios from 'axios'

  let axios_countriesStatesCities = axios.create({
    headers: {
      'X-CSCAPI-KEY': 'UlRPNjR3OGhQOGhiRmloR0FWaDNwSGY2VzZIWlRKRzBNZDN5WUdPdQ=='
    }
  })

  export default {
    data() {
      return {
        masks: {
          cpf: '000.000.000-00',
          passportNumber: {
            custom: '*********',
            maxLength: 9
          }
        },
        countries: [],
        reservas: [
          {
            id: 1,
            tipo: 'Apartamento',
            status: 'Ocupado',
            reservado_por: 'Tobias de Oliveira'
          },
          {
            id: 2,
            tipo: 'Apartamento',
            status: 'Livre',
            reservado_por: 'N/A'
          },
          {
            id: 3,
            tipo: 'Apartamento',
            status: 'Ocupado',
            reservado_por: 'Doralice Cruz'
          },
          {
            id: 4,
            tipo: 'Apartamento',
            status: 'Livre',
            reservado_por: 'N/A'
          }
        ],
        statusList: [
          {
            id: 1,
            status: 'Livre'
          },
          {
            id: 2,
            status: 'Reservado'
          }
        ],
        search: {
          hasErrors: false,
          apartment: {
            iptStatus: {
              value: 1,
              hasError: false,
              error: ''
            },
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
          client: {
            type: 'nome',
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
            iptCountry: {
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
    created() {
      this.setCountries()
    },
    components: {
      'imask-input': IMaskComponent
    },
    methods: {
      async setCountries() {
        try {
          let resCountries = await axios_countriesStatesCities.get('https://api.countrystatecity.in/v1/countries')

          for (let item of resCountries.data) {
            this.countries.push({
              iso2: item.iso2,
              name: item.name
            })
          }

          this.search.client.iptCountry.value = this.countries[0].iso2
        } catch (error) {
          console.log(error)
        }
      },
      confirmDeletion() {
        if (confirm('Deseja deletar reserva?')) {
          alert('Reserva deletada com sucesso.')
        }
      },
      clearFields() {
        this.search.apartment.hasErrors = false
        let fieldsSearch = Object.keys(this.search)
        fieldsSearch.forEach(searchField => {
          let fields = Object.keys(this.search[searchField])
          fields.forEach(field => {
            if (field.indexOf('ipt') >= 0) {
              if (field == 'iptStatus') {
                this.search[searchField][field].value = 1
                return
              }
              this.search[searchField][field].value = ''
            }
          })
        })
        this.search.client.type = 'nome'
      },
      clearErrorFields() {
        this.search.apartment.hasErrors = false
        let fieldsSearch = Object.keys(this.search)
        fieldsSearch.forEach(searchField => {
          let fields = Object.keys(this.search[searchField])
          fields.forEach(field => {
            if (field.indexOf('ipt') >= 0) {
              this.search[searchField][field].hasError = false
              this.search[searchField][field].error = ''
            }
          })
        })
      },
      setError(field, msg) {
        this.search.hasErrors = true
        let fieldsSearch = Object.keys(this.search)
        fieldsSearch.forEach(searchField => {
          let fields = Object.keys(this.search[searchField])
          let isInside = fields.indexOf(field) >= 0
          if (isInside) {
            this.search[searchField][field].hasError = true
            this.search[searchField][field].error = msg
          }
        })
      },
      isValidStatus() {
        let ids = this.statusList.map(item => (item.id).toString())
        let id = (this.search.apartment.iptStatus.value).toString()
        return validator.isIn(id, ids)
      },
      isValidFloor() {
        let isInt = validator.isInt(this.search.apartment.iptFloor.value, {
          min: 0
        })
        let isEmpty = validator.isEmpty(this.search.apartment.iptFloor.value)
        return isInt || isEmpty
      },
      isValidNumber() {
        let isInt = validator.isInt(this.search.apartment.iptNumber.value, {
          min: 1
        })
        let isEmpty = validator.isEmpty(this.search.apartment.iptNumber.value)
        return isInt || isEmpty
      },
      isValidName() {
        let isEmpty = validator.isEmpty(this.search.client.iptName.value)
        let stringPT_BR = validator.isAlpha(this.search.client.iptName.value, ['pt-BR'], {
          ignore: ' \''
        })
        let stringEN_US = validator.isAlpha(this.search.client.iptName.value, ['en-US'], {
          ignore: ' \''
        })
        return stringPT_BR || stringEN_US || isEmpty
      },
      isValidCPF() {
        let isInt = validator.isInt(this.search.client.iptCPF.value, {
          allow_leading_zeroes: true
        })
        let isLength = validator.isLength(this.search.client.iptCPF.value, {
          min: 11,
          max: 11
        })

        return isInt && isLength
      },
      isValidCountry() {
        return validator.isISO31661Alpha2(this.search.client.iptCountry.value)
      },
      isValidPassportNumber() {
        let isEmpty = validator.isEmpty(this.search.client.iptPassportNumber.value)
        let isPassportNumber = validator.isPassportNumber(this.search.client.iptPassportNumber.value, this.search.client.iptCountry.value)

        return isEmpty || isPassportNumber
      },
      searchReserva() {
        this.clearErrorFields()
        if (!this.isValidStatus()) {
          this.setError('iptStatus', 'Status inválido.')
        }
        if (!this.isValidFloor()) {
          this.setError('iptFloor', 'Andar inválido.')
        }
        if (!this.isValidNumber()) {
          this.setError('iptNumber', 'Número inválido.')
        }
        if (!this.isValidName()) {
          this.setError('iptName', 'Nome inválido.')
        }
        if (!this.isValidCPF()) {
          this.setError('iptCPF', 'Número do CPF inválido.')
        }
        if (!this.isValidCountry()) {
          this.setError('iptCountry', 'País inválido.')
        } else {
          if (!this.isValidPassportNumber()) {
            this.setError('iptPassportNumber', 'Número do passaporte inválido.')
          }
        }
      }
    }
  }
</script>

<style scoped>
  
</style>