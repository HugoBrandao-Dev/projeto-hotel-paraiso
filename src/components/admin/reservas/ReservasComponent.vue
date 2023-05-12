<template>
  <article id="reservas">
    <h1>Lista de reservas</h1>
    <hr>
    <div class="container">
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
              <div class="buttons">
                <router-link :to="{
                  name: 'ReservaInfo',
                  params: {
                    id: reserva.id
                  }
                }" class="button is-small is-info" title="Informação completa.">
                  <span class="icon is-small">
                    <i class="fas fa-info"></i>
                  </span>
                </router-link>
                <router-link :to="{
                  name: 'ReservaEdit',
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
    }
  }
</script>

<style scoped>
  
</style>