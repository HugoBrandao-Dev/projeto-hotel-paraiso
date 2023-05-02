<template>
  <div id="app">
    <HeaderComponent />
    <NewsletterComponent />
    <main>
      <router-view />
    </main>
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

<style scoped></style>
