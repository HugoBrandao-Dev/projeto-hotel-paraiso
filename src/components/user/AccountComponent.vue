<template>
  <div class="card">
    <header class="card-header p-3 is-justify-content-space-between">
      <router-link to="update" class="button is-warning">Atualizar</router-link>
      <button class="button is-danger" @click="openDeleteAccountModal()">Deletar</button>
    </header>
    <div class="card-content">
      <div class="content">
        <div class="field">
          <label class="label">Nome:</label>
          <div class="control">Tobias de Oliveira</div>
        </div>
        <div class="field">
          <label class="label">Email:</label>
          <div class="control">tobias@gmail.com</div>
        </div>
        <div class="field">
          <label class="label">CPF:</label>
          <div class="control">000.000.000-00</div>
        </div>
        <div class="field">
          <label class="label">Telefone:</label>
          <div class="control">+55 (00) 00000-0000</div>
        </div>
        <div class="field">
          <label class="label">CEP:</label>
          <div class="control">00000-00</div>
        </div>

        
        <div class="field">
          <label class="label">Cidade:</label>
          <div class="control">São Paulo / SP</div>
        </div>

        <div class="field">
          <label class="label">Bairro:</label>
          <div class="control">O nome do bairro.</div>
        </div>
        <div class="field">
          <label class="label">Rua:</label>
          <div class="control">O nome da rua.</div>
        </div>
        <div class="field">
          <label class="label">Nº da residência:</label>
          <div class="control">00000</div>
        </div>
        <div class="field">
          <label class="label">Informações adicionais:</label>
          <div class="control">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" :class="{'is-active': modal.deleteAccount.active}">
      <div class="modal-background" @click="closeDeleteAccountModal()"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Deletar conta</p>
          <button class="delete" aria-label="close" @click="closeDeleteAccountModal()"></button>
        </header>
        <section class="modal-card-body">
          <p>Deseja realmente deletar sua conta?</p>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-primary">Sim</button>
          <button class="button is-danger" @click="closeDeleteAccountModal()">Não</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        modal: {
          deleteAccount: {
            active: false
          }
        }
      }
    },
    methods: {
      openDeleteAccountModal() {
        this.modal.deleteAccount.active = true
      },
      closeDeleteAccountModal() {
        this.modal.deleteAccount.active = false
      }
    }
  }
</script>

<style scoped>
  
</style>