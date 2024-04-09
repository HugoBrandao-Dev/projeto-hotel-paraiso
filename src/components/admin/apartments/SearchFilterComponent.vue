<template>
  <section id="search-filter" class="columns">
    <div class="column is-half mx-auto">
      <div class="box">
        <h2>Filtro</h2>
        <div class="columns">
          <div class="field column is-half">
            <label class="label">Status:</label>
            <div 
              class="select"
              :class="{
                'is-danger': forms.searchApartment.iptStatus.hasError
              }">
              <select v-model="forms.searchApartment.iptStatus.value">
                <option 
                  v-for="status in statusList" 
                  :key="status" 
                  :selected="forms.searchApartment.iptStatus.value"
                >
                  {{ status }}
                </option>
              </select>
            </div>
            <p class="help" :class="{ 'is-danger': forms.searchApartment.iptStatus.hasError }">
              {{ forms.searchApartment.iptStatus.error }}
            </p>
          </div>
        </div>
        <div class="buttons is-right">
          <button class="button is-ghost" @click="clearFields()">Limpar</button>
          <button class="button is-info" @click="applyFilters()">Buscar</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import validator from 'validator'

  export default {
    data() {
      return {
        statusList: ['livre', 'reservado', 'ocupado', 'indiponível'],
        forms: {
          searchApartment: {
            hasErrors: false,
            iptStatus: {
              value: 'livre',
              hasError: false,
              error: ''
            }
          }
        }
      }
    },
    methods: {
      clearFields() {
        this.forms.searchApartment.iptStatus.value = 'livre'
      },
      clearErrorFields() {
        let formsList = Object.keys(this.forms)

        formsList.forEach(form => {
          let fields = Object.keys(this.forms[form])
          fields.forEach(field => {
            if (field.indexOf('ipt') >= 0) {
              this.forms[form].hasErrors = false
              this.forms[form][field].hasError = false
              this.forms[form][field].error = ''
            }
          })
        })
      },
      setError(form, field, msg) {
        this.forms[form].hasErrors = true
        this.forms[form][field].hasError = true
        this.forms[form][field].error = msg
      },
      isValidStatus() {
        return validator.isIn(this.forms.searchApartment.iptStatus.value, this.statusList)
      },
      applyFilters() {
        this.clearErrorFields()

        let queryString = ''

        if (!this.isValidStatus()) {
          this.setError('searchApartment', 'iptStatus', 'Valor de status inválido.')
        } else {
          if (queryString.length)
            queryString += `&status=${ this.forms.searchApartment.iptStatus.value }`
          else
            queryString += `?status=${ this.forms.searchApartment.iptStatus.value }`
        }

        if (!this.forms.searchApartment.hasErrors) {
          console.info(queryString)
        }
      }
    }
  }
</script>

<style scoped>
  
</style>