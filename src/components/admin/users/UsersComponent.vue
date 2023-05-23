<template>
  <div id="users">
    <h1>Lista de usuários</h1>
    <hr>
    <div class="content">
      <div class="columns">
        <div class="column is-half mx-auto">
          <div class="box">
            <h2>Filtro</h2>
            <div class="content">
              <div class="field">
                <label class="label">Pesquisar por:</label>
                <div class="control">
                  <label class="radio">
                    <input type="radio" checked name="tipo-pesquisa" value="nome" v-model="search.type">
                    Nome
                  </label>
                  <label class="radio">
                    <input type="radio" name="tipo-pesquisa" value="cpf" v-model="search.type">
                      CPF
                  </label>
                </div>
              </div>
              <div class="field is-grouped" v-if="search.type == 'nome'">
                <p class="control is-expanded" :class="{ 'has-icons-right': search.iptName.hasError }">
                  <input
                    class="input"
                    :class="{
                      'is-normal': search.iptName.hasError,
                      'is-danger': search.iptName.hasError
                    }"
                    type="text"
                    placeholder="Tobias de Oliveira"
                    v-model="search.iptName.value"
                  />
                  <span class="icon is-small is-right" v-show="search.iptName.hasError">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                </p>
                <p class="control">
                  <a class="button is-info">
                    Pesquisar
                  </a>
                </p>
              </div>
              <div class="field is-grouped" v-else>
                <p class="control is-expanded" :class="{ 'has-icons-right': search.iptCPF.hasError }">
                  <imask-input
                    class="input"
                    :class="{
                      'is-normal': search.iptCPF.hasError,
                      'is-danger': search.iptCPF.hasError
                    }"
                    type="text"
                    placeholder="000.000.000-00"
                    :mask="masks.cpf"
                    :unmask="true"
                    v-model="search.iptCPF.value"
                  />
                  <span class="icon is-small is-right" v-show="search.iptCPF.hasError">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                </p>
                <p class="control">
                  <a class="button is-info">
                    Pesquisar
                  </a>
                </p>
              </div>
              <p class="help" :class="{ 'is-danger': search.iptName.error }">
                {{ search.iptName.error }}
              </p>
              <p class="help" :class="{ 'is-danger': search.iptCPF.error }">
                {{ search.iptCPF.error }}
              </p>
            </div>
          </div>
        </div>
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
        search: {
          type: 'nome',
          iptName: {
            value: '',
            hasError: false,
            error: ''
          },
          iptCPF: {
            value: '',
            hasError: false,
            error: ''
          }
        }
      }
    },
    methods: {
      confirmDeletion() {
        if (confirm('Deseja realmente deletar o usuário?')) {
          alert('Usuário deletado com sucesso.')
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