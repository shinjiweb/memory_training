<template>
  <transition>
    <div class="modal" v-if="getOpen">
      <div class="modal_container">
        <div class="modal_inner" v-if="!getStarted" key="before-start">
          <p class="modal_msg">
            数字の位置を記憶して<br />小さい順にクリックしよう。
          </p>
          <button v-on:click="startGame" class="modal_Btn">スタート</button>
        </div>
        <div
          class="modal_inner"
          v-else-if="getStarted && getCompleted"
          key="complete"
        >
          <div class="modal_praise">Excellent!!</div>
          <p class="modal_msg">
            最後まで遊んでいただき、ありがとうございました。
          </p>
          <button v-on:click="restart" class="modal_Btn modal_Btn-reverse">
            はじめから
          </button>
        </div>
        <div class="modal_inner" v-else key="retry">
          <p class="modal_msg">現在のステージからリトライしますか？</p>
          <button v-on:click="retryGame" class="modal_Btn">リトライ</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Modal',
  computed: {
    ...mapGetters(['getOpen', 'getStarted', 'getCompleted'])
  },
  methods: {
    ...mapActions(['startGame', 'retryGame', 'restart'])
  }
}
</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 1s;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
