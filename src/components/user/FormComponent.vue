<template>
  <fieldset>
    <div class="field">
      <label class="label">Nome:</label>
      <div class="control">
        <input class="input is-normal" type="text" placeholder="Nome completo">
      </div>
      <!-- <p class="help">This is a help text</p> -->
    </div>

    <div class="field">
      <label class="label">Email:</label>
      <div class="control">
        <input class="input is-normal" type="email" placeholder="exemplo@hotmail.com">
      </div>
      <!-- <p class="help">This is a help text</p> -->
    </div>

    <div class="box columns mt-2">
        <div class="field column is-half">
          <label class="label">Senha:</label>
          <div class="control">
            <input type="password" class="input is-normal"/>
          </div>
          <!-- <p class="help">This is a help text</p> -->
        </div>
        <div class="field column">
          <label class="label">Repita sua senha:</label>
          <div class="control">
            <input type="password" class="input is-normal"/>
          </div>
          <!-- <p class="help">This is a help text</p> -->
        </div>
    </div>

    <div class="field">
      <label class="label">CPF:</label>
      <div class="control">
        <imask-input class="input is-normal" type="text" :mask="masks.cpf" placeholder="000.000.000-00" />
      </div>
      <!-- <p class="help">This is a help text</p> -->
    </div>

    <div class="columns">
      <div class="field column is-one-third">
        <label class="label">País/Country:</label>
        <p class="control has-icons-left">
          <span class="select" :class="{'is-loading': !countries.length}">
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
      </div>
      <div class="field column is-one-third">
        <label class="label">Estado/State:</label>
        <div class="control">
          <div class="select" :class="{ 'is-loading': loadingStates }">
            <select v-model="form.iptState.value" @change="setCities()">
              <option v-for="item in states" :key="item.iso2" :value="item.iso2">
                {{ item.iso2 }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="field column">
        <label class="label">Cidade/City:</label>
        <div class="control">
          <div class="select" :class="{ 'is-loading': loadingCities }">
            <select v-model="form.iptCities.value">
              <option v-for="item in cities" :key="item.id" :value="item.id">
                {{ item.name }}
              </option>
            </select>
          </div>
        </div>
        <!-- <p class="help">This is a help text</p> -->
      </div>
    </div>
    
    <div class="field">
      <label class="label">Telefone:</label>
      <div class="field-label">        
      </div>
      <div class="field-body">
        <div class="field is-expanded">
          <div class="field has-addons">
            <p class="control">
              <a class="button is-static">
                +{{ form.phoneCode }}
              </a>
            </p>
            <p class="control is-expanded">
              <imask-input class="input is-normal" type="tel" :mask="masks.telefone" placeholder="(00) 00000-0000" />
            </p>
          </div>
          <!-- <p class="help">Do not enter the first zero</p> -->
        </div>
      </div>
    </div>

    <div class="field" v-show="form.iptCountry.value == 'BR'">
      <label class="label">CEP:</label>
      <div class="control">
        <imask-input class="input is-normal" type="text" :mask="masks.cep" placeholder="00000-000" :disabled="disableCEP" />
      </div>
      <!-- <p class="help">This is a help text</p> -->
    </div>

    <div class="columns">
      <div class="field column is-one-third">
        <label class="label">Bairro:</label>
        <div class="control">
          <input class="input is-normal" type="text" placeholder="Nome do bairro onde você reside.">
        </div>
        <!-- <p class="help">This is a help text</p> -->
      </div>

      <div class="field column is-one-third">
        <label class="label">Rua/Avenida:</label>
        <div class="control">
          <input class="input is-normal" type="text" placeholder="Nome da rua/Av. Um exemplo">
        </div>
        <!-- <p class="help">This is a help text</p> -->
      </div>

      <div class="field column is-one-third">
        <label class="label">Nº da residência:</label>
        <div class="control">
          <input class="input is-normal" type="text" placeholder="00000">
        </div>
        <!-- <p class="help">This is a help text</p> -->
      </div>
    </div>

    <div class="field">
      <label class="label">Informações adicionais:</label>
      <div class="control">
        <textarea class="textarea" placeholder="Deseja nos informar de mais alguma coisa?" rows="10"></textarea>
      </div>
      <!-- <p class="help">This is a help text</p> -->
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox">
          Eu aceito os <a @click.stop.prevent="openTermsConditions()">Termos e Condições.</a>
        </label>
      </div>
    </div>

    <div class="field is-grouped is-grouped-centered">
      <p class="control">
        <a class="button" :class="buttonValue.class">
          {{ buttonValue.value }}
        </a>
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
  import { IMaskComponent }  from 'vue-imask'

  let axios_countriesStatesCities = axios.create({
    headers: {
      'X-CSCAPI-KEY': 'UlRPNjR3OGhQOGhiRmloR0FWaDNwSGY2VzZIWlRKRzBNZDN5WUdPdQ=='
    }
  })
  
  export default {
    data() {
      return {
        countries: [],
        states: [],
        cities: [],
        form: {
          iptCountry: {
            value: '',
            error: ''
          },
          phoneCode: '',
          iptState: {
            value: '',
            error: ''
          },
          iptCities: {
            value: '',
            error: ''
          }
        },
        masks: {
          cpf: '000.000.000-00',
          telefone: '(00) 00000-0000',
          cep: '00000-000'
        },
        windows: {
          termsConditions: {
            active: false
          }
        }
      }
    },
    components: {
      'imask-input': IMaskComponent
    },
    created() {
      this.setCountries()
    },
    props: {
      type: String
    },
    computed: {
      disableCEP() {
        return this.form.iptCities.value.toString().length > 0
      },
      loadingStates() {
        return this.form.iptCountry.value && !this.states.length
      },
      loadingCities() {
        return this.form.iptState.value && !this.cities.length
      },
      buttonValue() {
        if (this.type == 'update') {
          return { value: 'Atualizar', class: 'is-link' }
        }
        return { value: 'Cadastrar', class: 'is-primary' }
      }
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
        } catch (error) {
          console.log(error)
        }
      },
      async setStatesAndPhoneCode() {
        try {
          this.states = []
          this.form.iptState.value = ''
          this.cities = []
          this.form.iptCities.value = ''

          let resStates = await axios_countriesStatesCities.get(`https://api.countrystatecity.in/v1/countries/${ this.form.iptCountry.value }/states`)
          let resCountry = await axios_countriesStatesCities.get(`https://api.countrystatecity.in/v1/countries/${ this.form.iptCountry.value }`)

          this.form.phoneCode = resCountry.data.phonecode

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
      async setCities() {
        try {
          this.cities = []
          this.form.iptCities.value = ''

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
      }
    }
  }
</script>

<style scoped>
  
</style>