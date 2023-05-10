<template>
  <div class="card">
    <header class="card-header p-3 is-flex is-align-items-center">
      <router-link to="account" class="button is-link is-light is-rounded">
        <span class="icon is-large">
          <i class="fas fa-arrow-left fa-xs"></i>
        </span>
      </router-link>
      <p class="card-header-title">Atualizar informações</p>
    </header>
    <div class="card-content">
      <form id="form-cadastro" class="container is-max-desktop">
        <FormComponent :type="'update'" />
      </form>
    </div>
  </div>
</template>

<script>
  // Componentes
  import FormComponent from './FormComponent'

  export default {
    data() {
      return {
        masks: {
          cpf: '000.000.000-00',
          telefone: '+00 (00) 00000-0000',
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
      FormComponent
    }
  }
</script>

<style scoped>
  .input, .textarea, .checkbox {
    margin-bottom: 10px;
  }

  .checkbox {
    width: 100%;
  }
</style>