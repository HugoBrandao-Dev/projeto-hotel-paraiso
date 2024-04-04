<template>
  <article id="apartments">
    <h1>Lista de apartamentos</h1>
    <hr>
    <div class="content">
      <!-- <SearchFilterComponent /> -->
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
          <tr v-for="apartment in apartments" :key="apartment._id" >
            <td class="is-hidden-mobile">{{ apartment.floor }}</td>
            <td>{{ apartment.number }}</td>
            <td class="is-hidden-mobile">{{ apartment.rooms | calcTotalRooms }}</td>
            <td v-if="apartment.reserve">
              <span class="tag" :class="applyTagColor(apartment.reserve.status)">{{ apartment.reserve.status }}</span>
            </td>
            <td>
              <div class="dropdown is-right is-hidden-desktop">
                <div class="dropdown-trigger">
                  <button class="button" aria-haspopup="true" :aria-controls="apartment._id">
                    <span>
                      <i class="fas fa-ellipsis-v"></i>
                    </span>
                  </button>
                </div>
                <div class="dropdown-menu" :id="apartment._id" role="menu">
                  <div class="dropdown-content">
                    <div class="dropdown-item">
                      <div class="buttons">
                        <router-link :to="{
                            name: 'Apartment_admin',
                            params: {
                              id: apartment._id
                            }
                          }" class="button is-small is-info" title="Informação completa.">
                          <span class="icon is-small">
                            <i class="fas fa-info"></i>
                          </span>
                        </router-link>
                          <router-link :to="{
                              name: 'ApartmentEdit_admin',
                              params: {
                                id: apartment._id
                              }
                            }" class="button is-small is-warning" title="Editar usuário.">
                            <span class="icon is-small">
                              <i class="fas fa-edit"></i>
                            </span>
                          </router-link>
                          <form @submit.prevent="confirmDeletion()">
                            <input type="hidden" :value="apartment._id">
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
                    id: apartment._id
                  }
                }" class="button is-small is-info" title="Informação completa.">
                  <span class="icon is-small">
                    <i class="fas fa-info"></i>
                  </span>
                </router-link>
                <router-link :to="{
                  name: 'ApartmentEdit_admin',
                  params: {
                    id: apartment._id
                  }
                }" class="button is-small is-warning" title="Editar usuário.">
                  <span class="icon is-small">
                    <i class="fas fa-edit"></i>
                  </span>
                </router-link>
                <form @submit.prevent="confirmDeletion()">
                  <input type="hidden" :value="apartment._id">
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
  import axios from 'axios'
  // import SearchFilterComponent from './SearchFilterComponent'
  import Endpoints from '@/tools/EndpointsConfig'

  export default {
    created() {
      this.getApartments()
    },
    data() {
      return {
        axiosConfig: {
          headers: {
            Authorization: `Bearer ${ localStorage.getItem('token_hotel_paraiso') }`
          }
        },
        apartments: []
      }
    },
    components: {
      // SearchFilterComponent
    },
    filters:{
      calcTotalRooms(rooms) {
        if (rooms.length) {
          let quantities = rooms.map(el => el.quantity)
          return quantities.reduce((a, b) => a + b)
        }
        return 0
      }
    },
    methods: {
      applyTagColor(status) {
        if (status) {
          switch (status) {
            case 'livre':
              return 'is-primary'
            case 'reservado':
              return 'is-link'
            case 'ocupado':
              return 'is-danger'
            default:
              return 'is-dark'
          }
        }
        return ''
      },
      getApartments() {
        axios.get(Endpoints.GET_APARTMENTS(), this.axiosConfig)
          .then(res => this.apartments = res.data.apartments)
          .catch(error=> console.log(error))
      },
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