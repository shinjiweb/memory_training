<template>
  <div class="cards">
    <ul class="cards_list">
      <li
        class="cards_item"
        v-on:click="judgeNumber(card)"
        v-for="card in getCards"
        :key="card.id"
      >
        <div class="cards_open" v-bind:class="{ 'js-isOpen': card.isOpen }">
          <div
            class="cards_xMark"
            v-if="card.number !== getCurrentNumber"
            key="x-mark"
          >
            <img src="@/assets/icon_x_mark.svg" alt="icon_x_mark" />
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Cards',
  computed: {
    ...mapGetters([
      'getCards',
      'getStatus',
      'getCurrentNumber',
      'getCurrentStage'
    ])
  },
  methods: {
    ...mapActions(['resetCards', 'judgeNumber', 'startGame'])
  },
  // watch: {
  //   status: {
  //     handler() {
  //       if (this.getStatus === 'READY') {
  //         this.resetCards()
  //         this.startGame()
  //       }
  //     },
  //     immediate: true
  //   }
  // }
  created() {
    if (this.getStatus === 'READY') {
      this.resetCards()
      this.startGame()
    }
  }
}
</script>
