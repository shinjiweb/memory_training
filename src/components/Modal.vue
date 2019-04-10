<template>
  <transition>
    <div class="modal" v-if="getOpen">
      <div class="modal_container">
        <div class="modal_inner" v-if="!getStarted" key="before-start">
          <p class="modal_msg">
            数字の位置を記憶して
            <br>小さい順にクリックしよう。
          </p>
          <button v-on:click="startGame" class="modal_Btn">スタート</button>
        </div>
        <div class="modal_inner" v-else-if="getStarted && getCompleted" key="complete">
          <div class="modal_praise">Excellent!!</div>
          <p class="modal_msg">最後まで遊んでいただき、ありがとうございました。</p>
          <button v-on:click="restart" class="modal_Btn modal_Btn-reverse">はじめから</button>
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
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Modal",
  computed: {
    ...mapGetters(["getOpen", "getStarted", "getCompleted"])
  },
  methods: {
    ...mapActions(["startGame", "retryGame", "restart"])
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(#000, 0.8);

  &_container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 60%;
    background-color: #fff;
    border-radius: 5px;
  }

  &_inner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
  }

  &_Btn {
    display: block;
    padding: 3px 0;
    margin: 10px auto 0;
    width: 120px;
    background-color: $cr-red;
    color: #fff;
    border-radius: 50px;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      background-color: lighten($cr-red, 10%);
    }

    @include mq("tab") {
      padding: 8px 0;
      margin: 30px auto 0;
    }

    &-reverse {
      background-color: #fff;
      color: $cr-red;
      border: 2px solid $cr-red;

      &:hover {
        background-color: $cr-red;
        color: #fff;
      }
    }
  }

  &_praise {
    color: $cr-red;
    font-size: 3rem;
    font-weight: 700;
    text-align: center;

    @include mq("tab") {
      font-size: 5rem;
    }
  }

  &_msg {
    margin-top: 10px;
    font-size: 1.4rem;
    line-height: 1.5;
    text-align: center;

    @include mq("tab") {
      font-size: 1.6rem;
      margin-top: 20px;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1s;
}

.v-enter,
.v-leave-to {
  opacity: 0;
}
</style>
