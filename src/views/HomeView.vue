<template>
  <div>
    <section id="hero">
      <h1>Conheça este paraíso chamado Itacaré</h1>
      <h3>"Aconchego, conforto, simpatia e alto astral"</h3>
      <a href="#" class="btn">Saiba mais</a>
    </section>
    <section id="conheca-o-hotel">
      <h3>Conheça o Hotel Paraíso</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing, elit. Totam hic quasi ea, inventore repellat in modi molestias, cum nemo deleniti eos enim qui fugit dicta?</p>
      <hr>
      <ul class="grid">
        <li class="small itacare-01">
        </li>
        <li class="large itacare-02">
        </li>
        <li class="large itacare-03">
        </li>
        <li class="small itacare-04">
        </li>
      </ul>
    </section>
    <section id="caracteristicas">
      <h3>Único hotel pé na areia de Itacaré</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, ipsum! Illum voluptates omnis quas odit delectus aut nisi a fugiat, minus deleniti tempore veniam debitis commodi enim excepturi fuga, labore!</p>
      <hr>
      <ul class="grid">
        <li>
          <i class="fas fa-map-marked-alt"></i>
          <h4>Localização</h4>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga illo ratione praesentium rerum itaque nihil enim deleniti voluptatum consequuntur repellendus.</p>
        </li>
        <li>
          <i class="fas fa-shopping-basket"></i>
          <h4>Pacote de ofertas</h4>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga illo ratione praesentium rerum itaque nihil enim deleniti voluptatum consequuntur repellendus.</p>
        </li>
        <li>
          <i class="fas fa-hotel"></i>
          <h4>Acomodações</h4>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fuga illo ratione praesentium rerum itaque nihil enim deleniti voluptatum consequuntur repellendus.</p>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
  export default {

  }
</script>
<style scoped>
  /* HERO */

  #hero {
    background-image: url(../assets/hero.jpg);
    background-size: cover;
    min-height: 100vh;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
  }

  #hero h1 {
    font-size: 3.2rem;
    margin-bottom: 15px;
  }

  #hero h3 {
    font-size: 2rem;
    margin-bottom: 15px;
  }

  #hero .btn {
    background-color: #fff;
    border-radius: 4px;
    color: #191c03;
    padding: 20px 50px;
    text-transform: uppercase;
  }

  /* CONHEÇA O HOTEL */

  #conheca-o-hotel {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 50px;
  }

  #conheca-o-hotel h3 {
    font-size: 2rem;
    margin-bottom: 35px;
    text-align: center;
    color: #191c03;
  }

  #conheca-o-hotel p {
    max-width: 800px;
    text-align: center;
    color: #191c03;
  }

  #conheca-o-hotel hr {
    width: 200px;
    height: 2px;
    background-color: #191c03;
    border: none;
    margin-top: 20px;
  }

  #conheca-o-hotel .grid {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  #conheca-o-hotel .grid .itacare-01 {
    background-image: url(../assets/itacare-01.jpg);
  }

  #conheca-o-hotel .grid .itacare-02 {
    background-image: url(../assets/itacare-02.jpg);
  }

  #conheca-o-hotel .grid .itacare-03 {
    background-image: url(../assets/itacare-03.jpg);
  }

  #conheca-o-hotel .grid .itacare-04 {
    background-image: url(../assets/itacare-04.jpg);
  }

  #conheca-o-hotel .grid li {
    height: 350px;
    padding: 20px;
    background-clip: content-box;
    background-size: cover;
    background-position: center;
    border-radius: 4px;
  }

  /* li.small são juntos */
  #conheca-o-hotel .grid li.small {
    flex-basis: 40%;
  }

  #conheca-o-hotel .grid li.large {
    flex-basis: 60%;
  }
</style>