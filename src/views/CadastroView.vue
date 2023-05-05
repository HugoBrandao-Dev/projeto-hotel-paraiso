<template>
  <article id="cadastro" class="mt-5 content-article">
    <h1>Novo usuário</h1>
    <hr>
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

      <span class="checkbox">
        <input type="checkbox">
        Eu aceito os <a @click="openTermsConditions()">Termos e Condições</a>.
      </span>

      <button class="button is-success is-align-self-flex-end">Cadastrar</button>
    </form>
    <div class="modal" :class="{'is-active': windows.termsConditions.active}">
      <div class="modal-background" @click="closeTermsConditions()"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Termos e condições</p>
          <button class="delete" @click="closeTermsConditions()" aria-label="close"></button>
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
          <button class="button is-success">Aceitar</button>
          <button class="button" @click="closeTermsConditions()">Fechar</button>
        </footer>
      </div>
    </div>
  </article>
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
    },
    methods: {
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
  .input, .textarea, .checkbox {
    margin-bottom: 10px;
  }

  .checkbox {
    width: 100%;
  }
</style>