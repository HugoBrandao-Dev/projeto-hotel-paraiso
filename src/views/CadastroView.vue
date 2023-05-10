<template>
  <article id="cadastro" class="mt-5 content-article">
    <h1>Novo usuário</h1>
    <hr>
    <form id="form-cadastro" class="container is-max-desktop">
      <FormComponent :type="'register'" />
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
  // Componenetes
  import FormComponent from '../components/user/FormComponent'

  export default {
    data() {
      return {
        windows: {
          termsConditions: {
            active: false
          }
        }
      }
    },
    components: {
      FormComponent
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