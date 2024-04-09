<template>
  <article id="reservas">
    <h1>Lista de reservas</h1>
    <hr>
    <div class="content">
      <SearchFilterComponent :resource="'reserves'" @queryString="getReserves($event)" />
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
  import SearchFilterComponent from '../apartments/SearchFilterComponent'
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
      SearchFilterComponent
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
      getReserves(queryString = '') {
        const URL = Endpoints.GET_RESERVES().concat(queryString)

        axios.get(URL, this.axiosConfig)
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