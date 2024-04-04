<template>
  <div id="users">
    <h1>Lista de usuários</h1>
    <hr>
    <div class="content">
      <div class="columns">
        <SearchFilterComponent @userFound="userFound($event)" />
      </div>
    </div>
    <table class="table is-striped is-fullwidth">
      <thead>
        <tr>
          <th><abbr title="Nome do usuário.">Nome</abbr></th>
          <th><abbr title="CPF ou Número do passaporte do usuário.">CPF / NP</abbr></th>
          <th class="is-hidden-mobile"><abbr title="Telefone de contato do usuário.">Telefone</abbr></th>
          <th class="is-hidden-mobile"><abbr title="Cargo/Função do usuário.">Função</abbr></th>

          <th><abbr title="Opções de ação.">Ações</abbr></th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th><abbr title="Nome do usuário.">Nome</abbr></th>
          <th><abbr title="CPF ou Número do passaporte do usuário.">CPF / NP</abbr></th>
          <th class="is-hidden-mobile"><abbr title="Telefone de contato do usuário.">Telefone</abbr></th>
          <th class="is-hidden-mobile"><abbr title="Cargo/Função do usuário.">Função</abbr></th>
          <th><abbr title="Opções de ação.">Ações</abbr></th>
        </tr>
      </tfoot>
      <tbody>
        <tr v-for="user in users" :key="user._id">
          <td class="is-capitalized">{{ user.name }}</td>
          <td v-if="user.cpf">{{ user.cpf }}</td>
          <td v-else>{{ user.passportNumber }}</td>
          <td class="is-hidden-mobile">{{ user.phoneCode }} {{ user.phoneNumber }}</td>
          <td class="is-hidden-mobile">{{ user.role | formatRole }}</td>
          <td>
            <div class="dropdown is-right is-hidden-desktop">
              <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" :aria-controls="user._id">
                  <span>
                    <i class="fas fa-ellipsis-v"></i>
                  </span>
                </button>
              </div>
              <div class="dropdown-menu" :id="user._id" role="menu">
                <div class="dropdown-content">
                  <div class="dropdown-item">
                    <div class="buttons">
                      <router-link :to="{
                        name: 'UserInfo',
                        params: {
                          id: user._id
                        }
                      }" class="button is-small is-info" title="Informação completa.">
                        <span class="icon is-small">
                          <i class="fas fa-info"></i>
                        </span>
                      </router-link>
                      <router-link :to="{
                        name: 'UserEdit',
                        params: {
                          id: user._id
                        }
                      }" class="button is-small is-warning" title="Editar usuário.">
                        <span class="icon is-small">
                          <i class="fas fa-edit"></i>
                        </span>
                      </router-link>
                      <form @submit.prevent="confirmDeletion($event)">
                        <input type="hidden" :value="user._id">
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
                  id: user._id
                }
              }" class="button is-small is-info" title="Informação completa.">
                <span class="icon is-small">
                  <i class="fas fa-info"></i>
                </span>
              </router-link>
              <router-link :to="{
                name: 'UserEdit',
                params: {
                  id: user._id
                }
              }" class="button is-small is-warning" title="Editar usuário.">
                <span class="icon is-small">
                  <i class="fas fa-edit"></i>
                </span>
              </router-link>
              <form @submit.prevent="confirmDeletion(`${ user._links.find(el => el.rel == 'delete_user').href }`)">
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
  import axios from 'axios'
  import SearchFilterComponent from './SearchFilterComponent'
  import Endpoints from '@/tools/EndpointsConfig'

  export default {
    created() {
      this.getUsers()
    },
    data() {
      return {
        axiosConfig: {
          headers: {
            Authorization: `Bearer ${ localStorage.getItem('token_hotel_paraiso') }`
          }
        },
        users: [],
        forms: {
          search: {
            hasErrors: false,
            iptName: {
              value: '',
              hasError: false,
              error: ''
            },
            iptPassportNumber: {
              value: '',
              hasError: false,
              error: ''
            }
          }
        }
      }
    },
    components: {
      SearchFilterComponent
    },
    filters: {
      formatRole(role) {
        if (role || role == 0) {
          switch (role) {
            case 0:
              return 'Cliente'
            case 1:
              return 'Funcionário'
            case 2:
              return 'Gerente'
            case 4:
              return 'Admin'
          }
        }
      }
    },
    methods: {
      userFound(event) {
        this.users = event.users
      },
      getUsers() {
        axios.get(Endpoints.GET_USERS(), this.axiosConfig)
          .then(res => {
            this.users = res.data.users
          })
          .catch(error => {
            console.error(error)
          })
      },
      confirmDeletion(delete_user_link) {
        if (confirm(`Deseja realmente deletar o usuário?`)) {
          axios.delete(delete_user_link, this.axiosConfig)
            .then(() => {
              this.getUsers()
            })
            .catch(error => {
              console.error(error)
            })
        }
      }
    }
  }
</script>

<style scoped>
  
</style>