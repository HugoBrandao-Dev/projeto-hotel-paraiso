<template>
  <section id="newsletter">
    <h3>Newsletter</h3>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam suscipit reprehenderit, adipisci explicabo ab porro sequi mollitia voluptas id at modi veniam amet officia delectus?</p>
    <hr>
    <form>
      <input type="email" placeholder="Informe seu email">
      <button type="button">Cadastrar</button>
    </form>
  </section>
</template>
<script>
  export default {
    
  }
</script>
<style scoped>
  #newsletter {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 50px;
  }

  #newsletter h3 {
    font-size: 2rem;
    margin-bottom: 35px;
    text-align: center;
    color: #c3c63b;
  }

  #newsletter p {
    max-width: 800px;
    text-align: center;
    color: #c3c63b;
  }

  #newsletter hr {
    width: 200px;
    height: 2px;
    background-color: #c3c63b;
    border: none;
    margin: 35px 0;
  }

  #newsletter form {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    width: 80%;
    max-width: 800px;
  }

  #newsletter form input {
    padding: 15px;
    border: solid 1px #c3c63b;
    border-radius: 4px;
    margin-right: 15px;
    flex: 1;
  }

  #newsletter form button {
    padding: 15px;
    background-color: #c3c63b;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  @media screen and (max-width: 700px) {
    #cabecalho {
      flex-direction: column;
    }
    #cabecalho img {
      margin-bottom: 15px;
    }
    #hero h1 {
      font-size: 2.5rem;
    }
    #hero h3 {
      font-size: 1.5rem;
    }
    #conheca-o-hotel .grid li.small, #conheca-o-hotel .grid li.large {
      flex-basis: 100%;
    }
    #newsletter form input {
      flex-basis: 100%;
      margin-bottom: 15px;
    }
  }
</style>