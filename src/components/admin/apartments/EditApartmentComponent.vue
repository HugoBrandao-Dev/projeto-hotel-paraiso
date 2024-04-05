<template>
  <article id="new-apartment">
    <h1>Novo apartamento</h1>
    <hr>
    <FormComponent type="update" />
  </article>
</template>

<script>
  import FormComponent from './FormApartmentComponent'

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
  
</style>