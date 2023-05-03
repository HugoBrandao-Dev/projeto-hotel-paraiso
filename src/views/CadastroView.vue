<template>
  <article id="cadastro" class="mt-5 content-article">
    <h1>Novo usuário</h1>
    <hr>
    <form id="form-cadastro" class="is-flex is-flex-direction-column">
      Nome:
      <input class="input is-normal" type="text" placeholder="Nome completo">
      Email:
      <input class="input is-normal" type="email" placeholder="exemplo@hotmail.com">
      CPF:
      <input class="input is-normal" type="text" placeholder="exemplo@hotmail.com">
      Telefone:
      <input class="input is-normal" type="tel" placeholder="(00) 00000-0000">
      CEP:
      <input class="input is-normal" type="text" placeholder="00000-000">
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
      Informações adicinais:
      <textarea class="textarea" placeholder="Deseja nos informar de mais alguma coisa?" rows="10"></textarea>

      <button class="button is-success is-align-self-flex-end">Cadastrar</button>
    </form>
  </article>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  #form-cadastro {
    width: 50%;
    margin: 0 auto;
  }

  .input, .textarea {
    margin-bottom: 10px;
  }
</style>