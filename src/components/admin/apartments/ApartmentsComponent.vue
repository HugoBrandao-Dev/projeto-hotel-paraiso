<template>
  <article id="apartments">
    <h1>Lista de apartamentos</h1>
    <hr>
    <div class="content">
      <SearchFilterComponent />
      <div class="buttons is-right">
        <a href="/admin/apartments/new" class="button is-primary is-large">
          Novo apartamento
        </a>
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
              <span v-else-if="apartment.status == 2" class="tag is-link">Reservado</span>
              <span v-else-if="apartment.status == 3" class="tag is-danger">Ocupado</span>
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
                              name: 'ApartmentEdit_admin',
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
                  name: 'ApartmentEdit_admin',
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
      <section id="info-status">
        <p>
          <span class="tag is-link">Reservado</span> O usuário fez a reserva, mas ainda <strong>não está</strong> no local.
        </p>
        <p>
          <span class="tag is-danger">Ocupado</span> O usuário fez a reserva e <strong>já está</strong> no local.
        </p>
        <p>
          <span class="tag is-dark">Indisponível</span> Devido a alguma reforma, limpeza, etc.
        </p>
      </section>
    </div>
  </article>
</template>

<script>
  import SearchFilterComponent from '../reservas/SearchFilterComponent'

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
            status: 2
          },
          {
            id: 3,
            andar: 2,
            numero: 3,
            rooms: 4,
            status: 3
          },
          {
            id: 4,
            andar: 2,
            numero: 4,
            rooms: 4,
            status: 4
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
            status: 3
          },
          {
            id: 8,
            andar: 3,
            numero: 8,
            rooms: 8,
            status: 4
          }
        ]
      }
    },
    components: {
      SearchFilterComponent
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