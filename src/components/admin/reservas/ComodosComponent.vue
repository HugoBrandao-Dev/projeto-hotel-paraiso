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
            <button class="button is-danger is-small" title="Deletar cômodo.">
              <span class="icon is-small">
                <i class="fas fa-minus"></i>
              </span>
            </button>
          </td>
        </tr>
        <tr>
          <td>1</td>
          <td>Cozinha</td>
          <td>
            <button class="button is-danger is-small" title="Deletar cômodo.">
              <span class="icon is-small">
                <i class="fas fa-minus"></i>
              </span>
            </button>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Quartos</td>
          <td>
            <button class="button is-danger is-small" title="Deletar cômodo.">
              <span class="icon is-small">
                <i class="fas fa-minus"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  
</script>

<style scoped>
  
</style>