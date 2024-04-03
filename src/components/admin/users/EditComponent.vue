<template>
  <div id="user-edit">
    <h1>Edição de informações</h1>
    <hr>
    <div class="card">
      <div class="card-content">
        <form>
          <fieldset>
            <div class="field">
              <div class="modal" :class="{'is-active': windows.registredWithSuccess.active}">
                <div class="modal-background" @click.stop.prevent="closeSuccessfulModal()"></div>
                <div class="modal-card">
                  <header class="modal-card-head">
                    <p class="modal-card-title">Atualizado</p>
                    <button class="delete" @click.stop.prevent="closeSuccessfulModal()" aria-label="close"></button>
                  </header>
                  <section class="modal-card-body">
                    As informações do usuário foram atualizadas com sucesso.
                  </section>
                  <footer class="modal-card-foot">
                    <div class="buttons">
                      <button class="button is-success" @click.stop.prevent="closeSuccessfulModal()">OK</button>
                    </div>
                  </footer>
                </div>
              </div>
              <div class="columns">
                <div class="field column is-two-third">
                  <label class="label">Nome:</label>
                  <div class="control" :class="{ 'has-icons-right': form.iptName.hasError }">
                    <input 
                      class="input"
                      :class="{
                        'is-normal': !form.iptName.hasError,
                        'is-danger': form.iptName.hasError
                      }"
                      type="text"
                      placeholder="Nome completo"
                      v-model="form.iptName.value"
                    />
                    <span class="icon is-small is-right" v-show="form.iptName.hasError">
                      <i class="fas fa-exclamation-triangle"></i>
                    </span>
                  </div>
                  <p class="help" :class="{ 'is-danger': form.iptName.hasError }">
                    {{ form.iptName.error }}
                  </p>
                </div>
                <div class="field column is-one-third">
                  <label class="label">Data de nascimento:</label>
                  <div class="control">
                    <input 
                      class="input"
                      :class="{
                        'is-normal': !form.iptBirthDate.hasError,
                        'is-danger': form.iptBirthDate.hasError
                      }"
                      type="date"
                      v-model="form.iptBirthDate.value"
                    />
                  </div>
                  <p class="help" :class="{'is-danger': form.iptBirthDate.hasError}">
                    {{ form.iptBirthDate.error }}
                  </p>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="field column is-two-third">
                <label class="label">Email:</label>
                <div class="control" :class="{ 'has-icons-right': form.iptEmail.hasError }">
                  <input 
                    class="input"
                    :class="{
                      'is-normal': !form.iptEmail.hasError,
                      'is-danger': form.iptEmail.hasError
                    }"
                    v-model="form.iptEmail.value"
                    type="email"
                    placeholder="exemplo@hotmail.com"
                  />
                  <span class="icon is-small is-right" v-show="form.iptEmail.hasError">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
                <p class="help" :class="{ 'is-danger': form.iptEmail.hasError }">
                  {{ form.iptEmail.error }}
                </p>
              </div>
              <div class="field column is-one-third">
                <label class="label">Função</label>
                <div class="control">
                  <div class="select">
                    <select v-model="form.iptRole.value">
                      <option 
                        v-for="role in roles" 
                        :key="role.value" 
                        :value="role.value"
                      >
                        {{ role.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <p class="help" :class="{ 'is-danger': form.iptRole.hasError }">
                  {{ form.iptRole.error }}
                </p>
              </div>
            </div>

            <div class="box columns mt-2">
              <div class="field column is-half">
                <label class="label">Senha:</label>
                <div class="control" :class="{ 'has-icons-right': form.iptPassword.hasError }">
                  <input 
                    type="password" 
                    class="input is-normal"
                    :class="{
                      'is-normal': !form.iptPassword.hasError,
                      'is-danger': form.iptPassword.hasError
                    }"
                    v-model="form.iptPassword.value1"
                  />
                  <span class="icon is-small is-right" v-show="form.iptPassword.hasError">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
                <p class="help" :class="{ 'is-danger': form.iptPassword.hasError }">
                  {{ form.iptPassword.error }}
                </p>
              </div>
              <div class="field column">
                <label class="label">Repita a senha:</label>
                <div class="control" :class="{ 'has-icons-right': form.iptPassword.hasError }">
                  <input 
                    type="password" 
                    class="input is-normal"
                    :class="{
                      'is-normal': !form.iptPassword.hasError,
                      'is-danger': form.iptPassword.hasError
                    }"
                    v-model="form.iptPassword.value2"
                  />
                  <span class="icon is-small is-right" v-show="form.iptPassword.hasError">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
              </div>
            </div>

            <div class="columns">
              <div class="field column is-one-third">
                <label class="label">País/Country:</label>
                <p class="control has-icons-left">
                  <span 
                    class="select" 
                    :class="{
                      'is-loading': !countries.length,
                      'is-danger': form.iptCountry.hasError
                    }"
                  >
                    <select v-model="form.iptCountry.value" @change="setStatesAndPhoneCode()">
                      <option 
                        v-for="item in countries" 
                        :key="item.iso2"
                        :value="item.iso2"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                  </span>
                  <span class="icon is-small is-left">
                    <i class="fas fa-globe"></i>
                  </span>
                </p>
                <p class="help" :class="{ 'is-danger': form.iptCountry.hasError }">
                  {{ form.iptCountry.error }}
                </p>
              </div>
              <div class="field column is-one-third">
                <label class="label">Estado/State:</label>
                <div class="control">
                  <div 
                    class="select"
                    :class="{
                      'is-loading': loadingStates,
                      'is-danger': form.iptState.hasError
                    }"
                  >
                    <select v-model="form.iptState.value" @change="setCities()" :disabled="disableStatesAndCitiesFields">
                      <option 
                        v-for="item in states" 
                        :key="item.iso2" 
                        :value="item.iso2"
                        :selected="item.iso2 == form.iptState.value"
                      >
                        {{ item.iso2 }}
                      </option>
                    </select>
                  </div>
                </div>
                <p class="help" :class="{ 'is-danger': form.iptState.hasError }">
                  {{ form.iptState.error }}
                </p>
              </div>
              <div class="field column is-one-third">
                <label class="label">Cidade/City:</label>
                <div class="control">
                  <div
                    class="select"
                    :class="{
                      'is-loading': loadingCities,
                      'is-danger': form.iptCity.hasError
                    }"
                  >
                    <select v-model="form.iptCity.value" :disabled="disableStatesAndCitiesFields">
                      <option 
                        v-for="item in cities" 
                        :key="item.name" 
                        :value="item.name"
                        :selected="item.name == form.iptCity.value"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <p class="help" :class="{'is-danger': form.iptCity.hasError}">
                  {{ form.iptCity.error }}
                </p>
              </div>
            </div>

            <div class="columns">
              <div class="field column is-half">
                <label class="label">
                  CPF:
                  <span 
                    v-show="!disablePassportNumber"
                    class="icon has-text-info"
                    title="Required only for Brazilians."
                  >
                    <i class="fas fa-info-circle"></i>
                  </span>
                </label>
                <div class="control" :class="{ 'has-icons-right': form.iptCPF.hasError }">
                  <imask-input 
                    class="input"
                    :class="{
                      'is-normal': !form.iptCPF.hasError,
                      'is-danger': form.iptCPF.hasError
                    }"
                    type="text"
                    :mask="masks.cpf"
                    :unmask="true"
                    v-model="form.iptCPF.value"
                    placeholder="000.000.000-00"
                    :disabled="!disablePassportNumber"
                  />
                  <span class="icon is-small is-right" v-show="form.iptCPF.hasError">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
                <p class="help" :class="{ 'is-danger': form.iptCPF.hasError }">
                  {{ form.iptCPF.error }}
                </p>
              </div>
              <div class="field column is-half">
                <label class="label">
                  Passport Number:
                  <span 
                    v-show="disablePassportNumber"
                    class="icon has-text-info"
                    title="Necessário somente para estrangeiros."
                  >
                    <i class="fas fa-info-circle"></i>
                  </span>
                </label>
                <div class="control" :class="{ 'has-icons-right': form.iptPassportNumber.hasError }">
                  <imask-input 
                    class="input"
                    :class="{
                      'is-normal': !form.iptPassportNumber.hasError,
                      'is-danger': form.iptPassportNumber.hasError
                    }"
                    type="text"
                    :mask="masks.passportNumber.custom"
                    :unmask="true"
                    v-model="form.iptPassportNumber.value"
                    placeholder="0A0A0A0A0A"
                    :disabled="disablePassportNumber"
                  />
                  <span class="icon is-small is-right" v-show="form.iptPassportNumber.hasError">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
                <p class="help" :class="{ 'is-danger': form.iptPassportNumber.hasError }">
                  {{ form.iptPassportNumber.error }}
                </p>
              </div>
            </div>
            
            <div class="field">
              <label class="label">Telefone:</label>
              <div class="field-label"></div>
              <div class="field-body">
                <div class="field is-expanded">
                  <div class="field has-addons">
                    <p class="control">
                      <a class="button is-static">
                        +{{ form.iptPhoneCode }}
                      </a>
                    </p>
                    <p class="control is-expanded">
                      <imask-input 
                        class="input"
                        :class="{
                          'is-normal': !form.iptPhoneNumber.hasError,
                          'is-danger': form.iptPhoneNumber.hasError
                        }"
                        type="tel"
                        :mask="masks.telefone"
                        :unmask="true"
                        v-model="form.iptPhoneNumber.value"
                        placeholder="(00) 00000-0000"
                      />
                    </p>
                  </div>
                  <p class="help" :class="{ 'is-danger': form.iptPhoneNumber.hasError }">
                    {{ form.iptPhoneNumber.error }}
                  </p>
                </div>
              </div>
            </div>

            <div class="field" v-show="form.iptCountry.value == 'BR'">
              <label class="label">CEP:</label>
              <div class="control" :class="{ 'has-icons-right': form.iptCEP.hasError }">
                <imask-input 
                  class="input"
                  :class="{
                    'is-normal': !form.iptCEP.hasError,
                    'is-danger': form.iptCEP.hasError
                  }"
                  type="text"
                  :mask="masks.cep"
                  :unmask="true"
                  placeholder="00000-000"
                  :disabled="disableCEP"
                  v-model="form.iptCEP.value"
                />
                <span class="icon is-small is-right" v-show="form.iptCEP.hasError">
                  <i class="fas fa-exclamation-triangle"></i>
                </span>
              </div>
              <p class="help" :class="{ 'is-danger': form.iptCEP.hasError }">
                {{ form.iptCEP.error }}
              </p>
            </div>

            <div class="columns">
              <div class="field column is-one-third">
                <label class="label">Bairro:</label>
                <div class="control" :class="{ 'has-icons-right': form.iptNeighborhood.hasError }">
                  <input 
                    class="input"
                    :class="{
                      'is-normal': !form.iptNeighborhood.hasError,
                      'is-danger': form.iptNeighborhood.hasError
                    }"
                    type="text"
                    placeholder="Nome do bairro onde você reside."
                    v-model="form.iptNeighborhood.value"
                  />
                  <span class="icon is-small is-right" v-show="form.iptNeighborhood.hasError">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
                <p class="help" :class="{ 'is-danger': form.iptNeighborhood.hasError }">
                  {{ form.iptNeighborhood.error }}
                </p>
              </div>

              <div class="field column is-one-third">
                <label class="label">Rua/Avenida:</label>
                <div class="control" :class="{ 'has-icons-right': form.iptRoad.hasError }">
                  <input 
                    class="input"
                    :class="{
                      'is-normal': !form.iptRoad.hasError,
                      'is-danger': form.iptRoad.hasError
                    }"
                    type="text"
                    placeholder="Nome da rua/Av. Um exemplo"
                    v-model="form.iptRoad.value"
                  />
                  <span class="icon is-small is-right" v-show="form.iptRoad.hasError">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
                <p class="help" :class="{ 'is-danger': form.iptRoad.hasError }">
                  {{ form.iptRoad.error }}
                </p>
              </div>

              <div class="field column is-one-third">
                <label class="label">Nº da residência:</label>
                <div class="control" :class="{ 'has-icons-right': form.iptHouseNumber.hasError }">
                  <input 
                    class="input"
                    :class="{
                      'is-normal': !form.iptHouseNumber.hasError,
                      'is-danger': form.iptHouseNumber.hasError
                    }"
                    type="text"
                    placeholder="00000"
                    v-model="form.iptHouseNumber.value"
                  />
                  <span class="icon is-small is-right" v-show="form.iptHouseNumber.hasError">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
                <p class="help" :class="{ 'is-danger': form.iptHouseNumber.hasError }">
                  {{ form.iptHouseNumber.error }}
                </p>
              </div>
            </div>

            <div class="field">
              <label class="label">Informações adicionais:</label>
              <div class="control" :class="{ 'has-icons-right': form.iptAdditionalInformation.hasError }">
                <textarea 
                  class="textarea" 
                  :class="{
                    'is-danger': form.iptAdditionalInformation.hasError
                  }"
                  placeholder="Deseja nos informar de mais alguma coisa?" 
                  rows="10"
                  v-model="form.iptAdditionalInformation.value"
                ></textarea>
                <span class="icon is-small is-right" v-show="form.iptAdditionalInformation.hasError">
                  <i class="fas fa-exclamation-triangle"></i>
                </span>
              </div>
              <p class="help" :class="{ 'is-danger': form.iptAdditionalInformation.hasError }">
                {{ form.iptAdditionalInformation.error }}
              </p>
            </div>

            <div class="container is-flex is-justify-content-center">
              <button
                type="submit" 
                class="button is-link"
                @click.prevent="updateUser()">
                Atualizar
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import validator from 'validator'
  import { IMaskComponent }  from 'vue-imask'
  import Endpoints  from '@/tools/EndpointsConfig'

  let axios_countriesStatesCities = axios.create({
    headers: {
      'X-CSCAPI-KEY': 'UlRPNjR3OGhQOGhiRmloR0FWaDNwSGY2VzZIWlRKRzBNZDN5WUdPdQ=='
    }
  })
  
  export default {
    created() {
      this.setCountries()
    },
    data() {
      return {
        userAccount: {
          isLogged: false,
          isClient: false,
          _links: []
        },
        roles: [
          {
            name: 'Cliente',
            value: '0'
          },
          {
            name: 'Funcionário(a)',
            value: '1'
          },
          {
            name: 'Gerente',
            value: '2'
          },
        ],
        countries: [],
        states: [],
        cities: [],
        form: {
          hasErrors: false,
          iptName: {
            value: '',
            hasError: false,
            error: ''
          },
          iptBirthDate: {
            value: '',
            hasError: false,
            error: ''
          },
          iptEmail: {
            value: '',
            hasError: false,
            error: ''
          },
          iptRole: {
            value: '',
            hasError: false,
            error: ''
          },
          // Tem dois valores porque um é da senha e outro é a sua repetição, para comparação.
          iptPassword: {
            value1: '',
            value2: '',
            hasError: false,
            error: ''
          },
          iptCountry: {
            value: '',
            hasError: false,
            error: ''
          },
          iptPhoneCode: '',
          iptState: {
            value: '',
            hasError: false,
            error: ''
          },
          iptCity: {
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
          },
          iptPhoneNumber: {
            value: '',
            hasError: false,
            error: ''
          },
          iptCEP: {
            value: '',
            hasError: false,
            error: ''
          },
          iptNeighborhood: {
            value: '',
            hasError: false,
            error: ''
          },
          iptRoad: {
            value: '',
            hasError: false,
            error: ''
          },
          iptHouseNumber: {
            value: '',
            hasError: false,
            error: ''
          },
          iptAdditionalInformation: {
            value: '',
            hasError: false,
            error: ''
          }
        },
        masks: {
          cpf: '000.000.000-00',
          telefone: '(00) 00000-0000',
          cep: '00000-000',
          passportNumber: {
            custom: '*********',
            maxLength: 9
          }
        },
        windows: {
          termsConditions: {
            active: false
          },
          registredWithSuccess: {
            active: false
          }
        }
      }
    },
    components: {
      'imask-input': IMaskComponent
    },
    computed: {
      disablePassportNumber() {
        return this.form.iptCountry.value == 'BR'
      },
      disableCEP() {
        let cepString = this.form.iptCity.value.toString()
        return cepString.length > 0 && this.form.iptCEP.value.length == 0
      },
      disableStatesAndCitiesFields() {
        return this.form.iptCEP.value.length > 0
      },
      loadingStates() {
        return this.form.iptCountry.value && !this.states.length
      },
      loadingCities() {
        return this.form.iptState.value && !this.cities.length
      }
    },
    watch: {
      'form.iptCEP.value': async function(cep) {
        if (cep.length == 8) {
          try {
            let resCEP = await axios.get(`https://viacep.com.br/ws/${ cep }/json/`)
            this.form.iptNeighborhood.value = resCEP.data.bairro
            this.form.iptRoad.value = resCEP.data.logradouro
            this.form.iptState.value = resCEP.data.uf
            this.form.iptCity.value = resCEP.data.localidade

            await this.setStatesAndPhoneCode(false)
            await this.setCities(false)
          } catch (error) {
            console.log(error)
          }
        }
      }
    },
    methods: {
      isValidName() {
        if (this.form.iptName.value) {
          let itsValidPT_BR = validator.isAlpha(this.form.iptName.value, ['pt-BR'], {
            ignore: ' \''
          })
          let itsValidEN_US = validator.isAlpha(this.form.iptName.value, ['en-US'], {
            ignore: ' \''
          })

          return itsValidPT_BR || itsValidEN_US
        }
        return true
      },
      isValidBirthDate() {
        if (this.form.iptBirthDate.value) {
          return validator.isDate(this.form.iptBirthDate.value)
        }
        return true
      },
      isValidEmail() {
        if (this.form.iptEmail.value) {
          return validator.isEmail(this.form.iptEmail.value)
        }
        return true
      },
      isValidRole() {
        if (this.form.iptRole.value == '') {
          return true
        } else {
          return validator.isInt(this.form.iptRole.value, {
            min: 0,
            max: 3
          })
        }
      },
      isValidPassword() {
        if (this.form.iptPassword.value1) {
          return validator.isStrongPassword(this.form.iptPassword.value1)
        }
        return true
      },
      isValidCountry() {
        if (this.form.iptCountry.value) {
          return validator.isISO31661Alpha2(this.form.iptCountry.value)
        }
        return true
      },
      isValidCPF() {
        if (this.form.iptCPF.value) {
          if (this.form.iptCPF.value && !this.form.iptPassportNumber.value) {
            let isInt = validator.isInt(this.form.iptCPF.value, {
              allow_leading_zeroes: true
            })
            let isLength = validator.isLength(this.form.iptCPF.value, {
              min: 11,
              max: 11
            })
            return isInt && isLength
          }
        }
        return true
      },
      isValidPassportNumber() {
        if (this.form.iptPassportNumber.value) {
          if (!this.form.iptCPF.value && this.form.iptPassportNumber.value) {
            let hasLengthRight = validator.isLength(this.form.iptPassportNumber.value, {
              min: 8,
              max: 9
            })
            let isAlphanumeric = validator.isAlphanumeric(this.form.iptPassportNumber.value, ['en-US'])

            return hasLengthRight && isAlphanumeric
          }
        }
        return true
      },
      isValidNeighborhood() {
        if (this.form.iptNeighborhood.value) {
          let itsValidPT_BR = validator.isAlphanumeric(this.form.iptNeighborhood.value, ['pt-BR'], {
            ignore: ' \':,.'
          })

          let itsValidEN_US = validator.isAlphanumeric(this.form.iptNeighborhood.value, ['en-US'], {
            ignore: ' \':,.'
          })

          return itsValidPT_BR || itsValidEN_US
        }
        return true
      },
      isValidRoad() {
        if (this.form.iptRoad.value) {
          let itsValidPT_BR = validator.isAlphanumeric(this.form.iptRoad.value, ['pt-BR'], {
            ignore: ' \':,.'
          })

          let itsValidEN_US = validator.isAlphanumeric(this.form.iptRoad.value, ['en-US'], {
            ignore: ' \':,.'
          })

          return itsValidPT_BR || itsValidEN_US
        }
        return true
      },
      isValidHouseNumber() {
        if (this.form.iptHouseNumber.value) {
          return validator.isNumeric(this.form.iptHouseNumber.value, {
            no_symbols: true
          })
        }
        return true
      },
      isValidCEP() {
        if (this.form.iptCEP.value) {
          let isLength = validator.isLength(this.form.iptCEP.value, {
            min: 8,
            max: 8
          })
          let isNumeric = validator.isNumeric(this.form.iptCEP.value, {
            no_symbols: true
          })

          return isLength && isNumeric
        }
        return true
      },
      isValidAdditionalInformation() {
        if (this.form.iptAdditionalInformation.value) {
          return validator.isAlphanumeric(this.form.iptAdditionalInformation.value, ['en-US'], {
            ignore: ' \n\',.:$-()'
          })
        }
        return true
      },
      setError(field, msg) {
        this.form.hasErrors = true
        this.form[field].hasError = true
        this.form[field].error = msg
      },
      clearErrorFields() {
        this.form.hasErrors = false

        this.form.iptName.hasError = false
        this.form.iptName.error = ''

        this.form.iptBirthDate.hasError = false
        this.form.iptBirthDate.error = ''

        this.form.iptEmail.hasError = false
        this.form.iptEmail.error = ''

        this.form.iptRole.hasError = false
        this.form.iptRole.error = ''

        this.form.iptPassword.hasError = false
        this.form.iptPassword.error = ''

        this.form.iptCountry.hasError = false
        this.form.iptCountry.error = ''

        this.form.iptState.hasError = false
        this.form.iptState.error = ''

        this.form.iptCity.hasError = false
        this.form.iptCity.error = ''

        this.form.iptCPF.hasError = false
        this.form.iptCPF.error = ''

        this.form.iptPassportNumber.hasError = false
        this.form.iptPassportNumber.error = ''

        this.form.iptPhoneNumber.hasError = false
        this.form.iptPhoneNumber.error = ''

        this.form.iptCEP.hasError = false
        this.form.iptCEP.error = ''

        this.form.iptNeighborhood.hasError = false
        this.form.iptNeighborhood.error = ''

        this.form.iptRoad.hasError = false
        this.form.iptRoad.error = ''

        this.form.iptHouseNumber.hasError = false
        this.form.iptHouseNumber.error = ''

        this.form.iptAdditionalInformation.hasError = false
        this.form.iptAdditionalInformation.error = ''
      },
      clearFields() {
        this.form.hasErrors = false
        this.form.iptName.value = ''
        this.form.iptBirthDate.value = ''
        this.form.iptEmail.value = ''
        this.form.iptRole.value = ''
        this.form.iptPassword.value1 = ''
        this.form.iptPassword.value2 = ''
        this.form.iptCountry.value = ''
        this.form.iptPhoneCode = ''
        this.form.iptState.value = ''
        this.form.iptCity.value = ''
        this.form.iptCPF.value = ''
        this.form.iptPassportNumber.value = ''
        this.form.iptPhoneNumber.value = ''
        this.form.iptCEP.value = ''
        this.form.iptNeighborhood.value = ''
        this.form.iptRoad.value = ''
        this.form.iptHouseNumber.value = ''
        this.form.iptAdditionalInformation.value = ''
      },
      updateUser() {
        this.clearErrorFields()
        let infosToBeUpdated = {}

        if (!this.isValidName()) {
          this.setError('iptName', 'Nome inválido.')
        } else {
          infosToBeUpdated.name = this.form.iptName.value
        }

        if (!this.isValidBirthDate()) {
          this.setError('iptBirthDate', 'Data de nascimento inválida.')
        } else {
          infosToBeUpdated.birthDate = this.form.iptBirthDate.value
        }

        if (!this.isValidEmail()) {
          this.setError('iptEmail', 'Email inválido.')
        } else {
          infosToBeUpdated.email = this.form.iptEmail.value
        }

        if (!this.isValidRole()) {
          this.setError('iptRole', 'Função inválida.')
        } else {
          infosToBeUpdated.role = this.form.iptRole.value
        }

        // Verifica se as senhas são diferentes
        if (this.form.iptPassword.value1 !== this.form.iptPassword.value2) {
          this.setError('iptPassword', 'As senhas não conferem.')

        // Verifica se a senha é fraca.
        } else if (!this.isValidPassword()) {
          this.setError('iptPassword', 'As senhas são muito fracas.')
        } else {
          infosToBeUpdated.password = this.form.iptPassword.value1
        }

        if (!this.isValidCountry()) {
          this.setError('iptCountry', 'O país é inválido.')
        } else {

          // Valida o CEP ou Passport Number, a depender da nacionalidade do Cliente.
          if (this.form.iptCountry.value === 'BR') {
            if (!this.isValidCEP() && !this.disableCEP) {
              this.setError('iptCEP', 'CEP inválido.')
            } else {
              infosToBeUpdated.cep = this.form.iptCEP.value
            }
          } else {
            if (!this.isValidPassportNumber()) {
              this.setError('iptPassportNumber', 'Invalid Passport Number.')
            } else {
              infosToBeUpdated.passportNumber = this.form.iptPassportNumber.value
            }
          }
        }

        if (!this.isValidCPF()) {
          this.setError('iptCPF', 'Número de CPF inválido.')
        } else {
          infosToBeUpdated.cpf = this.form.iptCPF.value
        }

        if (!this.isValidNeighborhood()) {
          this.setError('iptNeighborhood', 'Nome do bairro inválido.')
        } else {
          infosToBeUpdated.neighborhood = this.form.iptNeighborhood.value
        }

        if (!this.isValidRoad()) {
          this.setError('iptRoad', 'Nome da rua inválido.')
        } else {
          infosToBeUpdated.road = this.form.iptRoad.value
        }

        if (!this.isValidHouseNumber()) {
          this.setError('iptHouseNumber', 'Número da casa inválido.')
        } else {
          infosToBeUpdated.houseNumber = this.form.iptHouseNumber.value
        }

        if (!this.isValidAdditionalInformation()) {
          this.setError('iptAdditionalInformation', 'Texto inválido.')
        } else {
          infosToBeUpdated.information = this.form.iptAdditionalInformation.value
        }

        if (!this.form.hasErrors) {

          if (this.form.iptCPF.value) {
            infosToBeUpdated.cpf = this.form.iptCPF.value
          } else if (this.form.iptPassportNumber.value) {
            infosToBeUpdated.passportNumber = this.form.iptPassportNumber.value
          }

          const axiosConfig = {
            headers: {
              Authorization: `Bearer ${ localStorage.getItem('token_hotel_paraiso') }`
            }
          }

          const edit_user_link = Endpoints.PUT_USER(this.$route.params.id)
          axios.put(edit_user_link, infosToBeUpdated, axiosConfig)
            .then(() => {
              this.openSuccessfulModal()
              this.clearFields()
            })
            .catch(error=> {
              error.response.data.RestException.ErrorFields.map(el => {
                this.setError(el.field, el.hasError.error)
              })
            })
        }
      },
      showValues() {
        console.log(this.form.iptState.value, this.form.iptCity.value)
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
        } catch (error) {
          console.log(error)
        }
      },
      async setStatesAndPhoneCode(cepDisabled = true) {
        try {
          this.states = []
          this.cities = []

          if (cepDisabled) {
            this.form.iptState.value = ''
            this.form.iptCity.value = ''
          }

          let resStates = await axios_countriesStatesCities.get(`https://api.countrystatecity.in/v1/countries/${ this.form.iptCountry.value }/states`)
          let resCountry = await axios_countriesStatesCities.get(`https://api.countrystatecity.in/v1/countries/${ this.form.iptCountry.value }`)

          this.form.iptPhoneCode = resCountry.data.phonecode

          for (let item of resStates.data) {
            this.states.push({
              id: item.id,
              iso2: item.iso2
            })
          }
        } catch (error) {
          console.log(error)
        }
      },
      async setCities(cepDisabled = true) {
        try {
          this.cities = []

          if (cepDisabled) {
            this.form.iptCity.value = ''
          }

          let resCities = await axios_countriesStatesCities.get(`https://api.countrystatecity.in/v1/countries/${ this.form.iptCountry.value }/states/${ this.form.iptState.value }/cities`)

          for (let city of resCities.data) {
            this.cities.push(city)
          }
        } catch (error) {
          console.log(error)
        }
      },
      openSuccessfulModal() {
        this.windows.registredWithSuccess.active = true
      },
      closeSuccessfulModal() {
        this.windows.registredWithSuccess.active = false
      }
    }
  }
</script>

<style scoped>
  
</style>