<template>
  <article id="contato" class="content-article">
    <h1>Contato</h1>
    <hr>
    <section id="location-infos" class="is-flex is-justify-content-space-around is-align-items-center">
      <div id="location">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15466.017526583704!2d-39.00457532196318!3d-14.282101490093888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x73935fa91bad8f3%3A0x3412ed88f1cfe936!2zSXRhY2Fyw6ksIEJB!5e0!3m2!1spt-BR!2sbr!4v1683254085484!5m2!1spt-BR!2sbr" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div id="infos">
        <ul id="contacts">
          <li class="contact">
            <i class="fab fa-whatsapp-square"></i> +55 (73) 00000-0000
          </li>
          <li class="contact">
            <i class="fas fa-at"></i> email_hotel@hotmail.com
          </li>
          <li class="contact">
            <i class="fas fa-map-marked-alt"></i> Itacaré / BH
          </li>
        </ul>
      </div>
    </section>
  </article>
</template>

<script>
  export default {

  }
</script>

<style scoped>
  #infos #contacts .contact {
    color: #c3c63b;
    font-size: 2rem;
  }
</style>