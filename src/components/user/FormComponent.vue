<template>
  <fieldset>
    <div class="field">
      <div class="modal" :class="{'is-active': windows.registredWithSuccess.active}">
        <div class="modal-background" @click.stop.prevent="closeSuccessfulModal()"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">{{ type == 'register' ? 'Cadastrado' : 'Atualizado' }}</p>
            <button class="delete" @click.stop.prevent="closeSuccessfulModal()" aria-label="close"></button>
          </header>
          <section class="modal-card-body" v-if="type == 'register'">
            O usuário foi cadastrado com sucesso.
          </section>
          <section class="modal-card-body" v-else>
            Suas informações foram atualizadas com sucesso.
          </section>
          <footer class="modal-card-foot">
            <div class="buttons">
              <button class="button is-success" @click.stop.prevent="closeSuccessfulModal()">OK</button>
            </div>
          </footer>
        </div>
      </div>
      <p class="my-3"><span class="has-text-weight-bold has-text-danger">*</span> São obrigatórios</p>
      <div class="columns">
        <div class="field column is-two-third">
          <label class="label">Nome:<span v-show="this.type == 'register'" class="has-text-danger">*</span></label>
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
          <label class="label">Data de nascimento:<span v-show="this.type == 'register'" class="has-text-danger">*</span></label>
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

    <div class="field">
      <label class="label">Email:<span v-show="this.type == 'register'" class="has-text-danger">*</span></label>
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

    <div class="box columns mt-2">
      <div class="field column is-half">
        <label class="label">Senha:<span v-show="this.type == 'register'" class="has-text-danger">*</span></label>
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
        <label class="label">Repita sua senha:<span v-show="this.type == 'register'" class="has-text-danger">*</span></label>
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
        <label class="label">País/Country:<span v-show="this.type == 'register'" class="has-text-danger">*</span></label>
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
        <label class="label">Estado/State:<span v-show="this.type == 'register'" class="has-text-danger">*</span></label>
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
        <label class="label">Cidade/City:<span v-show="this.type == 'register'" class="has-text-danger">*</span></label>
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
          CPF:<span v-show="this.type == 'register'" class="has-text-danger">*</span>
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
          Passport Number:<span v-show="this.type == 'register'" class="has-text-danger">*</span>
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
      <label class="label">Telefone:<span v-show="this.type == 'register'" class="has-text-danger">*</span></label>
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

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox" v-model="form.ckbTermsConditions.value">
          Eu aceito os <a @click.stop.prevent="openTermsConditions()">Termos e Condições.</a>
          <span class="has-text-weight-bold has-text-danger">*</span>
        </label>
        <span class="icon is-small is-right ml-2" v-show="form.ckbTermsConditions.hasError">
          <i class="fas fa-exclamation-triangle"></i>
        </span>
      </div>
      <p class="help" :class="{ 'is-danger': form.ckbTermsConditions.hasError }">
        {{ form.ckbTermsConditions.error }}
      </p>
    </div>

    <div class="field is-grouped is-grouped-centered">
      <p class="control">
        <button 
          v-if="type == 'register'"
          type="submit" 
          class="button" 
          :class="{'is-primary': type == 'register'}"
          @click.prevent="registerUser()">
          Cadastrar
        </button>
        <button 
          v-else
          type="submit" 
          class="button" 
          :class="{'is-link': type == 'update'}"
          @click.prevent="updateUser()">
          Atualizar
        </button>
      </p>
    </div>
    <div class="modal" :class="{'is-active': windows.termsConditions.active}">
      <div class="modal-background" @click.stop.prevent="closeTermsConditions()"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Termos e condições</p>
          <button class="delete" @click.stop.prevent="closeTermsConditions()" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
          cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </section>
        <footer class="modal-card-foot">
          <button 
            class="button is-success" 
            @click.stop.prevent="closeTermsConditions()"
          >
            Aceitar
          </button>
          <button 
            class="button" 
            @click.stop.prevent="closeTermsConditions()"
          >
            Fechar
          </button>
        </footer>
      </div>
    </div>
  </fieldset>
</template>

<script>
  import axios from 'axios'
  import validator from 'validator'
  import { IMaskComponent }  from 'vue-imask'
  import Endpoints from '../../tools/EndpointsConfig'

  let axios_countriesStatesCities = axios.create({
    headers: {
      'X-CSCAPI-KEY': 'UlRPNjR3OGhQOGhiRmloR0FWaDNwSGY2VzZIWlRKRzBNZDN5WUdPdQ=='
    }
  })
  
  export default {
    created() {
      this.setCountries()
    },
    props: {
      type: String
    },
    data() {
      return {
        userAccount: {
          isLogged: false,
          isClient: false,
          _links: []
        },
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
          },
          ckbTermsConditions: {
            value: false,
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
        if (this.form.iptName.value || this.type == 'register') {
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
        if (this.form.iptBirthDate.value || this.type == 'register') {
          return validator.isDate(this.form.iptBirthDate.value)
        }
        return true
      },
      isValidEmail() {
        if (this.form.iptEmail.value || this.type == 'register') {
          return validator.isEmail(this.form.iptEmail.value)
        }
        return true
      },
      isValidPassword() {
        if (this.form.iptPassword.value1 || this.type == 'register') {
          return validator.isStrongPassword(this.form.iptPassword.value1)
        }
        return true
      },
      isValidCountry() {
        if (this.form.iptCountry.value || this.type == 'register') {
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

        this.form.ckbTermsConditions.hasError = false
        this.form.ckbTermsConditions.error = ''
      },
      clearFields() {
        this.form.hasErrors = false
        this.form.iptName.value = ''
        this.form.iptBirthDate.value = ''
        this.form.iptEmail.value = ''
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
        this.form.ckbTermsConditions.value = false
      },
      registerUser() {
        this.clearErrorFields()

        if (!this.isValidName()) {
          this.setError('iptName', 'Nome inválido.')
        }

        if (!this.isValidBirthDate()) {
          this.setError('iptBirthDate', 'Data de nascimento inválida.')
        }

        if (!this.isValidEmail()) {
          this.setError('iptEmail', 'Email inválido.')
        }

        // Verifica se as senhas são diferentes
        if (this.form.iptPassword.value1 !== this.form.iptPassword.value2) {
          this.setError('iptPassword', 'As senhas não conferem.')

        // Verifica se a senha é fraca.
        } else if (!this.isValidPassword()) {
          this.setError('iptPassword', 'As senhas são muito fracas.')
        }

        if (!this.isValidCountry()) {
          this.setError('iptCountry', 'O país é inválido.')
        } else {

          // Valida o CEP ou Passport Number, a depender da nacionalidade do Cliente.
          if (this.form.iptCountry.value === 'BR') {
            if (!this.isValidCEP() && !this.disableCEP) {
              this.setError('iptCEP', 'CEP inválido.')
            }
          } else {
            if (!this.isValidPassportNumber()) {
              this.setError('iptPassportNumber', 'Invalid Passport Number.')
            }
          }
        }

        if (!this.isValidCPF()) {
          this.setError('iptCPF', 'Número de CPF inválido.')
        }
        if (!this.isValidNeighborhood()) {
          this.setError('iptNeighborhood', 'Nome do bairro inválido.')
        }
        if (!this.isValidRoad()) {
          this.setError('iptRoad', 'Nome da rua inválido.')
        }
        if (!this.isValidHouseNumber()) {
          this.setError('iptHouseNumber', 'Número da casa inválido.')
        }
        if (!this.isValidAdditionalInformation()) {
          this.setError('iptAdditionalInformation', 'Texto inválido.')
        }
        if (!this.form.ckbTermsConditions.value) {
          this.setError('ckbTermsConditions', 'Aceite nossos termos e condições.')
        }

        if (!this.form.hasErrors) {
          let user = {
            name: this.form.iptName.value,
            email: this.form.iptEmail.value,
            password: this.form.iptPassword.value1,
            phoneCode: this.form.iptPhoneCode,
            phoneNumber: this.form.iptPhoneNumber.value,
            birthDate: this.form.iptBirthDate.value,
            country: this.form.iptCountry.value,
            cep: this.form.iptCEP.value,
            state: this.form.iptState.value,
            city: this.form.iptCity.value,
            neighborhood: this.form.iptNeighborhood.value,
            road: this.form.iptRoad.value,
            houseNumber: this.form.iptHouseNumber.value,
            information: this.form.iptAdditionalInformation.value
          }

          if (this.form.iptCPF.value) {
            user.cpf = this.form.iptCPF.value
          } else if (this.form.iptPassportNumber.value) {
            user.passportNumber = this.form.iptPassportNumber.value
          }

          axios.post(Endpoints.POST_USER(), user)
            .then(() => {
              this.openSuccessfulModal()
              this.clearFields()
            })
            .catch(error => {
              error.response.data.RestException.ErrorFields.map(item => {
                this.setError(item.field, item.hasError.error)
              })
            })
        }
      },
      updateUser() {
        this.clearErrorFields()
        let user = {}

        if (!this.isValidName()) {
          this.setError('iptName', 'Nome inválido.')
        } else {
          user.name = this.form.iptName.value
        }

        if (!this.isValidBirthDate()) {
          this.setError('iptBirthDate', 'Data de nascimento inválida.')
        } else {
          user.birthDate = this.form.iptBirthDate.value
        }

        if (!this.isValidEmail()) {
          this.setError('iptEmail', 'Email inválido.')
        } else {
          user.email = this.form.iptEmail.value
        }

        // Verifica se as senhas são diferentes
        if (this.form.iptPassword.value1 !== this.form.iptPassword.value2) {
          this.setError('iptPassword', 'As senhas não conferem.')

        // Verifica se a senha é fraca.
        } else if (!this.isValidPassword()) {
          this.setError('iptPassword', 'As senhas são muito fracas.')
        } else {
          user.password = this.form.iptPassword.value1
        }

        if (!this.isValidCountry()) {
          this.setError('iptCountry', 'O país é inválido.')
        } else {

          // Valida o CEP ou Passport Number, a depender da nacionalidade do Cliente.
          if (this.form.iptCountry.value === 'BR') {
            if (!this.isValidCEP() && !this.disableCEP) {
              this.setError('iptCEP', 'CEP inválido.')
            } else {
              user.cep = this.form.iptCEP.value
            }
          } else {
            if (!this.isValidPassportNumber()) {
              this.setError('iptPassportNumber', 'Invalid Passport Number.')
            } else {
              user.passportNumber = this.form.iptPassportNumber.value
            }
          }
        }

        if (!this.isValidCPF()) {
          this.setError('iptCPF', 'Número de CPF inválido.')
        } else {
          user.cpf = this.form.iptCPF.value
        }

        if (!this.isValidNeighborhood()) {
          this.setError('iptNeighborhood', 'Nome do bairro inválido.')
        } else {
          user.neighborhood = this.form.iptNeighborhood.value
        }

        if (!this.isValidRoad()) {
          this.setError('iptRoad', 'Nome da rua inválido.')
        } else {
          user.road = this.form.iptRoad.value
        }

        if (!this.isValidHouseNumber()) {
          this.setError('iptHouseNumber', 'Número da casa inválido.')
        } else {
          user.houseNumber = this.form.iptHouseNumber.value
        }

        if (!this.isValidAdditionalInformation()) {
          this.setError('iptAdditionalInformation', 'Texto inválido.')
        } else {
          user.information = this.form.iptAdditionalInformation.value
        }

        if (!this.form.ckbTermsConditions.value) {
          this.setError('ckbTermsConditions', 'Aceite nossos termos e condições.')
        }

        if (!this.form.hasErrors) {

          if (this.form.iptCPF.value) {
            user.cpf = this.form.iptCPF.value
          } else if (this.form.iptPassportNumber.value) {
            user.passportNumber = this.form.iptPassportNumber.value
          }

          this.openSuccessfulModal()
          this.clearFields()
          this.$emit('updateUser', user)
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
      openTermsConditions() {
        this.windows.termsConditions.active = true
      },
      closeTermsConditions() {
        this.windows.termsConditions.active = false
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