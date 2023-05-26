<template>
  <article id="reservas">
    <h1>Lista de reservas</h1>
    <hr>
    <div class="content">
      <section id="search-filter" class="columns">
        <div class="column is-half mx-auto">
          <div class="box">
            <hgroup>
              <h2>Filtro</h2>
              <h3>Apartamento</h3>
            </hgroup>
            <div class="columns">
              <div class="field column">
                <label class="label">Status:</label>
                <div class="control">
                  <div class="select">
                    <select>
                      <option>Select dropdown</option>
                      <option>With options</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="field column">
                <label class="label">Andar:</label>
                <div class="control">
                  <input 
                    type="number"
                    class="input"
                  />
                </div>
              </div>
              <div class="field column">
                <label class="label">Número:</label>
                <div class="control">
                  <input 
                    type="number" 
                    class="input"
                  />
                </div>
              </div>
            </div>
            <div class="mb-4">
              <h3>Cliente</h3>
              <div>
                <div class="field">
                  <label class="label">Pesquisar por:</label>
                  <div class="control">
                    <label class="radio">
                      <input 
                        type="radio"
                        name="tipo-pesquisa"
                        value="nome"
                        v-model="search.client.type"
                      >
                        Nome
                    </label>
                    <label class="radio">
                      <input 
                        type="radio"
                        name="tipo-pesquisa"
                        value="cpf"
                        v-model="search.client.type"
                      >
                        CPF
                    </label>
                    <label class="radio">
                      <input 
                        type="radio"
                        name="tipo-pesquisa"
                        value="passport-number"
                        v-model="search.client.type"
                      >
                        Passport Number
                    </label>
                  </div>
                </div>
                <div class="field is-grouped" v-if="search.client.type == 'nome'">
                  <p class="control is-expanded has-icons-right">
                    <input
                      class="input"
                      :class="{
                        'is-normal': search.client.iptName.hasError,
                        'is-danger': search.client.iptName.hasError
                      }"
                      type="text"
                      placeholder="Tobias de Oliveira"
                      v-model="search.client.iptName.value"
                    />
                    <span class="icon is-small is-right" v-show="search.client.iptName.hasError">
                      <i class="fas fa-exclamation-triangle"></i>
                    </span>
                  </p>
                  <p class="control">
                    <a class="button is-info">
                      Pesquisar
                    </a>
                  </p>
                </div>
                <div class="field is-grouped" v-else-if="search.client.type == 'cpf'">
                  <p class="control is-expanded has-icons-right">
                    <imask-input
                      class="input"
                      
                      type="text"
                      placeholder="000.000.000-00"
                      
                    />
                    <span class="icon is-small is-right">
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
                  <p class="control is-expanded has-icons-right">
                    <imask-input
                      class="input"
                      
                      type="text"
                      placeholder="0A0A0A0A0A"
                      
                    />
                    <span class="icon is-small is-right">
                      <i class="fas fa-exclamation-triangle"></i>
                    </span>
                  </p>
                  <p class="control">
                    <a class="button is-info">
                      Pesquisar
                    </a>
                  </p>
                </div>
                <p class="help" :class="{ 'is-danger': search.client.iptName.error }">
                  {{ search.client.iptName.error }}
                </p>
              </div>
            </div>
            <div class="buttons is-right">
              <button class="button is-ghost" @click="clearFields()">Limpar</button>
              <button class="button is-info">Buscar</button>
            </div>
          </div>
        </div>
      </section>
      <div class="buttons is-right">
        <a href="/admin/reservas/new" class="button is-primary is-large">
          Nova Reserva
        </a>
      </div>

      <div id="admin-reservas">
        <table class="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th><abbr title="Nome do usuário.">Tipo</abbr></th>
              <th><abbr title="CPF do usuário.">Status</abbr></th>
              <th class="is-hidden-mobile"><abbr title="Telefone de contato do usuário.">Reservado por</abbr></th>
              <th><abbr title="Opções de ação.">Ações</abbr></th>
            </tr>
          </thead>
          <tfoot>
            <tr>
              <th><abbr title="Nome do usuário.">Tipo</abbr></th>
              <th><abbr title="CPF do usuário.">Status</abbr></th>
              <th class="is-hidden-mobile"><abbr title="Telefone de contato do usuário.">Reservado por</abbr></th>
              <th><abbr title="Opções de ação.">Ações</abbr></th>
            </tr>
          </tfoot>
          <tbody>
            <tr v-for="reserva in reservas" :key="reserva.id">
              <td>{{ reserva.tipo }}</td>
              <td>
                <span 
                  class="tag" 
                  :class="{
                    'is-success': reserva.status == 'Livre',
                    'is-danger': reserva.status == 'Ocupado'
                  }"
                >
                  {{ reserva.status }}
                </span>
              </td>
              <td class="is-hidden-mobile">
                {{ reserva.reservado_por }}
              </td>
              <td>
                <div class="dropdown is-right is-hidden-desktop">
                  <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" :aria-controls="reserva.id">
                      <span>
                        <i class="fas fa-ellipsis-v"></i>
                      </span>
                    </button>
                  </div>
                  <div class="dropdown-menu" :id="reserva.id" role="menu">
                    <div class="dropdown-content">
                      <div class="dropdown-item">
                        <div class="buttons">
                          <router-link :to="{
                              name: 'Reserva_admin',
                              params: {
                                id: reserva.id
                              }
                            }" class="button is-small is-info" title="Informação completa.">
                            <span class="icon is-small">
                              <i class="fas fa-info"></i>
                            </span>
                          </router-link>
                            <router-link :to="{
                                name: 'ReservaEdit_admin',
                                params: {
                                  id: reserva.id
                                }
                              }" class="button is-small is-warning" title="Editar usuário.">
                              <span class="icon is-small">
                                <i class="fas fa-edit"></i>
                              </span>
                            </router-link>
                            <form @submit.prevent="confirmDeletion()">
                              <input type="hidden" :value="reserva.id">
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
                    name: 'Reserva_admin',
                    params: {
                      id: reserva.id
                    }
                  }" class="button is-small is-info" title="Informação completa.">
                    <span class="icon is-small">
                      <i class="fas fa-info"></i>
                    </span>
                  </router-link>
                  <router-link :to="{
                    name: 'ReservaEdit_admin',
                    params: {
                      id: reserva.id
                    }
                  }" class="button is-small is-warning" title="Editar usuário.">
                    <span class="icon is-small">
                      <i class="fas fa-edit"></i>
                    </span>
                  </router-link>
                  <form @submit.prevent="confirmDeletion()">
                    <input type="hidden" :value="reserva.id">
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
    </div>
  </article>
</template>

<script>
  import { IMaskComponent }  from 'vue-imask'

  export default {
    data() {
      return {
        reservas: [
          {
            id: 1,
            tipo: 'Apartamento',
            status: 'Ocupado',
            reservado_por: 'Tobias de Oliveira'
          },
          {
            id: 2,
            tipo: 'Apartamento',
            status: 'Livre',
            reservado_por: 'N/A'
          },
          {
            id: 3,
            tipo: 'Apartamento',
            status: 'Ocupado',
            reservado_por: 'Doralice Cruz'
          },
          {
            id: 4,
            tipo: 'Apartamento',
            status: 'Livre',
            reservado_por: 'N/A'
          }
        ],
        search: {
          client: {
            type: 'nome',
            iptName: {
              value: '',
              hasError: false,
              error: ''
            }
          }
        }
      }
    },
    components: {
      'imask-input': IMaskComponent
    },
    methods: {
      confirmDeletion() {
        if (confirm('Deseja deletar reserva?')) {
          alert('Reserva deletada com sucesso.')
        }
      }
    }
  }
</script>

<style scoped>
  
</style>