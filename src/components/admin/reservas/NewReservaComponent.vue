<template>
  <article id="admin-nova-reserva">
    <h1>Nova reserva</h1>
    <hr>
    <div class="content columns">
      <section class="section column is-fullhd-tablet">
        <div class="tile is-child box">
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
                  />
                </div>
                <p class="help" :class="{'is-danger': searchApartment.iptFloor.hasError}">
                  {{ searchApartment.iptFloor.error }}
                </p>
              </div>
              <div class="field column is-half is-fullhd-tablet">
                <label class="label">Apartamento:</label>
                <div class="control">
                  <input type="number" class="input is-small">
                </div>
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
                <th><abbr title="Número do apartamento">Apto.</abbr></th>
                <th><abbr title="Atual status do apartamento">Status</abbr></th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th class="is-hidden-touch"><abbr title="Selecionar apartamento">Selecione</abbr></th>
                <th><abbr title="Andar do apartamento">Andar</abbr></th>
                <th><abbr title="Número do apartamento">Apto.</abbr></th>
                <th><abbr title="Atual status do apartamento">Status</abbr></th>
              </tr>
            </tfoot>
            <tbody>
              <tr 
                v-for="item in apartamentos"
                :key="item.id"
                @click="apto.selected = item.id"
                :class="{'is-selected': item.id == apto.selected }"
              >
                <td class="is-hidden-touch">
                  <input type="hidden" :value="item.id">
                  <input type="radio" :value="item.id" v-model="apto.selected">
                </td>
                <td>{{ item.andar }}</td>
                <td>{{ item.apartamento }}</td>
                <td>
                  <span class="tag" :class="item.ocupado ? 'is-danger' : 'is-success'">
                    {{ item.ocupado ? 'Ocupado' : 'Livre' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <section class="section column is-fullhd-tablet">
        <div class="tile is-child box">
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
                <th>CPF</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th class="is-hidden-touch">Selecione</th>
                <th>Nome</th>
                <th>CPF</th>
              </tr>
            </tfoot>
            <tbody>
              <tr 
                v-for="item in users"
                :key="item.id"
                @click="user.selected = item.id"
                :class="{'is-selected': item.id == user.selected }"
              >
                <td class="is-hidden-touch">
                  <input type="hidden" :value="item.id">
                  <input type="radio" name="user" :value="item.id" v-model="user.selected">
                </td>
                <td>{{ item.nome }}</td>
                <td>{{ item.cpf }}</td>
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
                  <p>4</p>
                </div>
              </div>
              <div class="field column">
                <label class="label">Nº:</label>
                <div class="control">
                  <p>17</p>
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
                  <p>Tobias de Oliveira</p>
                </div>
              </div>
              <div class="field column">
                <label class="label">CPF:</label>
                <div class="control">
                  <p>111.111.111-11</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Cadastrar</button>
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
        modals: {
          confirmReserva: {
            active: false
          }
        },
        apartamentos: [
          {
            id: 1,
            andar: 1,
            apartamento: 1,
            ocupado: 1
          },
          {
            id: 2,
            andar: 1,
            apartamento: 2,
            ocupado: 0
          },
          {
            id: 3,
            andar: 2,
            apartamento: 3,
            ocupado: 1
          },
          {
            id: 4,
            andar: 2,
            apartamento: 4,
            ocupado: 0
          },
          {
            id: 5,
            andar: 2,
            apartamento: 5,
            ocupado: 1
          },
          {
            id: 6,
            andar: 2,
            apartamento: 6,
            ocupado: 1
          },
        ],
        searchApartment: {
          iptFloor: {
            value: '',
            hasError: false,
            error: ''
          },
        },
        apto: {
          selected: null
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
          { id: 1, nome: 'Tobias de Oliveira', cpf: '11111111111', telefone: '55119111111111', reservas_ativas: '2' },
          { id: 2, nome: 'Dinorá de Oliveira', cpf: '22222222222', telefone: '55119222222222', reservas_ativas: '3' },
          { id: 3, nome: 'Josias Cruz', cpf: '33333333333', telefone: '55119333333333', reservas_ativas: '1' },
          { id: 4, nome: 'Doralice Cruz', cpf: '44444444444', telefone: '55119444444444', reservas_ativas: '1' }
        ],
        user: {
          selected: null
        }
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
      }
    }
  }
</script>

<style scoped>
  
</style>