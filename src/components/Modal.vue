<template>
  <div class="modal" v-if="getOpen">
    <div class="modal_container">
      <div class="modal_inner" v-if="!getStarted" key="before-start">
        <h2>遊び方</h2>
        <p>数字の位置を記憶して<br />小さい順にクリックしよう。</p>
        <button v-on:click="startGame" class="modal_startBtn">スタート</button>
      </div>
      <div class="modal_inner" v-else key="after-start">
        <!-- <h2>遊び方</h2>
        <p>数字の位置を記憶して<br />小さい順にクリックしよう。</p>
        <button v-on:click="startGame" class="modal_startBtn">スタート</button> -->
        after
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Modal',
  computed: {
    ...mapGetters(['getOpen', 'getStarted'])
  },
  methods: {
    ...mapActions(['startGame'])
  }
}
</script>
