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
        Nome:
        <input class="input is-normal" type="text" placeholder="Nome completo">
        Email:
        <input class="input is-normal" type="email" placeholder="exemplo@hotmail.com">
        CPF:
        <imask-input class="input is-normal" type="text" :mask="masks.cpf" placeholder="000.000.000-00" />
        Telefone:
        <imask-input class="input is-normal" type="tel" :mask="masks.telefone" placeholder="+00 (00) 00000-0000" />
        CEP:
        <imask-input class="input is-normal" type="text" :mask="masks.cep" placeholder="00000-000" />
        Estado:
        <input class="input is-normal" type="text" placeholder="SP">
        Cidade:
        <input class="input is-normal" type="text" placeholder="Nome da cidade onde você mora">
        Bairro:
        <input class="input is-normal" type="text" placeholder="Nome do bairro onde você reside.">
        Rua/Avenida:
        <input class="input is-normal" type="text" placeholder="Rua: Nome da rua/Av. Um exemplo">
        Nº da residência:
        <input class="input is-normal" type="text">
        Informações adicionais:
        <textarea class="textarea" placeholder="Deseja nos informar de mais alguma coisa?" rows="10"></textarea>
    </form>
    </div>
    <footer class="card-footer">
      <button class="button is-primary is-light card-footer-item">
          Atualizar
        </button>
        <button class="button is-danger is is-light card-footer-item">
          Cancelar
        </button>
    </footer>
  </div>
</template>

<script>
  import { IMaskComponent }  from 'vue-imask'

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
      'imask-input': IMaskComponent
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