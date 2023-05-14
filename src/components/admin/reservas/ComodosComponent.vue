<template>
  <div id="comodos" class="content">
    <h2 class="is-flex is-justify-content-space-between">
      4 cômodos
      <button class="button is-primary is-small" title="Adicionar novo cômodo.">
        <span class="icon is-small">
          <i class="fas fa-plus"></i>
        </span>
      </button>
    </h2>
    <table class="table">
      <thead>
        <tr>
          <th><abbr title="Quantidade de cada cômodo">Quantidade</abbr></th>
          <th>Cômodo</th>
          <th>Ação</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th><abbr title="Quantidade de cada cômodo">Quantidade</abbr></th>
          <th>Cômodo</th>
          <th>Ação</th>
        </tr>
      </tfoot>
      <tbody>
        <tr>
          <td>1</td>
          <td>Sala de estar</td>
          <td>
            <form @submit.prevent="confirmDeletion()">
              <input type="hidden">
              <button type="submit" class="button is-danger is-small" title="Deletar cômodo.">
                <span class="icon is-small">
                  <i class="fas fa-minus"></i>
                </span>
              </button>
            </form>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>Cozinha</td>
          <td>
            <form @submit.prevent="confirmDeletion()">
              <input type="hidden">
              <button class="button is-danger is-small" title="Deletar cômodo.">
                <span class="icon is-small">
                  <i class="fas fa-minus"></i>
                </span>
              </button>
            </form>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Quartos</td>
          <td>
            <form @submit.prevent="confirmDeletion()">
              <input type="hidden">
              <button class="button is-danger is-small" title="Deletar cômodo.">
                <span class="icon is-small">
                  <i class="fas fa-minus"></i>
                </span>
              </button>
            </form>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Novo cômodo</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Quantidade:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input class="input" type="text">
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Cômodo:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <div class="select">
                    <select>
                      <option>Sala de estar</option>
                      <option>Cozinha</option>
                      <option>Quarto</option>
                      <option>Banheiro</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Add</button>
          <button class="button is-danger">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      confirmDeletion() {
        if (confirm('Deseja realmente excluir o cômodo?')) {
          alert('Cômodo excluido.')
        }
      }
    }
  }
</script>

<style scoped>
  
</style>