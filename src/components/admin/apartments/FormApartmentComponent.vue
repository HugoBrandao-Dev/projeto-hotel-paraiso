<template>
  <div>
    <div class="columns">
      <div class="column is-three-fifths mx-auto">
        <div class="card">
          <CarouselComponent :type="'create'" />
          <div class="card-content">
            <article class="message is-danger" v-show="messages.errorForm.hasError">
              <div class="message-header">
                <p>{{ messages.errorForm.structure.title }}</p>
                <button class="delete" aria-label="delete" @click="messages.errorForm.close()"></button>
              </div>
              <div class="message-body">
                <p>{{ messages.errorForm.structure.body }}</p>
              </div>
            </article>
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
                              :class="{'is-danger': forms.newApartment.iptDailyPrice.hasError}" v-model="forms.newApartment.iptDailyPrice.value"
                            />
                          </p>
                        </div>
                        <p 
                          class="help" 
                          :class="{'is-danger': forms.newApartment.iptDailyPrice.hasError}" 
                        >
                          {{ forms.newApartment.iptDailyPrice.error }}
                        </p>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
            <div class="tile is-parent">
              <div class="tile is-child is-flex is-justify-content-center is-align-items-center">
                <div class="file has-name is-boxed" :class="{
                  'is-link': !this.messages.errorForm.hasError,
                  'is-danger': this.messages.errorForm.hasError
                }">
                  <label class="file-label">
                    <input class="file-input" @change="picturesChanged" ref="iptImages" type="file" name="resume" multiple>
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-cloud-upload-alt"></i>
                      </span>
                      <span class="file-label">
                        Fotos
                      </span>
                    </span>
                    <span class="file-name">
                      {{ forms.newApartment.iptImages.value }}
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
                        :key="item" 
                        :selected="forms.newApartment.iptStatus.value"
                      >
                        {{ item }}
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
            <label class="checkbox mb-3">
              <input type="checkbox" v-model="forms.newApartment.ckbAccepts_animals" />
              Aceita animais.
            </label>
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
                      <strong>
                        Total de cômodos: 
                        <span class="has-text-success is-size-5">{{ calcTotalRooms }}</span>
                      </strong>
                    </td>
                  </tr>
                </tfoot>
                <tbody>
                  <tr v-for="room in forms.newApartment.rooms" :key="room.room">
                    <td>{{ room.quantity }}</td>
                    <td>{{ room.room }}</td>
                    <td>
                      <form @submit.prevent="confirmRoomDeletion(room.room)">
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
            <a href="#" v-if="type == 'register'" class="card-footer-item button is-success is-light" @click.prevent="saveApartment()">Salvar</a>
            <a href="#" v-else class="card-footer-item button is-link is-light" @click.prevent="updateApartment()">Atualizar</a>
            <a href="#" class="card-footer-item button is-danger is-light">Cancelar</a>
          </footer>
        </div>
      </div>
    </div>
    <div class="modal" :class="{'is-active': modals.rooms.active}">
      <div class="modal-background" @click="closeRoomModal()"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Novo cômodo</p>
          <button class="delete" aria-label="close" @click="closeRoomModal()"></button>
        </header>
        <section class="modal-card-body">
          <article class="message is-success" v-show="messages.roomInserted.show">
            <div class="message-body">
              Cômodo inserido com sucesso!
            </div>
          </article>
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
                          :key="item"
                          :selected="forms.newRoom.iptRoom.value"
                        >
                          {{ item }}
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
  import FormData from 'form-data'
  import axios from 'axios'
  import validator from 'validator'
  import Endpoints from '@/tools/EndpointsConfig'
  import CarouselComponent from './CarouselComponent'

  export default {
    components: {
      CarouselComponent
    },
    created() {
      if (this.type == 'update') {
        axios.get(Endpoints.GET_APARTMENT(this.$route.params.id), this.axiosConfig)
          .then(res => {
            this.forms.newApartment.iptDailyPrice.value = res.data.daily_price
            this.forms.newApartment.iptFloor.value = res.data.floor
            this.forms.newApartment.iptNumber.value = res.data.number
            this.forms.newApartment.iptStatus.value = res.data.reserve.status
            this.forms.newApartment.rooms = res.data.rooms
            this.forms.newApartment.ckbAccepts_animals = res.data.accepts_animals == 1
          })
          .catch(error => {
            console.error(error)
          })
      }
    },
    data() {
      return {
        axiosConfig: {
          headers: {
            Authorization: `Bearer ${ localStorage.getItem('token_hotel_paraiso') }`
          }
        },
        statusList: ['livre', 'reservado', 'ocupado', 'indisponível'],
        roomsList: ['sala de estar', 'cozinha', 'banheiro', 'quarto'],
        messages: {
          hasErrors: false,
          roomsRegistred: {
            hasError: false,
            error: ''
          },
          roomInserted: {
            show: false
          },
          // Mensagem que será mostrada se for encontrado algum erro nas imagens.
          errorForm: {
            hasError: false,
            structure: {
              title: '',
              body: ''
            },
            close: function() {
              this.structure.title = ''
              this.structure.body = ''
              this.hasError = false
            },
            open: function(title, body) {
              this.structure.title = title
              this.structure.body = body
              this.hasError = true
            }
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
            iptDailyPrice: {
              value: '',
              hasError: false,
              error: ''
            },
            iptStatus: {
              value: 'livre',
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
            iptImages: {
              value: '',
              hasError: false,
              error: ''
            },
            rooms: [],
            ckbAccepts_animals: false
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
              value: 'sala de estar',
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
    props: {
      type: String
    },
    computed: {
      isModalsRoomsActive() {
        if (this.modals.rooms.active && this.forms.newRoom.hasErrors) {
          return 'is-active'
        }
        return ''
      },
      isComodoCustomActive() {
        return this.forms.newRoom.iptNewRoom.hasError || this.forms.newRoom.ckbCustomRoom
      },
      calcTotalRooms() {
        if (this.forms.newApartment.rooms.length) {
          let quantities = this.forms.newApartment.rooms.map(room => room.quantity)
          return quantities.reduce((now, next) => now + next)
        }
        return 0
      }
    },
    methods: {
      picturesChanged(event) {
        let files = []
        for (let i = 0; i < event.target.files.length; i++) {
          files.push(event.target.files.item(i).name)
        }
        this.forms.newApartment.iptImages.value = files.join(' ')
      },
      confirmRoomDeletion(room) {
        let indexId = this.forms.newApartment.rooms.findIndex(el => el.room == room)
        if (confirm('Deseja realmente excluir o cômodo?')) {
          this.forms.newApartment.rooms.splice(indexId, 1)
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
      isValidRoom() {
        // Verifica se o cômodo do select está presente no array de cômodos disponíveis.
        let isSelectable = validator.isIn(this.forms.newRoom.iptRoom.value, this.roomsList)

        const roomsRegistred = this.forms.newApartment.rooms.map(el => el.room)
        // Verifica se o cômodo já está registrado.
        let isAlreadyRegistred = validator.isIn(this.forms.newRoom.iptRoom.value, roomsRegistred)

        return isSelectable && !isAlreadyRegistred
      },
      isValidNewRoom() {
        let roomsRegistred = this.forms.newApartment.rooms.map(el => el.room)

        let isEmpty = validator.isEmpty(this.forms.newRoom.iptNewRoom.value)
        let isAlreadyRegistred = validator.isIn(this.forms.newRoom.iptNewRoom.value, roomsRegistred)
        let isIn = validator.isIn(this.forms.newRoom.iptNewRoom.value, this.roomsList)
        let isAlphaPT_BR = validator.isAlpha(this.forms.newRoom.iptNewRoom.value, ['pt-BR'], {
          ignore: ' \''
        })
        let isAlphaEN_US = validator.isAlpha(this.forms.newRoom.iptNewRoom.value, ['en-US'], {
          ignore: ' \''
        })

        return !isEmpty && !isAlreadyRegistred && !isIn && (isAlphaPT_BR || isAlphaEN_US)
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
            this.setError('iptRoom', 'Cômodo inválido ou já registrado.')
          }
        }

        if (!this.forms.newRoom.hasErrors) {
          if (!this.forms.newRoom.ckbCustomRoom) {
            this.messages.roomInserted.show = true
            this.forms.newApartment.rooms.push({
              quantity: parseInt(this.forms.newRoom.iptRoomNumber.value),
              room: this.forms.newRoom.iptRoom.value
            })
          } else if (!this.forms.newRoom.iptNewRoom.hasError) {
            this.messages.roomInserted.show = true
            this.forms.newApartment.rooms.push({
              quantity: parseInt(this.forms.newRoom.iptRoomNumber.value),
              room: this.forms.newRoom.iptNewRoom.value
            })
          }
        } else {
          this.messages.roomInserted.show = false
        }
      },
      isValidPrice() {
        if (this.type == 'register') {
          return validator.isCurrency(this.forms.newApartment.iptDailyPrice.value, {
            allow_negatives: false,
            digits_after_decimal: [2]
          })
        }
        return true
      },
      isValidStatus() {
        if (this.type == 'register') {
          return validator.isIn(this.forms.newApartment.iptStatus.value, this.statusList)
        }
        return true
      },
      isValidFloor() {
        if (this.type == 'register') {
          return validator.isInt(this.forms.newApartment.iptFloor.value, {
            min: 0
          })
        }
        return true
      },
      isValidNumber() {
        if (this.type == 'register') {
          return validator.isInt(this.forms.newApartment.iptNumber.value, {
            gt: 0
          })          
        }
        return true
      },
      clearFields() {
        this.forms.newApartment.iptDailyPrice.value = ''
        this.forms.newApartment.iptStatus.value = 'livre'
        this.forms.newApartment.iptFloor.value = ''
        this.forms.newApartment.iptNumber.value = ''
        this.forms.newApartment.rooms = []
        this.forms.newApartment.ckbAccepts_animals = false
      },
      // Verifica se tem cômodo(s) cadastrado(s) no apartamento.
      isValidRooms() {
        return this.forms.newApartment.rooms.length
      },
      saveApartment() {
        this.clearErrorFields()
        let newApartment = {}

        if (!this.isValidPrice())
          this.setError('iptDailyPrice', 'Preço da diária inválido.')
        else
          newApartment.daily_price = this.forms.newApartment.iptDailyPrice.value

        if (!this.isValidStatus())
          this.setError('iptStatus', 'Status inválido.')
        else
          newApartment.status = this.forms.newApartment.iptStatus.value

        if (!this.isValidFloor())
          this.setError('iptFloor', 'Número de andar inválido.')
        else
          newApartment.floor = this.forms.newApartment.iptFloor.value

        if (!this.isValidNumber())
          this.setError('iptNumber', 'Número de apartamento inválido.')
        else
          newApartment.number = this.forms.newApartment.iptNumber.value

        newApartment.accepts_animals = this.forms.newApartment.ckbAccepts_animals ? 1 : 0

        if (!this.isValidRooms()) {
          this.setErrorMessage('roomsRegistred', 'Nenhum cômodo cadastrado!')
        } else {
          newApartment.rooms = this.forms.newApartment.rooms
        }

        if (!this.forms.newApartment.hasErrors && !this.messages.hasErrors) {

          let form = new FormData()

          if (this.$refs.iptImages.files.length) {
            form.append('apartment', JSON.stringify(newApartment))
            for (let i = 0; i < this.$refs.iptImages.files.length; i++) {
              let file = this.$refs.iptImages.files[i]
              form.append(`iptImages`, file)
            }
            let axiosConfigForImgs = {
              headers: {
                'Authorization': `Bearer ${ localStorage.getItem('token_hotel_paraiso') }`,
                'Content-Type': 'multipart/form-data'
              }
            }

            axios.post(Endpoints.POST_APARTMENTS(), form, axiosConfigForImgs)
              .then(() => {
                alert('Apartamento cadastrado com sucesso.')
                this.clearFields()
              })
              .catch(error => {
                if (error.response.data) {
                  error.response.data.RestException.ErrorFields.map(el => {
                    if (el.field == 'iptImages') {
                      this.messages.errorForm.open('Imagens', el.hasError.error)
                    } else {
                      this.forms.newApartment[el.field].hasError = true
                      this.forms.newApartment[el.field].error = el.hasError.error
                    }
                  })
                }
              })
            
          } else {
            axios.post(Endpoints.POST_APARTMENTS(), newApartment, this.axiosConfig)
              .then(() => {
                alert('Apartamento cadastrado com sucesso.')
                this.clearFields()
              })
              .catch(error => {
                if (error.response.data) {
                  error.response.data.RestException.ErrorFields.map(el => {
                    this.forms.newApartment[el.field].hasError = true
                    this.forms.newApartment[el.field].error = el.hasError.error
                  })
                }
              })
          }

        }
      },
      updateApartment() {
        this.clearErrorFields()
        let newApartment = {}

        if (!this.isValidPrice())
          this.setError('iptDailyPrice', 'Preço da diária inválido.')
        else
          newApartment.daily_price = this.forms.newApartment.iptDailyPrice.value

        if (!this.isValidStatus())
          this.setError('iptStatus', 'Status inválido.')
        else
          newApartment.status = this.forms.newApartment.iptStatus.value

        if (!this.isValidFloor())
          this.setError('iptFloor', 'Número de andar inválido.')
        else
          newApartment.floor = this.forms.newApartment.iptFloor.value

        if (!this.isValidNumber())
          this.setError('iptNumber', 'Número de apartamento inválido.')
        else
          newApartment.number = this.forms.newApartment.iptNumber.value

        newApartment.accepts_animals = this.forms.newApartment.ckbAccepts_animals ? 1 : 0

        if (!this.isValidRooms()) {
          this.setErrorMessage('roomsRegistred', 'Nenhum cômodo cadastrado!')
        } else {
          newApartment.rooms = this.forms.newApartment.rooms
        }

        if (!this.forms.newApartment.hasErrors && !this.messages.hasErrors) {

          axios.put(Endpoints.PUT_APARTMENT(this.$route.params.id), newApartment, this.axiosConfig)
            .then(() => {
              alert('Apartamento atualizado com sucesso.')
              this.clearFields()
              this.$router.push('/admin/apartments')
            })
            .catch(error => {
              if (error.response.data) {
                error.response.data.RestException.ErrorFields.map(el => {
                  this.forms.newApartment[el.field].hasError = true
                  this.forms.newApartment[el.field].error = el.hasError.error
                })
              }
            })

        } else {
          for (let k of Object.keys(this.forms.newApartment)) {
            if (this.forms.newApartment[k].hasError) {
              console.log(this.forms.newApartment[k].error)
            }
          }
        }
      }
    }
  }
</script>

<style scoped>
  
</style>