<template>
  <div class="column is-half mx-auto">
    <div class="box">
      <h2>Filtro</h2>
      <div class="content">
        <div class="field">
          <label class="label">Pesquisar por:</label>
          <div class="control">
            <label class="radio">
              <input type="radio" checked name="tipo-pesquisa" value="nome" v-model="search.type">
              Nome
            </label>
            <label class="radio">
              <input type="radio" name="tipo-pesquisa" value="cpf" v-model="search.type">
                CPF
            </label>
            <label class="radio">
              <input type="radio" name="tipo-pesquisa" value="passport-number" v-model="search.type">
                Número do Passaporte
            </label>
          </div>
        </div>
        <div class="field is-grouped" v-if="search.type == 'nome'">
          <p class="control is-expanded" :class="{ 'has-icons-right': search.iptName.hasError }">
            <input
              class="input"
              :class="{
                'is-normal': search.iptName.hasError,
                'is-danger': search.iptName.hasError
              }"
              type="text"
              placeholder="Tobias de Oliveira"
              v-model="search.iptName.value"
            />
            <span class="icon is-small is-right" v-show="search.iptName.hasError">
              <i class="fas fa-exclamation-triangle"></i>
            </span>
          </p>
          <p class="control">
            <button class="button is-info" @click="searchUser()">
              Pesquisar
            </button>
          </p>
        </div>
        <div class="field is-grouped" v-else-if="search.type == 'cpf'">
          <p class="control is-expanded" :class="{ 'has-icons-right': search.iptCPF.hasError }">
            <imask-input
              class="input"
              :class="{
                'is-normal': search.iptCPF.hasError,
                'is-danger': search.iptCPF.hasError
              }"
              type="text"
              placeholder="000.000.000-00"
              :mask="masks.cpf"
              :unmask="true"
              v-model="search.iptCPF.value"
            />
            <span class="icon is-small is-right" v-show="search.iptCPF.hasError">
              <i class="fas fa-exclamation-triangle"></i>
            </span>
          </p>
          <p class="control">
            <button class="button is-info" @click="searchUser()">
              Pesquisar
            </button>
          </p>
        </div>
        <div class="field is-grouped" v-else>
          <p class="control is-expanded" :class="{ 'has-icons-right': search.iptPassportNumber.hasError }">
            <imask-input
              class="input"
              :class="{
                'is-normal': search.iptPassportNumber.hasError,
                'is-danger': search.iptPassportNumber.hasError
              }"
              type="text"
              placeholder="0A0A0A0A0A"
              v-model="search.iptPassportNumber.value"
            />
            <span class="icon is-small is-right" v-show="search.iptPassportNumber.hasError">
              <i class="fas fa-exclamation-triangle"></i>
            </span>
          </p>
          <p class="control">
            <button class="button is-info" @click="searchUser()">
              Pesquisar
            </button>
          </p>
        </div>
        <p class="help" :class="{ 'is-danger': search.iptName.error }">
          {{ search.iptName.error }}
        </p>
        <p class="help" :class="{ 'is-danger': search.iptCPF.error }">
          {{ search.iptCPF.error }}
        </p>
        <p class="help" :class="{ 'is-danger': search.iptPassportNumber.error }">
          {{ search.iptPassportNumber.error }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import validator from 'validator'
  import { IMaskComponent }  from 'vue-imask'

  export default {
    data() {
      return {
        masks: {
          cpf: '000.000.000-00'
        },
        search: {
          type: 'nome',
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
    },
    components: {
      'imask-input': IMaskComponent
    },
    methods: {
      isValidName() {
        if (this.search.iptName.value || this.type == 'register') {
          let itsValidPT_BR = validator.isAlpha(this.search.iptName.value, ['pt-BR'], {
            ignore: ' \''
          })
          let itsValidEN_US = validator.isAlpha(this.search.iptName.value, ['en-US'], {
            ignore: ' \''
          })

          return itsValidPT_BR || itsValidEN_US
        }
        return true
      },
      isValidCPF() {
        if (this.search.iptCPF.value) {
          if (this.search.iptCPF.value && !this.search.iptPassportNumber.value) {
            let isInt = validator.isInt(this.search.iptCPF.value, {
              allow_leading_zeroes: true
            })
            let isLength = validator.isLength(this.search.iptCPF.value, {
              min: 11,
              max: 11
            })
            return isInt && isLength
          }
        }
        return true
      },
      isValidPassportNumber() {
        if (this.search.iptPassportNumber.value) {
          if (!this.search.iptCPF.value && this.search.iptPassportNumber.value) {
            let hasLengthRight = validator.isLength(this.search.iptPassportNumber.value, {
              min: 8,
              max: 9
            })
            let isAlphanumeric = validator.isAlphanumeric(this.search.iptPassportNumber.value, ['en-US'])

            return hasLengthRight && isAlphanumeric
          }
        }
        return true
      },
      setError(field, msg) {
        this.search.hasErrors = true
        this.search[field].hasError = true
        this.search[field].error = msg
      },
      clearErrorFields() {
        this.search.hasErrors = false

        this.search.iptName.hasError = false
        this.search.iptName.error = ''

        this.search.iptCPF.hasError = false
        this.search.iptCPF.error = ''

        this.search.iptPassportNumber.hasError = false
        this.search.iptPassportNumber.error = ''
      },
      searchUser() {
        this.clearErrorFields()
        let searchInfo = {}

        if (!this.isValidName()) {
          this.setError('iptName', 'Nome inválido.')
        }

        if (!this.isValidCPF()) {
          this.setError('iptCPF', 'Número de CPF inválido.')
        }

        if (!this.isValidPassportNumber()) {
          this.setError('iptPassportNumber', 'Número de Passaporte inválido.')
        }

        if (this.search.hasErrors) {
          switch (this.search.type) {
            case 'nome':
              searchInfo.name = this.search.iptName.value
              break
            case 'cpf':
              searchInfo.cpf = this.search.iptCPF.value
              break
            default:
              searchInfo.passportNumber = this.search.iptPassportNumber.value
          }

          console.info(searchInfo)
        }

      }
    }
  }
</script>

<style scoped>
  
</style>