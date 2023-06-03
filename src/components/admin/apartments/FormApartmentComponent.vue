<template>
  <div>
    <div class="columns">
      <div class="column is-three-fifths mx-auto">
        <div class="card">
          <div class="card-image">
            <figure class="image is-16by9">
              <img src="../../../assets/reservas/reserva.png" alt="Placeholder image">
            </figure>
          </div>
          <div class="card-content">
            <div class="tile is-ancestor is-centered">
              <div class="tile is-parent">
                <div class="tile is-child box has-background-primary is-flex is-justify-content-center is-align-items-center">
                  <div>
                    <label class="label is-size-5 has-text-white">
                      Diária:
                    </label>
                    <div class="field-body">
                      <div class="field is-expanded">
                        <div class="field has-addons">
                          <p class="control">
                            <a class="button is-static">R$</a>
                          </p>
                          <p class="control is-expanded">
                            <input 
                              type="number" class="input" 
                              :class="{'is-danger': forms.newApartment.iptPrice.hasError}" v-model="forms.newApartment.iptPrice.value"
                            />
                          </p>
                        </div>
                        <p 
                          class="help" 
                          :class="{'is-danger': forms.newApartment.iptPrice.hasError}" 
                        >
                          {{ forms.newApartment.iptPrice.error }}
                        </p>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            <div class="tile is-parent">
              <div class="tile is-child is-flex is-justify-content-center is-align-items-center">
                <div class="file is-link has-name is-boxed">
                  <label class="file-label">
                    <input class="file-input" type="file" name="resume" multiple>
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-cloud-upload-alt"></i>
                      </span>
                      <span class="file-label">
                        Fotos
                      </span>
                    </span>
                    <span class="file-name">
                      Screen Shot 2017-07-29 at 15.54.25.png
                    </span>
                  </label>
                </div>
              </div>
            </div>
            </div>
            <div class="columns">
              <div class="field column is-one-third">
                <label class="label">Status:</label>
                <div class="control">
                  <div 
                    class="select" 
                    :class="{'is-danger': forms.newApartment.iptStatus.hasError}"
                  >
                    <select v-model="forms.newApartment.iptStatus.value">
                      <option 
                        v-for="item in statusList" 
                        :key="item.id" 
                        :selected="forms.newApartment.iptStatus.value"
                        :value="item.id"
                      >
                        {{ item.type }}
                      </option>
                    </select>
                  </div>
                </div>
                  <p 
                    class="help" 
                    :class="{'is-danger': forms.newApartment.iptStatus.hasError}"
                  >
                    {{ forms.newApartment.iptStatus.error }}
                  </p>
              </div>
              <div class="field column is-one-third">
                <label class="label">Andar:</label>
                <div class="control">
                  <input 
                    type="number" 
                    class="input"
                    :class="{'is-danger': forms.newApartment.iptFloor.hasError}"
                    v-model="forms.newApartment.iptFloor.value"
                  />
                </div>
                <p 
                  class="help" 
                  :class="{'is-danger': forms.newApartment.iptFloor.hasError}"
                >
                  {{ forms.newApartment.iptFloor.error }}
                </p>
              </div>
              <div class="field column is-one-third">
                <label class="label">Apartamento:</label>
                <div class="control">
                  <input 
                    type="number"
                    class="input"
                    :class="{'is-danger': forms.newApartment.iptNumber.hasError}"
                    v-model="forms.newApartment.iptNumber.value"
                  />
                </div>
                <p 
                  class="help" 
                  :class="{'is-danger': forms.newApartment.iptNumber.hasError}"
                >
                  {{ forms.newApartment.iptNumber.error }}
                </p>
              </div>
            </div>
            <div>
              <div class="field">
                <label class="label">Cômodos:</label>
              </div>
              <article class="message is-danger" v-show="messages.roomsRegistred.hasError">
                <div class="message-header">
                  <p>Erro</p>
                  <button 
                    class="delete" 
                    aria-label="delete" 
                    @click="messages.roomsRegistred.hasError = false"></button>
                </div>
                <div class="message-body">
                  {{ messages.roomsRegistred.error }}
                </div>
              </article>
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
                    <td class="has-text-right" colspan="3">
                      <button class="button is-primary is-small" @click="openRoomModal()">
                        <span class="icon is-small">
                          <i class="fas fa-plus"></i>
                        </span>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td class="has-text-centered" colspan="3">
                      <strong>Total de cômodos: <span class="has-text-success is-size-5">6</span></strong>
                    </td>
                  </tr>
                </tfoot>
                <tbody>
                  <tr v-for="room in forms.newApartment.rooms" :key="room.name">
                    <td>{{ room.amount }}</td>
                    <td>{{ room.name }}</td>
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
                </tbody>
              </table>
            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item button is-success is-light" @click.prevent="saveApartment()">Salvar</a>
            <a href="#" class="card-footer-item button is-danger is-light">Cancelar</a>
          </footer>
        </div>
      </div>
    </div>
    <div class="modal" :class="isModalsRoomsActive">
      <div class="modal-background" @click="closeRoomModal()"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Novo cômodo</p>
          <button class="delete" aria-label="close" @click="closeRoomModal()"></button>
        </header>
        <section class="modal-card-body">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Quantidade:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input 
                    class="input"
                    :class="{'is-danger': forms.newRoom.iptRoomNumber.hasError}"
                    type="number"
                    v-model="forms.newRoom.iptRoomNumber.value"
                  />
                </div>
                <p 
                  class="help" 
                  :class="{'is-danger': forms.newRoom.iptRoomNumber.hasError}" 
                >
                  {{ forms.newRoom.iptRoomNumber.error }}
                </p>
              </div>
            </div>
          </div>
          <div class="columns is-align-items-center">
            <div class="field is-horizontal column is-half">
              <div class="field-label is-normal">
                <label class="label">Cômodo:</label>
              </div>
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <div class="select" :class="{'is-danger': forms.newRoom.iptRoom.hasError}">
                      <select :disabled="this.forms.newRoom.ckbCustomRoom" v-model="forms.newRoom.iptRoom.value">
                        <option 
                          v-for="item in roomsList"
                          :key="item.id"
                          :value="item.id"
                          :selected="forms.newRoom.iptRoom.value"
                        >
                          {{ item.room }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <p 
                    class="help" 
                    :class="{'is-danger': forms.newRoom.iptRoom.hasError}" 
                  >
                    {{ forms.newRoom.iptRoom.error }}
                  </p>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <label class="checkbox">
                      <input type="checkbox" v-model="forms.newRoom.ckbCustomRoom" :checked="forms.newRoom.iptNewRoom.hasError"> Não está listado
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="field is-horizontal" v-show="isComodoCustomActive">
            <div class="field-label is-normal">
              <label class="label">Nome:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control has-icons-right">
                  <input 
                    class="input"
                    :class="{'is-danger': forms.newRoom.iptNewRoom.hasError}"
                    type="text"
                    v-model="forms.newRoom.iptNewRoom.value"
                  />
                  <span class="icon is-small is-right" v-show="forms.newRoom.iptNewRoom.hasError">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
                <p 
                  class="help" 
                  :class="{'is-danger': forms.newRoom.iptNewRoom.hasError}" 
                >
                  {{ forms.newRoom.iptNewRoom.error }}
                </p>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="addRoom()">Add</button>
          <button class="button is-danger" @click="closeRoomModal()">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
  import validator from 'validator'

  export default {
    data() {
      return {
        statusList: [
          {
            id: '1',
            type: 'Livre'
          },
          {
            id: '2',
            type: 'Reservado'
          },
          {
            id: '3',
            type: 'Ocupado'
          },
          {
            id: '4',
            type: 'Indisponível'
          }
        ],
        roomsList: [
          {
            id: '1',
            room: 'Sala de estar'
          },
          {
            id: '2',
            room: 'Cozinha'
          },
          {
            id: '3',
            room: 'Banheiro'
          },
          {
            id: '4',
            room: 'Quarto'
          }
        ],
        messages: {
          hasErrors: false,
          roomsRegistred: {
            hasError: false,
            error: ''
          }
        },
        modals: {
          rooms: {
            active: false
          }
        },
        forms: {
          newApartment: {
            hasErrors: false,
            iptPrice: {
              value: '',
              hasError: false,
              error: ''
            },
            iptStatus: {
              value: '1',
              hasError: false,
              error: ''
            },
            iptFloor: {
              value: '',
              hasError: false,
              error: ''
            },
            iptNumber: {
              value: '',
              hasError: false,
              error: ''
            },
            rooms: [
              {
                amount: 1,
                name: 'Sala de estar'
              },
              {
                amount: 1,
                name: 'Cozinha'
              },
              {
                amount: 2,
                name: 'Quartos'
              },
              {
                amount: 2,
                name: 'Banheiros'
              }
            ]
          },
          newRoom: {
            hasErrors: false,
            ckbCustomRoom: false,
            iptRoomNumber: {
              value: '',
              hasError: false,
              error: ''
            },
            iptRoom: {
              value: '1',
              hasError: false,
              error: ''
            },
            iptNewRoom: {
              value: '',
              hasError: false,
              error: ''
            }
          }
        }
      }
    },
    computed: {
      isModalsRoomsActive() {
        if (this.modals.rooms.active || this.forms.newRoom.iptRoomNumber.hasError || this.forms.newRoom.iptRoom.hasError || this.forms.newRoom.iptNewRoom.hasError) {
          return 'is-active'
        }
        return ''
      },
      isComodoCustomActive() {
        return this.forms.newRoom.iptNewRoom.hasError || this.forms.newRoom.ckbCustomRoom
      }
    },
    methods: {
      confirmDeletion() {
        if (confirm('Deseja realmente excluir o cômodo?')) {
          alert('Excluido com sucesso.')
        }
      },
      openRoomModal() {
        this.modals.rooms.active = true
      },
      closeRoomModal() {
        this.modals.rooms.active = false
      },
      clearErrorFields() {
        let formsList = Object.keys(this.forms)

        formsList.forEach(form => {
          let fields = Object.keys(this.forms[form])
          fields.forEach(field => {
            if (field.indexOf('ipt') >= 0) {
              this.forms[form].hasErrors = false
              this.forms[form][field].hasError = false
              this.forms[form][field].error = ''
            }
          })
        })
      },
      setError(field, msg) {
        let formsList = Object.keys(this.forms)

        formsList.forEach(form => {
          let fields = Object.keys(this.forms[form])

          if (fields.indexOf(field) >= 0) {
            this.forms[form].hasErrors = true
            this.forms[form][field].hasError = true
            this.forms[form][field].error = msg
          }
        })
      },
      setErrorMessage(element, msg) {
        this.messages.hasErrors = true
        this.messages[element].hasError = true
        this.messages[element].error = msg
      },
      isValidRoomNumber() {
        return validator.isInt(this.forms.newRoom.iptRoomNumber.value, {
          gt: 0
        })
      },
      // Verifica se o cômodo do select está presente no array de cômodos.
      isValidRoom() {
        let ids = this.roomsList.map(room => room.id)
        return validator.isIn(this.forms.newRoom.iptRoom.value, ids)
      },
      isValidNewRoom() {
        let roomNames = this.roomsList.map(item => item.room)
        let isEmpty = validator.isEmpty(this.forms.newRoom.iptNewRoom.value)
        let isIn = validator.isIn(this.forms.newRoom.iptNewRoom.value, roomNames)
        let isAlphaPT_BR = validator.isAlpha(this.forms.newRoom.iptNewRoom.value, ['pt-BR'], {
          ignore: ' \''
        })
        let isAlphaEN_US = validator.isAlpha(this.forms.newRoom.iptNewRoom.value, ['en-US'], {
          ignore: ' \''
        })

        return !isEmpty && !isIn && (isAlphaPT_BR || isAlphaEN_US)
      },
      addRoom() {
        this.clearErrorFields()

        if (!this.isValidRoomNumber()) {
          this.setError('iptRoomNumber', 'Quantidade de cômodo inválida.')
        }
        if (this.forms.newRoom.ckbCustomRoom) {
          if (!this.isValidNewRoom()) {
            this.setError('iptNewRoom', 'Nome inválido ou já existente (verifique a lista).')
          }
        } else {
          if (!this.isValidRoom()) {
            this.setError('iptRoom', 'Cômodo inválido.')
          }
        }
      },
      isValidPrice() {
        return validator.isCurrency(this.forms.newApartment.iptPrice.value, {
          allow_negatives: false,
          digits_after_decimal: [2]
        })
      },
      isValidStatus() {
        let ids = this.statusList.map(status => status.id)
        return validator.isIn(this.forms.newApartment.iptStatus.value, ids)
      },
      isValidFloor() {
        return validator.isInt(this.forms.newApartment.iptFloor.value, {
          min: 0
        })
      },
      isValidNumber() {
        return validator.isInt(this.forms.newApartment.iptNumber.value, {
          gt: 0
        })
      },
      // Verifica se tem cômodo(s) cadastrado(s) no apartamento.
      isValidRooms() {
        return this.forms.newApartment.rooms.length
      },
      saveApartment() {
        this.clearErrorFields()

        if (!this.isValidPrice()) {
          this.setError('iptPrice', 'Preço da diária inválido.')
        }
        if (!this.isValidStatus()) {
          this.setError('iptStatus', 'Status inválido.')
        }
        if (!this.isValidFloor()) {
          this.setError('iptFloor', 'Número de andar inválido.')
        }
        if (!this.isValidNumber()) {
          this.setError('iptNumber', 'Número de apartamento inválido.')
        }
        if (!this.isValidRooms()) {
          this.setErrorMessage('roomsRegistred', 'Nenhum cômodo cadastrado!')
        }

        if (!this.forms.newApartment.hasErrors && !this.messages.hasErrors) {
          alert('Apartamento registrado com sucesso.')
        }
      }
    }
  }
</script>

<style scoped>
  
</style>