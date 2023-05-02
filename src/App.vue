<template>
  <div id="app">
    <HeaderComponent />
    <main>
      <router-view />
    </main>
    <NewsletterComponent />
    <FooterComponent />
  </div>
</template>

<script>
  // Components
  import HeaderComponent from './components/header/HeaderComponent'
  import NewsletterComponent from './components/newsletter/NewsletterComponent'
  import FooterComponent from './components/footer/FooterComponent'

  export default {
    components: {
      HeaderComponent,
      NewsletterComponent,
      FooterComponent
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    font-size: 100%;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
  }

  nav, ul {
    list-style: none;
  }

  a {
    text-decoration: none;
    cursor: pointer;
    opacity: 0.9;
  }

  a:hover {
    opacity: 1;
  }
</style>
