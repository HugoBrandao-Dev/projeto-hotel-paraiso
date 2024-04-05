<template>
  <article id="admin-nova-reserva">
    <h1>Nova reserva</h1>
    <hr>
    <div class="content columns">
      <section class="section column is-fullhd-tablet">
        <div class="notification is-danger" v-show="messages.apartment.hasError">
          <button class="delete" @click="messages.apartment.hasError = false"></button>
          {{ messages.apartment.error }}
        </div>
        <div class="tile is-child box" :class="{'has-background-danger': messages.apartment.hasError}">
          <h2>Reservas</h2>
          <p>Selecione uma reserva...</p>
          <div class="box">
            <h3>Filtro</h3>
            <div class="columns">
              <div class="field column is-half is-fullhd-tablet">
                <label class="label">Andar:</label>
                <div class="control">
                  <input 
                    type="number" 
                    class="input is-small"
                    :class="{'is-danger': searchApartment.iptFloor.hasError}"
                    v-model="searchApartment.iptFloor.value"
                  />
                </div>
                <p class="help" :class="{'is-danger': searchApartment.iptFloor.hasError}">
                  {{ searchApartment.iptFloor.error }}
                </p>
              </div>
              <div class="field column is-half is-fullhd-tablet">
                <label class="label">Apartamento:</label>
                <div class="control">
                  <input 
                  type="number" 
                  class="input is-small"
                  :class="{'is-danger': searchApartment.iptNumber.hasError}"
                  v-model="searchApartment.iptNumber.value"
                />
                </div>
                <p class="help" :class="{'is-danger': searchApartment.iptNumber.hasError}">
                  {{ searchApartment.iptNumber.error }}
                </p>
              </div>
            </div>
            <div class="buttons is-right">
              <button class="button is-small is-ghost" @click="clearFields()">Limpar</button>
              <button class="button is-small is-info">Buscar</button>
            </div>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th class="is-hidden-touch"><abbr title="Selecionar apartamento">Selecione</abbr></th>
                <th><abbr title="Andar do apartamento">Andar</abbr></th>
                <th><abbr title="Número do apartamento">Nº</abbr></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th class="is-hidden-touch"><abbr title="Selecionar apartamento">Selecione</abbr></th>
                <th><abbr title="Andar do apartamento">Andar</abbr></th>
                <th><abbr title="Número do apartamento">Nº</abbr></th>
              </tr>
            </tfoot>
            <tbody>
              <tr 
                v-for="apartment in apartments"
                :key="apartment._id"
                @click="apartmentSelected = apartment"
                :class="{'is-selected': apartment == apartmentSelected }"
              >
                <td class="is-hidden-touch">
                  <input type="hidden" :value="apartment._id">
                  <input type="radio" :value="apartment._id" v-model="apartmentSelected._id">
                </td>
                <td>{{ apartment.floor }}</td>
                <td>{{ apartment.number }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="section column is-fullhd-tablet">
        <div class="notification is-danger" v-show="messages.client.hasError">
          <button class="delete" @click="messages.client.hasError = false"></button>
          {{ messages.client.error }}
        </div>
        <div class="tile is-child box" :class="{'has-background-danger': messages.client.hasError}">
          <h2>Clientes</h2>
          <p>Selecione um cliente...</p>
          <div class="box">
            <h2>Filtro</h2>
            <div class="content">
              <div class="field">
                <label class="label">Pesquisar por:</label>
                <div class="control">
                  <label class="radio">
                    <input type="radio" checked name="tipo-pesquisa" value="nome" v-model="searchClient.type">
                    Nome
                  </label>
                  <label class="radio">
                    <input type="radio" name="tipo-pesquisa" value="cpf" v-model="searchClient.type">
                      CPF
                  </label>
                  <label class="radio">
                    <input type="radio" name="tipo-pesquisa" value="passport-number" v-model="searchClient.type">
                      Passport Number
                  </label>
                </div>
              </div>
              <div class="field is-grouped" v-if="searchClient.type == 'nome'">
                <p class="control is-expanded" :class="{ 'has-icons-right': searchClient.iptName.hasError }">
                  <input
                    class="input is-small"
                    :class="{
                      'is-normal': searchClient.iptName.hasError,
                      'is-danger': searchClient.iptName.hasError
                    }"
                    type="text"
                    placeholder="Tobias de Oliveira"
                    v-model="searchClient.iptName.value"
                  />
                  <span class="icon is-small is-right" v-show="searchClient.iptName.hasError">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                </p>
                <p class="control">
                  <a class="button is-small is-info">
                    Pesquisar
                  </a>
                </p>
              </div>
              <div class="field is-grouped" v-else-if="searchClient.type == 'cpf'">
                <p class="control is-expanded" :class="{ 'has-icons-right': searchClient.iptCPF.hasError }">
                  <imask-input
                    class="input is-small"
                    :class="{
                      'is-normal': searchClient.iptCPF.hasError,
                      'is-danger': searchClient.iptCPF.hasError
                    }"
                    type="text"
                    placeholder="000.000.000-00"
                    :mask="masks.cpf"
                    :unmask="true"
                    v-model="searchClient.iptCPF.value"
                  />
                  <span class="icon is-small is-right" v-show="searchClient.iptCPF.hasError">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                </p>
                <p class="control">
                  <a class="button is-small is-info">
                    Pesquisar
                  </a>
                </p>
              </div>
              <div class="field is-grouped" v-else>
                <p class="control is-expanded" :class="{ 'has-icons-right': searchClient.iptPassportNumber.hasError }">
                  <imask-input
                    class="input is-small"
                    :class="{
                      'is-normal': searchClient.iptPassportNumber.hasError,
                      'is-danger': searchClient.iptPassportNumber.hasError
                    }"
                    type="text"
                    placeholder="0A0A0A0A0A"
                    v-model="searchClient.iptPassportNumber.value"
                  />
                  <span class="icon is-small is-right" v-show="searchClient.iptPassportNumber.hasError">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                </p>
                <p class="control">
                  <a class="button is-small is-info">
                    Pesquisar
                  </a>
                </p>
              </div>
              <p class="help" :class="{ 'is-danger': searchClient.iptName.error }">
                {{ searchClient.iptName.error }}
              </p>
              <p class="help" :class="{ 'is-danger': searchClient.iptCPF.error }">
                {{ searchClient.iptCPF.error }}
              </p>
              <p class="help" :class="{ 'is-danger': searchClient.iptPassportNumber.error }">
                {{ searchClient.iptPassportNumber.error }}
              </p>
            </div>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th class="is-hidden-touch">Selecione</th>
                <th>Nome</th>
                <th><abbr title="CPF ou Número do Passaporte do cliente">CPF/NP</abbr></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th class="is-hidden-touch">Selecione</th>
                <th>Nome</th>
                <th><abbr title="CPF ou Número do Passaporte do cliente">CPF/NP</abbr></th>
              </tr>
            </tfoot>
            <tbody>
              <tr 
                v-for="user in users"
                :key="user._id"
                @click="userSelected = user"
                :class="{'is-selected': user._id == userSelected._id }"
              >
                <td class="is-hidden-touch">
                  <input type="hidden" :value="user._id">
                  <input type="radio" name="user" :value="user._id" v-model="userSelected._id">
                </td>
                <td>{{ user.name }}</td>
                <td>{{ user.cpf }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
    <div class="buttons is-right">
      <button class="button is-success is-large" @click="openConfirmReservaModal()">Cadastrar</button>
    </div>
    <div class="modal" :class="{'is-active': modals.confirmReserva.active}">
      <div class="modal-background" @click="closeConfirmReservaModal()"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Confirme a reserva</p>
          <button class="delete" aria-label="close" @click="closeConfirmReservaModal()"></button>
        </header>
        <section class="modal-card-body">
          <div id="info-reserva">
            <p class="is-size-5">Apartamento</p>
            <div class="columns">
              <div class="field column is-half">
                <label class="label">Andar:</label>
                <div class="control">
                  <p>{{ apartmentSelected.floor }}</p>
                </div>
              </div>
              <div class="field column">
                <label class="label">Nº:</label>
                <div class="control">
                  <p>{{ apartmentSelected.number }}</p>
                </div>
              </div>
            </div>
          </div>
          <hr>
          <div id="info-user">
            <p class="is-size-5">Cliente</p>
            <div class="columns">
              <div class="field column is-half">
                <label class="label">Nome:</label>
                <div class="control">
                  <p>{{ userSelected.name }}</p>
                </div>
              </div>
              <div class="field column">
                <label class="label">CPF/NP:</label>
                <div class="control" v-if="userSelected.cpf">
                  <p>{{ userSelected.cpf }}</p>
                </div>
                <div class="control" v-else>
                  <p>{{ userSelected.passportNumber }}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="registerReserve()">Cadastrar</button>
          <button class="button is-danger" @click="closeConfirmReservaModal()">Cancelar</button>
        </footer>
      </div>
    </div>
  </article>
</template>

<script>
  import { IMaskComponent }  from 'vue-imask'

  export default {
    data() {
      return {
        masks: {
          cpf: '000.000.000-00'
        },
        messages: {
          apartment: {
            hasError: false,
            error: ''
          },
          client: {
            hasError: false,
            error: ''
          }
        },
        modals: {
          confirmReserva: {
            active: false
          }
        },
        apartmentSelected: {
          _id: null
        },
        userSelected: {
          _id: null
        },
        apartments: [
          {
            _id: 1,
            floor: 1,
            number: 1
          },
          {
            _id: 2,
            floor: 1,
            number: 2
          },
          {
            _id: 3,
            floor: 2,
            number: 3
          },
          {
            _id: 4,
            floor: 2,
            number: 4
          },
          {
            _id: 5,
            floor: 2,
            number: 5
          },
          {
            _id: 6,
            floor: 2,
            number: 6
          },
        ],
        searchApartment: {
          iptFloor: {
            value: '',
            hasError: false,
            error: ''
          },
          iptNumber: {
            value: '',
            hasError: false,
            error: ''
          }
        },
        searchClient: {
          type: 'nome',
          iptName: {
            value: '',
            hasError: false,
            error: ''
          },
          iptCPF: {
            value: '',
            hasError: false,
            error: ''
          },
          iptPassportNumber: {
            value: '',
            hasError: false,
            error: ''
          }
        },
        users: [
          {
            _id: 1,
            name: 'Tobias de Oliveira',
            cpf: '11111111111'
          },
          {
            _id: 2,
            name: 'Dinorá de Oliveira',
            cpf: '22222222222'
          },
          {
            _id: 3,
            name: 'Josias Cruz',
            cpf: '33333333333'
          },
          {
            _id: 4,
            name: 'Doralice Cruz',
            cpf: '44444444444'
          }
        ]
      }
    },
    components: {
      'imask-input': IMaskComponent
    },
    methods: {
      openConfirmReservaModal() {
        this.modals.confirmReserva.active = true
      },
      closeConfirmReservaModal() {
        this.modals.confirmReserva.active = false
      },
      clearFields() {
        this.searchApartment.iptFloor = ''
        this.searchApartment.iptNumber = ''
      },
      registerReserve() {
        console.log(`Apartamento ${this.apartmentSelected.number} reservado para ${this.userSelected.name}`)
      }
    }
  }
</script>

<style scoped>
  
</style>