<template>
  <ul class="cards">
    <li
      class="cards_item"
      v-on:click="judgeNumber(card)"
      v-for="(card, index) in getCards"
      :key="index"
    >
      <div class="cards_open" v-bind:class="{ 'js-isOpen': card.isOpen }">
        <div class="cards_xMark" v-if="card.number === 0" key="x-mark">
          <img src="@/assets/icon_x_mark.svg" alt="icon_x_mark">
        </div>
        <div
          class="cards_checkMark"
          v-else-if="
            card.number === getCurrentNumber && card.number === getCurrentStage
          "
          key="check-mark"
        >
          <img src="@/assets/icon_check_mark.svg" alt="icon_check_mark">
        </div>
        <div class="cards_number" v-else key="number">{{ card.number }}</div>
      </div>
      <div
        class="cards_close"
        v-bind:class="{
          'js-isOpen': card.isOpen,
          'js-clickable': getClickable
        }"
      ></div>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Cards",
  computed: {
    ...mapGetters([
      "getCards",
      "getCurrentNumber",
      "getCurrentStage",
      "getClickable"
    ])
  },
  methods: {
    ...mapActions(["resetCards", "judgeNumber"])
  },
  created() {
    this.resetCards();
  }
};
</script>

<style lang="scss" scoped>
.cards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-gap: 5px;
  padding: 5px;
  background-color: $cr-black;

  &_item {
    position: relative;
    perspective: 150rem;
    width: 100%;

    &::before {
      content: "";
      display: block;
      padding-top: 100%;
    }
  }

  &_close {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    transition: 0.5s;
    background-color: $cr-green;
    backface-visibility: hidden;

    &.js-isOpen {
      transform: rotateY(-180deg);
    }

    &.js-clickable {
      &:hover {
        cursor: pointer;
        background-color: lighten($color: $cr-green, $amount: 15%);
      }
    }
  }

  &_open {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    transition: 0.5s;
    background-color: #fff;
    backface-visibility: hidden;
    transform: rotateY(180deg);

    &.js-isOpen {
      transform: rotateY(0);
    }
  }

  &_number {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 4rem;

    @include mq("tab") {
      font-size: 6rem;
    }
  }

  &_xMarkImg {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
</style>

