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
  #rodape {
    display: flex;
    flex-direction: column;
    background-color: #191c03;
    padding: 50px;
    align-items: center;
  }

  #rodape ul {
    display: flex;
    margin-bottom: 25px;
  }

  #rodape ul li {
    margin-right: 10px;
  }

  #rodape ul li:last-child {
    margin-right: 0px;
  }

  #rodape ul li a {
    color: #c3c63b;
    font-size: 2rem;
  }

  #rodape p {
    color: #c3c63b;
    text-align: center;
  }
</style>