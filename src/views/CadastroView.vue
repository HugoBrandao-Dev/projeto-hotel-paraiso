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

      <button class="button is-success is-align-self-flex-end">Cadastrar</button>
    </form>
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
        }
      }
    },
    components: {
      'imask-input': IMaskComponent
    }
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