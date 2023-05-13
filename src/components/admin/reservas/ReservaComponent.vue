<template>
  <div id="reserva">
    <h1>Informações da reserva</h1>
    <hr>
    <div class="container">
      <div class="card mt-4">
        <header class="card-header">
          <p class="card-header-title is-size-4">
            Reserva #{{ this.$route.params.id }}
          </p>
        </header>
        <div class="card-image">
          <figure class="image is-16by9">
            <img src="../../../assets/reservas/reserva.png">
          </figure>
        </div>
        <div class="card-content">
          <div class="content">
            <article class="message is-info">
              <div class="message-header">
                <p class="is-size-3">6 Cômodos</p>
              </div>
              <div class="message-body">
                <ul>
                  <li>1 Sala de estar</li>
                  <li>1 Cozinha</li>
                  <li>1 Banheiro</li>
                  <li>2 Quartos</li>
                  <li>1 Pet room</li>
                </ul>
              </div>
            </article>
            <article class="message is-info">
              <div class="message-header">
                <p class="is-size-3">Ocupante</p>
              </div>
              <div class="message-body">
                <div class="field">
                  <label class="label">Nome:</label>
                  <div class="control">
                    <p>Tobias de Oliveira</p>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Email:</label>
                  <div class="control">
                    <p>tobias@gmail.com</p>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Telefone:</label>
                  <div class="control">
                    <p>+55 (11) 00000-0000</p>
                  </div>
                </div>
                <div class="field">
                  <label class="label">CPF:</label>
                  <div class="control">
                    <p>000.000.000-00</p>
                  </div>
                </div>
                <div class="field">
                  <label class="label">País:</label>
                  <div class="control">
                    <p>Brasil</p>
                  </div>
                </div>
                <div class="field">
                  <label class="label">CEP:</label>
                  <div class="control">
                    <p>00000-000</p>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Estado:</label>
                  <div class="control">
                    <p>São Paulo</p>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Cidade:</label>
                  <div class="control">
                    <p>São Paulo</p>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Bairro:</label>
                  <div class="control">
                    <p>Nome do bairro</p>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Rua/Avenida:</label>
                  <div class="control">
                    <p>Nome da rua/avenida</p>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Nº da casa:</label>
                  <div class="control">
                    <p>00000</p>
                  </div>
                </div>
                <div class="field">
                  <label class="label">Informações adicionais:</label>
                  <div class="control">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  
</script>

<style scoped>
  
</style>