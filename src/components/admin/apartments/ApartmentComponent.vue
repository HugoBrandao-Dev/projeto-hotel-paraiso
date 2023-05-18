<template>
  <article>
    <h1>Apartamento</h1>
    <hr>
    <div class="columns">
      <div class="column is-three-fifths mx-auto">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title is-size-4">
              Apartamento #{{ this.$route.params.id }}
            </p>
          </header>
          <div class="card-image">
            <figure class="image is-16by9">
              <img src="../../../assets/reservas/reserva.png" alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content">
            <div class="is-flex is-justify-content-space-between">
              <div class="box has-background-primary has-text-white">
                <p>
                  Diária: <strong class="is-size-4 has-text-white">R$ 200,00</strong>
                </p>
              </div>    
              <span class="tag is-success is-large" title="Status atual do apartamento.">Livre</span>
            </div>
            <div class="field">
              <label class="label">Andar:</label>
              <div class="control">
                <p>2</p>
              </div>
            </div>
            <div class="field">
              <label class="label">Apartamento:</label>
              <div class="control">
                <p>4</p>
              </div>
            </div>
            <div class="field">
              <label class="label">4 Cômodos:</label>
              <div class="control">
                <ul>
                  <li>1 Cozinha</li>
                  <li>1 Sala de estar</li>
                  <li>1 Quarto</li>
                  <li>1 Banheiro</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
  
</script>

<style scoped>
  
</style>