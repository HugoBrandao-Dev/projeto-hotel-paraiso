<template>
  <article id="cadastro" class="content-article">
    <h1>Novo usuário</h1>
    <hr>
    <form id="form-cadastro" class="container is-max-desktop">
      <FormComponent :type="'register'" />
    </form>
  </article>
</template>

<script>
  // Componenetes
  import FormComponent from '../components/user/FormComponent'

  export default {
    data() {
      return {
        
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