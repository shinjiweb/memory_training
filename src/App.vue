<template>
  <div id="app">
    <Header />
    <Buttons />
    <Cards />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Cards from './components/Cards.vue'
import Buttons from './components/Buttons.vue'

export default {
  name: 'app',
  components: {
    Header,
    Cards,
    Buttons
  }
}
</script>
