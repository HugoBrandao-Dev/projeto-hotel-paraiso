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
                Passport Number
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
            <a class="button is-info">
              Pesquisar
            </a>
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
            <a class="button is-info">
              Pesquisar
            </a>
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
            <a class="button is-info">
              Pesquisar
            </a>
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
  import { IMaskComponent }  from 'vue-imask'

  export default {
    data() {
      return {
        masks: {
          cpf: '000.000.000-00'
        },
        search: {
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
    }
  }
</script>

<style scoped>
  
</style>