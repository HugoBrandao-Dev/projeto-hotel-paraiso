<template>
  <article id="new-apartment">
    <h1>Novo apartamento</h1>
    <hr>
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
                              :class="{'is-danger': form.iptPrice.hasError}" v-model="form.iptPrice.value"
                            />
                          </p>
                        </div>
                        <p 
                          class="help" 
                          :class="{'is-danger': form.iptPrice.hasError}" 
                        >
                          {{ form.iptPrice.error }}
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
                    :class="{'is-danger': form.iptStatus.hasError}"
                  >
                    <select v-model="form.iptStatus.value">
                      <option 
                        v-for="item in statusList" 
                        :key="item.id" 
                        :selected="form.iptStatus.value"
                        :value="item.id"
                      >
                        {{ item.type }}
                      </option>
                    </select>
                  </div>
                </div>
                  <p 
                    class="help" 
                    :class="{'is-danger': form.iptStatus.hasError}"
                  >
                    {{ form.iptStatus.error }}
                  </p>
              </div>
              <div class="field column is-one-third">
                <label class="label">Andar:</label>
                <div class="control">
                  <input 
                    type="number" 
                    class="input"
                    :class="{'is-danger': form.iptFloor.hasError}"
                    v-model="form.iptFloor.value"
                  />
                </div>
                <p 
                  class="help" 
                  :class="{'is-danger': form.iptFloor.hasError}"
                >
                  {{ form.iptFloor.error }}
                </p>
              </div>
              <div class="field column is-one-third">
                <label class="label">Apartamento:</label>
                <div class="control">
                  <input 
                    type="number"
                    class="input"
                    :class="{'is-danger': form.iptNumber.hasError}"
                    v-model="form.iptNumber.value"
                  />
                </div>
                <p 
                  class="help" 
                  :class="{'is-danger': form.iptNumber.hasError}"
                >
                  {{ form.iptNumber.error }}
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
                  <tr v-for="room in rooms" :key="room.name">
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
                    :class="{'is-danger': form.iptRoomNumber.hasError}"
                    type="number"
                    v-model="form.iptRoomNumber.value"
                  />
                </div>
                <p 
                  class="help" 
                  :class="{'is-danger': form.iptRoomNumber.hasError}" 
                >
                  {{ form.iptRoomNumber.error }}
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
                    <div class="select" :class="{'is-danger': form.iptRoom.hasError}">
                      <select :disabled="isComodoCustom" v-model="form.iptRoom.value">
                        <option 
                          v-for="item in roomsList"
                          :key="item.id"
                          :value="item.id"
                          :selected="form.iptRoom.value"
                        >
                          {{ item.room }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <p 
                    class="help" 
                    :class="{'is-danger': form.iptRoom.hasError}" 
                  >
                    {{ form.iptRoom.error }}
                  </p>
                </div>
              </div>
            </div>
            <div class="field is-horizontal">
              <div class="field-body">
                <div class="field">
                  <div class="control">
                    <label class="checkbox">
                      <input type="checkbox" v-model="isComodoCustom" :checked="form.iptNewRoom.hasError"> Não está listado
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
                    :class="{'is-danger': form.iptNewRoom.hasError}"
                    type="text"
                    v-model="form.iptNewRoom.value"
                  />
                  <span class="icon is-small is-right" v-show="form.iptNewRoom.hasError">
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
                <p 
                  class="help" 
                  :class="{'is-danger': form.iptNewRoom.hasError}" 
                >
                  {{ form.iptNewRoom.error }}
                </p>
              </div>
            </div>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success">Add</button>
          <button class="button is-danger" @click="closeRoomModal()">Cancelar</button>
        </footer>
      </div>
    </div>
  </article>
</template>

<script>
  import validator from 'validator'

  export default {
    data() {
      return {
        isComodoCustom: false,
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
        form: {
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
          },
        ]
      }
    },
    computed: {
      isModalsRoomsActive() {
        if (this.modals.rooms.active || this.form.iptRoomNumber.hasError || this.form.iptRoom.hasError || this.form.iptNewRoom.hasError) {
          return 'is-active'
        }
        return ''
      },
      isComodoCustomActive() {
        return this.form.iptNewRoom.hasError || this.isComodoCustom
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
      clearErroFields() {
        let fields = Object.keys(this.form)

        fields.forEach(field => {
          if (field.indexOf('ipt') >= 0) {
            this.form[field].hasError = false
            this.form[field].error = ''
          }
        })
      },
      setError(field, msg) {
        this.form.hasErrors = true
        this.form[field].hasError = true
        this.form[field].error = msg
      },
      isValidPrice() {
        return validator.isCurrency(this.form.iptPrice.value, {
          allow_negatives: false,
          digits_after_decimal: [2]
        })
      },
      saveApartment() {
        this.clearErroFields()

        if (!this.isValidPrice()) {
          this.setError('iptPrice', 'Preço da diária inválido.')
        }
      }
    }
  }
</script>

<style scoped>
  
</style>