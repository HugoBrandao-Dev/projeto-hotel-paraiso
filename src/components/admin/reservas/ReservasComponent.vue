<template>
  <article id="reservas">
    <h1>Lista de reservas</h1>
    <hr>
    <div class="content">
      <div class="columns">
        <div class="column is-half mx-auto">
          <div class="box">
            <h2>Filtro</h2>
            <div class="columns">
              <div class="field column is-half">
                <label class="label">Andar:</label>
                <div class="control">
                  <input 
                    type="number"
                    class="input"
                    :class="{
                      'is-danger': search.iptFloor.hasError
                    }"
                    v-model="search.iptFloor.value"
                  />
                </div>
                <p class="help" :class="{ 'is-danger': search.iptFloor.hasError }">
                  {{ search.iptFloor.error }}
                </p>
              </div>
              <div class="field column">
                <label class="label">Número:</label>
                <div class="control">
                  <input type="number" class="input">
                </div>
              </div>
            </div>
            <div class="buttons is-right">
              <button class="button is-ghost">Limpar</button>
              <button class="button is-info">Buscar</button>
            </div>
          </div>
        </div>
      </div>

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
  export default {
    data() {
      return {
        search: {
          type: 'apartamento',
          iptFloor: {
            value: '',
            hasError: false,
            error: ''
          }
        },
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
        ]
      }
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