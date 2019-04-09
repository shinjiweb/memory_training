<template>
  <div id="app" class="app">
    <Header />
    <div class="app_container">
      <Cards />
      <Modal />
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Cards from './components/Cards.vue'
import Modal from './components/Modal.vue'

export default {
  name: 'app',
  components: {
    Header,
    Cards,
    Modal
  }
}
</script>
