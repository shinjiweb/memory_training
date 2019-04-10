<template>
  <div id="app" class="app">
    <Header/>
    <div class="app_container">
      <Cards/>
      <Modal/>
    </div>
    <GameInfo/>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Cards from "./components/Cards.vue";
import Modal from "./components/Modal.vue";
import GameInfo from "./components/GameInfo.vue";

export default {
  name: "app",
  components: {
    Header,
    Cards,
    Modal,
    GameInfo
  }
};
</script>

<style lang="scss">
.app {
  &_container {
    max-width: calc(500px + 20px);
    margin: 40px auto 0;
    width: 80%;

    position: relative;
  }
}
</style>
