<template>
  <fieldset>
    <div class="field">
      <label class="label">Nome:</label>
      <div class="control">
        <input class="input is-normal" type="text" placeholder="Nome completo">
      </div>
      <!-- <p class="help">This is a help text</p> -->
    </div>

    <div class="field">
      <label class="label">Email:</label>
      <div class="control">
        <input class="input is-normal" type="email" placeholder="exemplo@hotmail.com">
      </div>
      <!-- <p class="help">This is a help text</p> -->
    </div>

    <div class="box columns mt-2">
        <div class="field column is-half">
          <label class="label">Senha:</label>
          <div class="control">
            <input type="password" class="input is-normal"/>
          </div>
          <!-- <p class="help">This is a help text</p> -->
        </div>
        <div class="field column">
          <label class="label">Repita sua senha:</label>
          <div class="control">
            <input type="password" class="input is-normal"/>
          </div>
          <!-- <p class="help">This is a help text</p> -->
        </div>
    </div>

    <div class="field">
      <label class="label">CPF:</label>
      <div class="control">
        <imask-input class="input is-normal" type="text" :mask="masks.cpf" placeholder="000.000.000-00" />
      </div>
      <!-- <p class="help">This is a help text</p> -->
    </div>

    <div class="field">
      <label class="label">Telefone:</label>
      <div class="control">
        <imask-input class="input is-normal" type="tel" :mask="masks.telefone" placeholder="+00 (00) 00000-0000" />
      </div>
      <!-- <p class="help">This is a help text</p> -->
    </div>

    <div class="field">
      <label class="label">País/Country:</label>
      <p class="control has-icons-left">
        <span class="select">
          <select>
            <option selected>Brazil</option>
            <option>England</option>
            <option>China</option>
          </select>
        </span>
        <span class="icon is-small is-left">
          <i class="fas fa-globe"></i>
        </span>
      </p>
    </div>

    <div class="field">
      <label class="label">CEP:</label>
      <div class="control">
        <imask-input class="input is-normal" type="text" :mask="masks.cep" placeholder="00000-000" />
      </div>
      <!-- <p class="help">This is a help text</p> -->
    </div>

    <div class="columns">
      <div class="field column is-one-quarter">
        <label class="label">Estado/State:</label>
        <div class="control">
          <div class="select">
            <select>
              <option>SP</option>
              <option>RJ</option>
            </select>
          </div>
        </div>
      </div>

      <div class="field column is-one-quarter">
        <label class="label">Cidade/City:</label>
        <div class="control">
          <div class="select">
            <select>
              <option>São Paulo</option>
              <option>São Bernardo do Campo</option>
            </select>
          </div>
        </div>
        <!-- <p class="help">This is a help text</p> -->
      </div>
    </div>

    <div class="columns">
      <div class="field column is-one-third">
        <label class="label">Bairro:</label>
        <div class="control">
          <input class="input is-normal" type="text" placeholder="Nome do bairro onde você reside.">
        </div>
        <!-- <p class="help">This is a help text</p> -->
      </div>

      <div class="field column is-one-third">
        <label class="label">Rua/Avenida:</label>
        <div class="control">
          <input class="input is-normal" type="text" placeholder="Nome da rua/Av. Um exemplo">
        </div>
        <!-- <p class="help">This is a help text</p> -->
      </div>

      <div class="field column is-one-third">
        <label class="label">Nº da residência:</label>
        <div class="control">
          <input class="input is-normal" type="text" placeholder="00000">
        </div>
        <!-- <p class="help">This is a help text</p> -->
      </div>
    </div>

    <div class="field">
      <label class="label">Informações adicionais:</label>
      <div class="control">
        <textarea class="textarea" placeholder="Deseja nos informar de mais alguma coisa?" rows="10"></textarea>
      </div>
      <!-- <p class="help">This is a help text</p> -->
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input type="checkbox">
          Eu aceito os <a href="#">Termos e Condições.</a>
        </label>
      </div>
    </div>

    <div class="field is-grouped is-grouped-centered">
      <p class="control">
        <a class="button" :class="buttonValue.class">
          {{ buttonValue.value }}
        </a>
      </p>
    </div>
  </fieldset>
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
      }
    },
    components: {
      'imask-input': IMaskComponent
    },
    props: {
      type: String
    },
    computed: {
      buttonValue() {
        if (this.type == 'update') {
          return { value: 'Atualizar', class: 'is-link' }
        }
        return { value: 'Cadastrar', class: 'is-primary' }
      }
    }
  }
</script>

<style scoped>
  
</style>