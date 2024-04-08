<template>
  <article id="reservas">
    <h1>Lista de reservas</h1>
    <hr>
    <div class="content">
      <!--
      <section id="search-filter" class="columns">
        <div class="column is-half mx-auto">
          <div class="box">
            <div class="mb-4">
              <hgroup>
                <h2>Filtro</h2>
                <h3>Cliente</h3>
              </hgroup>
              <div>
                <div class="field">
                  <label class="label">Pesquisar por:</label>
                  <div class="control">
                    <label class="radio">
                      <input 
                        type="radio"
                        name="tipo-pesquisa"
                        value="name"
                        v-model="forms.searchClient.type"
                      >
                        Nome
                    </label>
                    <label class="radio">
                      <input 
                        type="radio"
                        name="tipo-pesquisa"
                        value="cpf"
                        v-model="forms.searchClient.type"
                      >
                        CPF
                    </label>
                    <label class="radio">
                      <input 
                        type="radio"
                        name="tipo-pesquisa"
                        value="passportNumber"
                        v-model="forms.searchClient.type"
                      >
                        Passport Number
                    </label>
                  </div>
                </div>
                <div class="field" v-if="forms.searchClient.type == 'name'">
                  <div class="control has-icons-right">
                    <input 
                      class="input"
                      :class="{
                        'is-danger': forms.searchClient.iptName.hasError
                      }"
                      type="text"
                      placeholder="Tobias de Oliveira"
                      v-model="forms.searchClient.iptName.value"
                    />
                    <span class="icon is-small is-right" v-show="forms.searchClient.iptName.hasError">
                      <i class="fas fa-exclamation-triangle"></i>
                    </span>
                  </div>
                  <p class="help is-danger" v-show="forms.searchClient.iptName.hasError">
                    {{ forms.searchClient.iptName.error }}
                  </p>
                </div>
                <div class="field" v-else-if="forms.searchClient.type == 'cpf'">
                  <div class="control has-icons-right">
                    <imask-input
                      class="input"
                      :class="{
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
                  </div>
                  <p class="help is-danger" v-show="forms.searchClient.iptCPF.hasError">
                    {{ forms.searchClient.iptCPF.error }}
                  </p>
                </div>
                <div class="field columns" v-else>
                    <div class="column is-full-mobile is-half-tablet">
                      <div class="control has-icons-left">
                        <div 
                          class="select"
                          :class="{
                            'is-loading': !countries.length,
                            'is-danger': forms.searchClient.iptCountry.hasError
                          }"
                        >
                          <select v-model="forms.searchClient.iptCountry.value">
                            <option
                              v-for="item in countries"
                              :key="item.iso2"
                              :value="item.iso2"
                              :selected="forms.searchClient.iptCountry.value"
                            >
                              {{ item.name }}
                            </option>
                          </select>
                        </div>
                        <div class="icon is-small is-left">
                          <i class="fas fa-globe"></i>
                        </div>
                      </div>
                      <p class="help is-danger" v-show="forms.searchClient.iptCountry.hasError">
                        {{ forms.searchClient.iptCountry.error }}
                      </p>
                    </div>
                    <div class="column is-full-mobile is-half-tablet">
                      <div class="control has-icons-right">
                        <imask-input
                          class="input"
                          :class="{
                            'is-danger': forms.searchClient.iptPassportNumber.hasError
                          }"
                          type="text"
                          placeholder="0A0A0A0A0A"
                          :mask="masks.passportNumber.custom"
                          v-model="forms.searchClient.iptPassportNumber.value"
                        />
                        <span class="icon is-small is-right" v-show="forms.searchClient.iptPassportNumber.hasError">
                          <i class="fas fa-exclamation-triangle"></i>
                        </span>
                      </div>
                      <p class="help is-danger" v-show="forms.searchClient.iptPassportNumber.hasError">
                        {{ forms.searchClient.iptPassportNumber.error }}
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
      -->
      <div class="buttons is-right">
        <a href="/admin/reservas/new" class="button is-primary is-large">
          Nova Reserva
        </a>
      </div>

      <div id="admin-reservas">
        <table class="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th>Cliente</th>
              <th><abbr title="Início da reserva">Início</abbr></th>
              <th><abbr title="Fim da reserva">Fim</abbr></th>
              <th class="is-hidden-mobile">Status</th>
              <th><abbr title="Opções de ação.">Ações</abbr></th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th>Cliente</th>
              <th><abbr title="Início da reserva">Início</abbr></th>
              <th><abbr title="Fim da reserva">Fim</abbr></th>
              <th class="is-hidden-mobile">Status</th>
              <th><abbr title="Opções de ação.">Ações</abbr></th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="item in reserves" :key="item._id">
              <td 
                class="is-capitalized"
                v-if="item.reserve.CLIENT_ID && item.reserve.CLIENT_ID.length">
                {{ item.reserve.CLIENT_ID[0].name }}
              </td>
              <td class="is-capitalized" v-else>???????</td>
              <td>
                {{ item.reserve.start | formatDate }}
              </td>
              <td>
                {{ item.reserve.end | formatDate }}
              </td>
              <td class="is-hidden-mobile">
                <span 
                  class="tag" 
                  :class="{
                    'is-link': item.reserve.status == 'reservado',
                    'is-danger': item.reserve.status == 'ocupado'
                  }"
                >
                  {{ item.reserve.status }}
                </span>
              </td>
              <td>
                <div class="dropdown is-right is-hidden-desktop" @click="showMenuMobile(item._id)">
                  <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" :aria-controls="item._id">
                      <span>
                        <i class="fas fa-ellipsis-v"></i>
                      </span>
                    </button>
                  </div>
                  <div class="dropdown-menu" :id="item._id" role="menu">
                    <div class="dropdown-content">
                      <div class="dropdown-item">
                        <div class="buttons">
                          <router-link :to="{
                              name: 'Reserva_admin',
                              params: {
                                id: item._id
                              }
                            }" class="button is-small is-info" title="Informação completa.">
                            <span class="icon is-small">
                              <i class="fas fa-info"></i>
                            </span>
                          </router-link>
                          <router-link :to="{
                              name: 'ReservaEdit_admin',
                              params: {
                                id: item._id
                              }
                            }" class="button is-small is-warning" title="Editar usuário.">
                            <span class="icon is-small">
                              <i class="fas fa-edit"></i>
                            </span>
                          </router-link>
                          <form @submit.prevent="confirmDeletion(item._links.find(el => el.rel == 'delete_reserve').href)">
                            <input type="hidden" :value="item._id">
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
                      id: item._id
                    }
                  }" class="button is-small is-info" title="Informação completa.">
                    <span class="icon is-small">
                      <i class="fas fa-info"></i>
                    </span>
                  </router-link>
                  <router-link :to="{
                    name: 'ReservaEdit_admin',
                    params: {
                      id: item._id
                    }
                  }" class="button is-small is-warning" title="Editar usuário.">
                    <span class="icon is-small">
                      <i class="fas fa-edit"></i>
                    </span>
                  </router-link>
                  <form @submit.prevent="confirmDeletion(item._links.find(el => el.rel == 'delete_reserve').href)">
                    <input type="hidden" :value="item._id">
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
  // import { IMaskComponent }  from 'vue-imask'
  import axios from 'axios'
  import Endpoints from '@/tools/EndpointsConfig'

  let axios_countriesStatesCities = axios.create({
    headers: {
      'X-CSCAPI-KEY': 'UlRPNjR3OGhQOGhiRmloR0FWaDNwSGY2VzZIWlRKRzBNZDN5WUdPdQ=='
    }
  })

  export default {
    components: {
      // 'imask-input': IMaskComponent
    },
    created() {
      this.setCountries()
      this.getReserves()
    },
    filters: {
      formatDate(date) {
        return new Date(date).toLocaleDateString()
      }
    },
    data() {
      return {
        axiosConfig: {
          headers: {
            Authorization: `Bearer ${ localStorage.getItem('token_hotel_paraiso') }`
          }
        },
        masks: {
          cpf: '000.000.000-00',
          passportNumber: {
            custom: '*********',
            maxLength: 9
          }
        },
        countries: [],
        reserves: [],
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
        forms: {
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
          },
        }
      }
    },
    methods: {
      showMenuMobile(elementID) {
        let parentElement = document.getElementById(elementID).parentElement
        parentElement.classList.toggle('is-active')
      },
      getReserves() {
        axios.get(Endpoints.GET_RESERVES(), this.axiosConfig)
          .then(res => {
            this.reserves = res.data.reserves
          })
          .catch(error => {
            console.error(error)
          })
      },
      async setCountries() {
        try {
          let resCountries = await axios_countriesStatesCities.get('https://api.countrystatecity.in/v1/countries')

          for (let item of resCountries.data) {
            this.countries.push({
              iso2: item.iso2,
              name: item.name
            })
          }

          this.forms.searchClient.iptCountry.value = this.countries[0].iso2
        } catch (error) {
          console.log(error)
        }
      },
      confirmDeletion(delete_reserve_link) {
        if (confirm('Deseja deletar reserva?')) {
          axios.delete(delete_reserve_link, this.axiosConfig)
            .then(() => {
              this.getReserves()
            })
            .catch(error => console.error(error))
        }
      },
      clearFields() {
        this.forms.searchClient.type = 'name'
        let allForms = Object.keys(this.forms)
        for (let form of allForms) {
          let allFields = Object.keys(this.forms[form])
          for (let field of allFields) {
            if (Object.keys(this.forms[form][field]).includes('value')) {
              this.forms[form][field].value = ''
            }
          }
        }
      },
      clearErrorFields() {
        let allForms = Object.keys(this.forms)
        for (let form of allForms) {
          this.forms[form].hasErrors = false
          let allFields = Object.keys(this.forms[form])
          for (let field of allFields) {
            if (Object.keys(this.forms[form][field]).includes('hasError')) {
              this.forms[form][field].hasError = false
              this.forms[form][field].error = ''
            }
          }
        }
      },
      setError(form, field, msg) {
        this.forms[form].hasErrors = true
        this.forms[form][field].hasError = true
        this.forms[form][field].error = msg
      },
      isValidName() {
        let isEmpty = validator.isEmpty(this.forms.searchClient.iptName.value)
        let stringPT_BR = validator.isAlpha(this.forms.searchClient.iptName.value, ['pt-BR'], {
          ignore: ' \''
        })
        let stringEN_US = validator.isAlpha(this.forms.searchClient.iptName.value, ['en-US'], {
          ignore: ' \''
        })
        return stringPT_BR || stringEN_US || isEmpty
      },
      isValidCPF() {
        let isInt = validator.isInt(this.forms.searchClient.iptCPF.value, {
          allow_leading_zeroes: true
        })
        let isLength = validator.isLength(this.forms.searchClient.iptCPF.value, {
          min: 11,
          max: 11
        })

        return isInt && isLength
      },
      isValidCountry() {
        return validator.isISO31661Alpha2(this.forms.searchClient.iptCountry.value)
      },
      isValidPassportNumber() {
        let isEmpty = validator.isEmpty(this.forms.searchClient.iptPassportNumber.value)
        let isPassportNumber = validator.isPassportNumber(this.forms.searchClient.iptPassportNumber.value, this.forms.searchClient.iptCountry.value)

        return isEmpty || isPassportNumber
      },
      searchReserva() {
        this.clearErrorFields()

        switch (this.forms.searchClient.type) {
          case 'name':
            if (!this.isValidName()) {
              this.setError('searchClient', 'iptName', 'Nome inválido.')
            }
            break
          case 'cpf':
            if (!this.isValidCPF()) {
              this.setError('searchClient', 'iptCPF', 'Número do CPF inválido.')
            }
            break
          case 'passportNumber':
            if (!this.isValidCountry()) {
              this.setError('searchClient', 'iptCountry', 'País inválido.')
            } else {
              if (!this.isValidPassportNumber()) {
                this.setError('searchClient', 'iptPassportNumber', 'Número do passaporte inválido.')
              }
            }
            break
        }

        if (!this.forms.searchClient.hasErrors) {
          console.log('Busca feita com sucesso.')
        }
      }
    }
  }
</script>

<style scoped>
  
</style>