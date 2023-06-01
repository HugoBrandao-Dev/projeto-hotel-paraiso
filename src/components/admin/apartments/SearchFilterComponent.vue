<template>
  <section id="search-filter" class="columns">
    <div class="column is-half mx-auto">
      <div class="box">
        <h2>Filtro</h2>
        <div class="columns">
          <div class="field column is-half">
            <label class="label">Andar:</label>
            <div class="control">
              <input 
                type="number"
                class="input"
                :class="{
                  'is-danger': search.iptFloor.hasError
                }"
                v-model="search.iptFloor.value"
              />
            </div>
            <p class="help" :class="{ 'is-danger': search.iptFloor.hasError }">
              {{ search.iptFloor.error }}
            </p>
          </div>
          <div class="field column">
            <label class="label">Número:</label>
            <div class="control">
              <input 
                type="number" 
                class="input"
                :class="{
                  'is-danger': search.iptNumber.hasError
                }"
                v-model="search.iptNumber.value"
              />
            </div>
            <p class="help" :class="{ 'is-danger': search.iptNumber.hasError }">
              {{ search.iptNumber.error }}
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
  export default {
    data() {
      return {
        search: {
          type: 'apartamento',
          hasErrors: false,
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
        }
      }
    },
    methods: {
      clearFields() {
        this.search.iptFloor.value = ''
        this.search.iptNumber.value = ''
      },
      clearErrorFields() {
        let fields = Object.keys(this.search)
        fields.forEach(field => {
          if (field.indexOf('ipt') >= 0) {
            this.search[field].hasError = false
            this.search[field].error = ''
          }
        })
      },
      setError(field, msg) {
        this.search.hasErrors = true
        this.search[field].hasError = true
        this.search[field].error = msg
      },
      applyFilters() {
        this.clearErrorFields()
      }
    }
  }
</script>

<style scoped>
  
</style>