<template>
  <carousel>
    <slide class="container-apartment-image">
      <button v-if="enableDeleteButton" class="button is-small is-danger btn-delete" @click="deleteImg('aaaa')">
        <span class="icon" title="Deletar imagem">
          <i class="fas fa-trash"></i>
        </span>
      </button>
      <figure class="image is-16by9">
        <img src="../../../assets/reservas/reserva.png" alt="Placeholder image">
      </figure>
    </slide>
    <slide class="container-apartment-image">
      <button v-if="enableDeleteButton" class="button is-small is-danger btn-delete" @click="deleteImg('aaab')">
        <span class="icon" title="Deletar imagem">
          <i class="fas fa-trash"></i>
        </span>
      </button>
      <figure class="image is-16by9">
        <img src="../../../assets/reservas/reserva.png" alt="Placeholder image">
      </figure>
    </slide>
    <slide class="container-apartment-image">
      <button v-if="enableDeleteButton" class="button is-small is-danger btn-delete" @click="deleteImg('aaac')">
        <span class="icon" title="Deletar imagem">
          <i class="fas fa-trash"></i>
        </span>
      </button>
      <figure class="image is-16by9">
        <img src="../../../assets/reservas/reserva.png" alt="Placeholder image">
      </figure>
    </slide>
    <slide class="container-apartment-image">
      <button v-if="enableDeleteButton" class="button is-small is-danger btn-delete" @click="deleteImg('aaad')">
        <span class="icon" title="Deletar imagem">
          <i class="fas fa-trash"></i>
        </span>
      </button>
      <figure class="image is-16by9">
        <img src="../../../assets/reservas/reserva.png" alt="Placeholder image">
      </figure>
    </slide>
  </carousel>
</template>

<script>
  import { Carousel, Slide } from 'vue-carousel'

  export default {
    props: {
      type: String,
      pictures: Array
    },
    components: {
      Carousel,
      Slide
    },
    computed: {
      enableDeleteButton() {
        return this.type == 'update' || this.type == 'create'
      }
    },
    methods: {
      deleteImg(imgID) {
        if(confirm('Deseja realmente deletar a imagem?')) {
          this.$emit('deleteImg', imgID)
        }
      }
    }
  }
</script>

<style scoped>
  .container-apartment-image {
    position: relative;
  }

  .container-apartment-image .btn-delete {
    position: absolute;
    z-index: 1;
    right: 5px;
    top: 5px;
  }
</style>