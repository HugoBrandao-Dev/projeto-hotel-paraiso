<template>
  <article id="apartments">
    <h1>Lista de apartamentos</h1>
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
                  <input type="number" class="input">
                </div>
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
        <button class="button is-primary is-large">Novo apartamento</button>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th class="is-hidden-mobile">Andar</th>
            <th>Nº do Apartamento</th>
            <th class="is-hidden-mobile">Total de cômodos</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <th class="is-hidden-mobile">Andar</th>
            <th>Nº do Apartamento</th>
            <th class="is-hidden-mobile">Total de cômodos</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </tfoot>
        <tbody>
          <tr
            v-for="apartment in apartments"
            :key="apartment.id"
          >
            <td class="is-hidden-mobile">{{ apartment.andar }}</td>
            <td>{{ apartment.numero }}</td>
            <td class="is-hidden-mobile">{{ apartment.rooms }}</td>
            <td>
              <span v-if="apartment.status == 1" class="tag is-success">Livre</span>
              <span v-else-if="apartment.status == 2" class="tag is-danger">Ocupado</span>
              <span v-else class="tag is-dark">Indisponível</span>
            </td>
            <td>
              <div class="dropdown is-right is-hidden-desktop">
                <div class="dropdown-trigger">
                  <button class="button" aria-haspopup="true" :aria-controls="apartment.id">
                    <span>
                      <i class="fas fa-ellipsis-v"></i>
                    </span>
                  </button>
                </div>
                <div class="dropdown-menu" :id="apartment.id" role="menu">
                  <div class="dropdown-content">
                    <div class="dropdown-item">
                      <div class="buttons">
                        <router-link :to="{
                            name: 'Apartment_admin',
                            params: {
                              id: apartment.id
                            }
                          }" class="button is-small is-info" title="Informação completa.">
                          <span class="icon is-small">
                            <i class="fas fa-info"></i>
                          </span>
                        </router-link>
                          <router-link :to="{
                              name: 'Ocupante',
                              params: {
                                id: apartment.id
                              }
                            }" class="button is-small is-warning" title="Editar usuário.">
                            <span class="icon is-small">
                              <i class="fas fa-edit"></i>
                            </span>
                          </router-link>
                          <form @submit.prevent="confirmDeletion()">
                            <input type="hidden" :value="apartment.id">
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
                  name: 'Apartment_admin',
                  params: {
                    id: apartment.id
                  }
                }" class="button is-small is-info" title="Informação completa.">
                  <span class="icon is-small">
                    <i class="fas fa-info"></i>
                  </span>
                </router-link>
                <router-link :to="{
                  name: 'Ocupante',
                  params: {
                    id: apartment.id
                  }
                }" class="button is-small is-warning" title="Editar usuário.">
                  <span class="icon is-small">
                    <i class="fas fa-edit"></i>
                  </span>
                </router-link>
                <form @submit.prevent="confirmDeletion()">
                  <input type="hidden" :value="apartment.id">
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
      <p>
        <span class="tag is-dark">Indisponível</span> Devido a alguma reforma, limpeza, etc.
      </p>
    </div>
  </article>
</template>

<script>
  export default {
    data() {
      return {
        apartments: [
          {
            id: 1,
            andar: 1,
            numero: 1,
            rooms: 8,
            status: 1
          },
          {
            id: 2,
            andar: 1,
            numero: 2,
            rooms: 8,
            status: 1
          },
          {
            id: 3,
            andar: 2,
            numero: 3,
            rooms: 4,
            status: 1
          },
          {
            id: 4,
            andar: 2,
            numero: 4,
            rooms: 4,
            status: 2
          },
          {
            id: 5,
            andar: 2,
            numero: 5,
            rooms: 4,
            status: 1
          },
          {
            id: 6,
            andar: 2,
            numero: 6,
            rooms: 4,
            status: 2
          },
          {
            id: 7,
            andar: 3,
            numero: 7,
            rooms: 8,
            status: 1
          },
          {
            id: 8,
            andar: 3,
            numero: 8,
            rooms: 8,
            status: 3
          }
        ]
      }
    },
    methods: {
      confirmDeletion() {
        if (confirm('Deseja deletar apartamento?')) {
          alert('Apartamento deletado com sucesso.')
        }
      }
    }
  }
</script>

<style scoped>
  
</style>