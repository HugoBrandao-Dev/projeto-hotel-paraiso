<template>
  <div id="users">
    <h1>Lista de usuários</h1>
    <hr>
    <div class="content">
      <div class="columns">
        <SearchFilterComponent />
      </div>
    </div>
    <table class="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th><abbr title="Nome do usuário.">Nome</abbr></th>
          <th><abbr title="CPF do usuário.">CPF</abbr></th>
          <th class="is-hidden-mobile"><abbr title="Telefone de contato do usuário.">Telefone</abbr></th>
          <th class="is-hidden-mobile"><abbr title="Reservas ativas do usuário.">Reservas Ativas</abbr></th>

          <th><abbr title="Opções de ação.">Ações</abbr></th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th><abbr title="Nome do usuário.">Nome</abbr></th>
          <th><abbr title="CPF do usuário.">CPF</abbr></th>
          <th class="is-hidden-mobile"><abbr title="Telefone de contato do usuário.">Telefone</abbr></th>
          <th class="is-hidden-mobile"><abbr title="Reservas ativas do usuário.">Reservas Ativas</abbr></th>
          <th><abbr title="Opções de ação.">Ações</abbr></th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for="user in users" :key="user.cpf">
          <td>{{ user.nome }}</td>
          <td>{{ user.cpf }}</td>
          <td class="is-hidden-mobile">{{ user.telefone }}</td>
          <td class="is-hidden-mobile">{{ user.reservas_ativas }}</td>
          <td>
            <div class="dropdown is-right is-hidden-desktop">
              <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" :aria-controls="user.cpf">
                  <span>
                    <i class="fas fa-ellipsis-v"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" :id="user.cpf" role="menu">
                <div class="dropdown-content">
                  <div class="dropdown-item">
                    <div class="buttons">
                      <router-link :to="{
                        name: 'UserInfo',
                        params: {
                          id: user.id
                        }
                      }" class="button is-small is-info" title="Informação completa.">
                        <span class="icon is-small">
                          <i class="fas fa-info"></i>
                        </span>
                      </router-link>
                      <router-link :to="{
                        name: 'UserEdit',
                        params: {
                          id: user.id
                        }
                      }" class="button is-small is-warning" title="Editar usuário.">
                        <span class="icon is-small">
                          <i class="fas fa-edit"></i>
                        </span>
                      </router-link>
                      <form @submit.prevent="confirmDeletion()">
                        <input type="hidden" :value="user.id">
                        <button type="submit" class="button is-small is-danger" title="Deletar usuário.">
                          <span class="icon is-small">
                            <i class="fas fa-trash-alt"></i>
                          </span>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="buttons is-hidden-touch">
              <router-link :to="{
                name: 'UserInfo',
                params: {
                  id: user.id
                }
              }" class="button is-small is-info" title="Informação completa.">
                <span class="icon is-small">
                  <i class="fas fa-info"></i>
                </span>
              </router-link>
              <router-link :to="{
                name: 'UserEdit',
                params: {
                  id: user.id
                }
              }" class="button is-small is-warning" title="Editar usuário.">
                <span class="icon is-small">
                  <i class="fas fa-edit"></i>
                </span>
              </router-link>
              <form @submit.prevent="confirmDeletion()">
                <input type="hidden" :value="user.id">
                <button type="submit" class="button is-small is-danger" title="Deletar usuário.">
                  <span class="icon is-small">
                    <i class="fas fa-trash-alt"></i>
                  </span>
                </button>
              </form>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import SearchFilterComponent from './SearchFilterComponent'

  export default {
    data() {
      return {
        users: [
          { id: 1, nome: 'Tobias de Oliveira', cpf: '11111111111', telefone: '55119111111111', reservas_ativas: '2' },
          { id: 2, nome: 'Dinorá de Oliveira', cpf: '22222222222', telefone: '55119222222222', reservas_ativas: '3' },
          { id: 3, nome: 'Josias Cruz', cpf: '33333333333', telefone: '55119333333333', reservas_ativas: '1' },
          { id: 4, nome: 'Doralice Cruz', cpf: '44444444444', telefone: '55119444444444', reservas_ativas: '1' }
        ]
      }
    },
    components: {
      SearchFilterComponent
    },
    methods: {
      confirmDeletion() {
        if (confirm('Deseja realmente deletar o usuário?')) {
          alert('Usuário deletado com sucesso.')
        }
      }
    }
  }
</script>

<style scoped>
  
</style>