<template>
  <ul class="cards">
    <li
      class="cards_item"
      v-on:click="judgeNumber(card)"
      v-for="card in getCards"
      :key="card.id"
    >
      <div class="cards_open" v-bind:class="{ 'js-isOpen': card.isOpen }">
        <div class="cards_xMark" v-if="card.number === 0" key="x-mark">
          <img src="@/assets/icon_x_mark.svg" alt="icon_x_mark" />
        </div>
        <div
          class="cards_numberAndxMark"
          v-else-if="card.number > getCurrentNumber"
          key="number-and-x-mark"
        >
          <div class="cards_number">{{ card.number }}</div>
          <img
            class="cards_xMarkImg"
            v-if="!getAllOpend"
            src="@/assets/icon_x_mark.svg"
            alt="icon_x_mark"
          />
        </div>
        <div
          class="cards_checkMark"
          v-else-if="card.number === getCurrentStage"
          key="check-mark"
        >
          <img src="@/assets/icon_check_mark.svg" alt="icon_check_mark" />
        </div>
        <div class="cards_number" v-else key="number">
          {{ card.number }}
        </div>
      </div>
      <div class="cards_close" v-bind:class="{ 'js-isOpen': card.isOpen }">
        {{ card.number }}
      </div>
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Cards',
  computed: {
    ...mapGetters([
      'getCards',
      'getCurrentNumber',
      'getCurrentStage',
      'getAllOpend'
    ])
  },
  methods: {
    ...mapActions(['resetCards', 'judgeNumber'])
  },
  created() {
    this.resetCards()
  }
}
</script>
