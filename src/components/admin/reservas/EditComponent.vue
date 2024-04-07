<template>
  <article id="reserva-edit">
    <h1>Edição de uma reserva</h1>
    <hr>
    <div :class="{'has-background-danger': forms.reserve.iptClient.hasError}">
      <h2 class="title is-2">Clientes</h2>
      <div class="content">
        <div class="columns">
          <SearchFilterComponent @userFound="userFound($event)" />
        </div>
      </div>
      <div class="container is-max-desktop">
        <table class="table is-striped is-fullwidth">
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
              @click="forms.reserve.iptClient.value = user"
              :class="{'is-selected': user._id == forms.reserve.iptClient.value._id }"
            >
              <td class="is-hidden-touch">
                <input type="hidden" :value="user._id">
                <input type="radio" name="user" :value="user._id" v-model="forms.reserve.iptClient.value._id">
              </td>
              <td class="is-capitalized">{{ user.name }}</td>
              <td v-if="user.cpf">{{ user.cpf }}</td>
              <td v-else>{{ user.passportNumber }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="container mt-4">
      <h2 class="title is-2">Informações</h2>
      <div class="columns">
        <div class="field column is-one-third">
          <label class="label">Início da estadia:</label>
          <div class="control">
            <input 
              id="iptStartDate"
              type="date" 
              class="input"
              :class="{
                'is-normal': !forms.reserve.iptStartDate.hasError,
                'is-danger': forms.reserve.iptStartDate.hasError
              }"
              v-model="forms.reserve.iptStartDate.value">
          </div>
          <p class="help" :class="{ 'is-danger': forms.reserve.iptStartDate.hasError }">
            {{ forms.reserve.iptStartDate.error }}
          </p>
        </div>
        <div class="field column is-one-third">
          <label class="label">Fim da estadia:</label>
          <div class="control">
            <input 
              id="iptEndDate"
              type="date" 
              class="input"
              :class="{
                'is-normal': !forms.reserve.iptEndDate.hasError,
                'is-danger': forms.reserve.iptEndDate.hasError
              }"
              v-model="forms.reserve.iptEndDate.value">
          </div>
          <p class="help" :class="{ 'is-danger': forms.reserve.iptEndDate.hasError }">
            {{ forms.reserve.iptEndDate.error }}
          </p>
        </div>
        <div class="field column is-one-third">
          <label class="label">Status:</label>
          <div class="control">
            <div 
              class="select" 
              :class="{'is-danger': forms.reserve.iptStatus.hasError}"
            >
              <select v-model="forms.reserve.iptStatus.value">
                <option 
                  v-for="item in statusList" 
                  :key="item" 
                  :selected="forms.reserve.iptStatus.value"
                >
                  {{ item }}
                </option>
              </select>
            </div>
          </div>
            <p 
              class="help" 
              :class="{'is-danger': forms.reserve.iptStatus.hasError}"
            >
              {{ forms.reserve.iptStatus.error }}
            </p>
        </div>
      </div>
    </div>
    <div class="buttons is-right">
      <button class="button is-link is-large" @click="updateReserve()">Atualizar</button>
    </div>
  </article>
</template>

<script>
  import SearchFilterComponent from '../users/SearchFilterComponent'

  export default {
    components: {
      SearchFilterComponent
    },
    data() {
      return {
        statusList: ['reservado', 'ocupado'],
        users: [
          {
            _id: '1',
            name: 'Tobias de Oliveira',
            cpf: '11111111111',
            phoneCode: '254',
            phoneNumber: '55119111111111'
          },
          {
            _id: '2',
            name: 'Dinorá de Oliveira',
            cpf: '22222222222',
            phoneCode: '254',
            phoneNumber: '55119222222222'
          },
          {
            _id: '3',
            name: 'Josias Cruz',
            passportNumber: 'A4S5D67F0',
            phoneCode: '55',
            phoneNumber: '55119333333333'
          },
          {
            _id: '4',
            name: 'Doralice Cruz',
            passportNumber: 'O65I4U3Y1',
            phoneCode: '55',
            phoneNumber: '55119444444444'
          }
        ],
        forms: {
          reserve: {
            hasErrors: false,
            iptClient: {
              value: { _id: '' },
              hasError: false,
              error: ''
            },
            iptStartDate: {
              value: '',
              hasError: false,
              error: ''
            },
            iptEndDate: {
              value: '',
              hasError: false,
              error: ''
            },
            iptStatus: {
              value: 'reservado',
              hasError: false,
              error: ''
            }
          },
          searchClient: {
            type: 'name',
            hasErrors: false,
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
          }
        }
      }
    },
    methods: {
      addUser() {
        if (confirm('Colocar o usuário como ocupante?')) {
          alert('Colocado com sucesso.')
        }
      },
      removeUser() {
        if (confirm('Remover ocupante?')) {
          alert('Removido com sucesso.')
        }
      }
    }
  }
</script>

<style scoped>
  
</style>