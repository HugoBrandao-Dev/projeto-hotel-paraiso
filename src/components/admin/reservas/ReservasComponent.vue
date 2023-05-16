<template>
  <article id="reservas">
    <h1>Lista de reservas</h1>
    <hr>
    <div class="filter columns mt-3">
      <div class="card column is-two-thirds-tablet mx-auto">
        <header class="card-header">
          <p class="card-header-title">
            Filtro
          </p>
        </header>
        <div class="card-content">
          <div class="content is-flex is-flex-direction-column is-align-items-center">
            <div class="field">
              <label class="label">Pesquisar por nº de:</label>
              <div class="control">
                <label class="radio">
                  <input type="radio" checked name="tipo-pesquisa" value="apartamento" v-model="searchType">
                  Apartamento
                </label>
                <label class="radio">
                  <input type="radio" name="tipo-pesquisa" value="casa" v-model="searchType">
                  Casa
                </label>
              </div>
            </div>
              <div class="field has-addons mt-3">
                <div class="control">
                  <input class="input" type="text" placeholder="123456">
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
    </div>

    <div id="admin-reservas">
      <table class="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th><abbr title="Nome do usuário.">Tipo</abbr></th>
            <th><abbr title="CPF do usuário.">Status</abbr></th>
            <th><abbr title="Telefone de contato do usuário.">Reservado por</abbr></th>
            <th><abbr title="Opções de ação.">Ações</abbr></th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th><abbr title="Nome do usuário.">Tipo</abbr></th>
            <th><abbr title="CPF do usuário.">Status</abbr></th>
            <th><abbr title="Telefone de contato do usuário.">Reservado por</abbr></th>
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
            <td>
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
                              name: 'Ocupante',
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
                  name: 'Ocupante',
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
  </article>
</template>

<script>
  export default {
    data() {
      return {
        searchType: 'apartamento',
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