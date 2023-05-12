<template>
  <div id="users">
    <h1>Usuário cadastrados</h1>
    <hr>
    <table class="table is-striped is-fullwidth">
  <thead>
    <tr>
      <th><abbr title="Nome do usuário.">Nome</abbr></th>
      <th><abbr title="CPF do usuário.">CPF</abbr></th>
      <th><abbr title="Telefone de contato do usuário.">Telefone</abbr></th>
      <th><abbr title="Reservas ativas do usuário.">Reservas Ativas</abbr></th>

      <th><abbr title="Opções de ação.">Ações</abbr></th>
    </tr>
  </thead>
  <tfoot>
    <tr>
      <th><abbr title="Nome do usuário.">Nome</abbr></th>
      <th><abbr title="CPF do usuário.">CPF</abbr></th>
      <th><abbr title="Telefone de contato do usuário.">Telefone</abbr></th>
      <th><abbr title="Reservas ativas do usuário.">Reservas Ativas</abbr></th>
      <th><abbr title="Opções de ação.">Ações</abbr></th>
    </tr>
  </tfoot>
  <tbody>
    <tr v-for="user in users" :key="user.cpf">
      <td>{{ user.nome }}</td>
      <td>{{ user.cpf }}</td>
      <td>{{ user.telefone }}</td>
      <td>{{ user.reservas_ativas }}</td>
      <td>
        <div class="buttons">
          <a href="#" class="button is-small is-info" title="Informação completa.">
            <span class="icon is-small">
              <i class="fas fa-info"></i>
            </span>
          </a>
          <a href="#" class="button is-small is-warning" title="Editar usuário.">
            <span class="icon is-small">
              <i class="fas fa-edit"></i>
            </span>
          </a>
          <a href="#" class="button is-small is-danger" title="Deletar usuário.">
            <span class="icon is-small">
              <i class="fas fa-trash-alt"></i>
            </span>
          </a>
        </div>
      </td>
    </tr>
  </tbody>
</table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        users: [
          { nome: 'Tobias de Oliveira', cpf: '11111111111', telefone: '55119111111111', reservas_ativas: '2' },
          { nome: 'Dinorá de Oliveira', cpf: '22222222222', telefone: '55119222222222', reservas_ativas: '3' },
          { nome: 'Josias Cruz', cpf: '33333333333', telefone: '55119333333333', reservas_ativas: '1' },
          { nome: 'Doralice Cruz', cpf: '44444444444', telefone: '55119444444444', reservas_ativas: '1' }
        ]
      }
    }
  }
</script>

<style scoped>
  
</style>