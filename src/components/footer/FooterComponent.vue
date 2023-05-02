<template>
  <footer id="rodape">
    <ul>
      <li v-for="socialMedia in socialMediaIcons" :key="socialMedia">
        <a href="#"><i :class="socialMedia | mountClassIcon"></i></a>
      </li>
    </ul>
    <p>&copy; Todos os diretos reservados - Hotel Paraíso 2021</p>
  </footer>
</template>
<script>
  export default {
    data() {
      return {
        // Ícones do Font Awesome
        socialMediaIcons: [
          'facebook',
          'instagram',
          'twitter',
          'snapchat',
          'pinterest'
        ]
      }
    },
    filters: {
      mountClassIcon(icon) {
        return `fab fa-${ icon }-square`
      }
    }
  }
</script>
<style scoped>
  
</style>