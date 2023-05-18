<template>
  <article id="reserva-edit">
    <h1>Edição de informações</h1>
    <hr>
    <div id="ocupante" class="content">
      <h2>Ocupante</h2>
      <div v-if="occupied" class="is-flex is-justify-content-space-between">
        <div id="user-infos">
          <div class="field">
            <label class="label">Nome:</label>
            <div class="control">
              <p>Tobias de Oliveira</p>
            </div>
          </div>
          <div class="field">
            <label class="label">CPF:</label>
            <div class="control">
              <p>000.000.000-00</p>
            </div>
          </div>
          <a href="/admin/user/1" class="button is-small is-link is-outlined">
            <span>Informação completa</span>
            <span class="icon">
              <i class="fas fa-arrow-circle-right"></i>
            </span>
          </a>
        </div>
        <div id="user-option">
          <button class="button is-large is-danger" @click="removeUser()">Remover</button>
        </div>
      </div>
      <div v-else>
        <p class="has-text-danger">
          <span class="icon is-large">
            <i class="fas fa-ban fa-lg"></i>
          </span>
          <strong class="has-text-danger">N/A</strong>
          <span class="icon is-large">
            <i class="fas fa-ban fa-lg"></i>
          </span>
        </p>
        <div class="columns">
          <div class="column is-half mx-auto">
            <div class="box">
              <h2>Filtro</h2>
              <div class="field">
                <label class="label">Pesquisar por:</label>
                <div class="control">
                  <label class="radio">
                    <input type="radio" checked name="tipo-pesquisa" value="nome" v-model="searchType">
                    Nome
                  </label>
                  <label class="radio">
                    <input type="radio" name="tipo-pesquisa" value="cpf" v-model="searchType">
                      CPF
                  </label>
                </div>
              </div>
              <div class="field has-addons">
                <div class="control">
                  <input v-if="searchType == 'nome'" class="input" type="text" placeholder="Tobias de Oliveira">
                  <imask-input v-else class="input" type="text" placeholder="000.000.000-00" :mask="masks.cpf"/>
                </div>
                <div class="control">
                  <a class="button is-info">
                    <i class="fas fa-search"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table class="table is-striped is-fullwidth mt-4">
          <thead>
            <tr>
              <th><abbr title="Nome do usuário.">Nome</abbr></th>
              <th><abbr title="CPF do usuário.">CPF</abbr></th>
              <th><abbr title="Telefone de contato do usuário.">Telefone</abbr></th>
              <th><abbr title="Opções de ação.">Ações</abbr></th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th><abbr title="Nome do usuário.">Nome</abbr></th>
              <th><abbr title="CPF do usuário.">CPF</abbr></th>
              <th><abbr title="Telefone de contato do usuário.">Telefone</abbr></th>
              <th><abbr title="Opções de ação.">Ações</abbr></th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="user in users" :key="user.cpf">
              <td>{{ user.nome }}</td>
              <td>{{ user.cpf }}</td>
              <td>{{ user.telefone }}</td>
              <td>
                <form @submit.prevent="addUser()">
                  <input type="hidden" :value="user.id">
                  <button type="submit" class="button is-small is-success" title="Adicionar ocupante.">
                    Add
                  </button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
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
          cpf: '000.000.000-00'
        },
        users: [
          { id: 1, nome: 'Tobias de Oliveira', cpf: '11111111111', telefone: '55119111111111', reservas_ativas: '2' },
          { id: 2, nome: 'Dinorá de Oliveira', cpf: '22222222222', telefone: '55119222222222', reservas_ativas: '3' },
          { id: 3, nome: 'Josias Cruz', cpf: '33333333333', telefone: '55119333333333', reservas_ativas: '1' },
          { id: 4, nome: 'Doralice Cruz', cpf: '44444444444', telefone: '55119444444444', reservas_ativas: '1' }
        ],
        occupied: false,
        searchType: 'nome'
      }
    },
    methods: {
      addUser() {
        if (confirm('Colocar o usuário como ocupante?')) {
          alert('Colocado com sucesso.')
        }
      },
      removeUser() {
        if (confirm('Remover ocupante?')) {
          alert('Removido com sucesso.')
        }
      }
    },
    components: {
      'imask-input': IMaskComponent
    }
  }
</script>

<style scoped>
  
</style>