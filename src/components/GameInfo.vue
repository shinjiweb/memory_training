<template>
  <div class="gameInfo">
    ステージ： {{ getCurrentStage }} / {{ getLastStage }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'GameInfo',
  computed: {
    ...mapGetters(['getCurrentStage', 'getLastStage'])
  }
}
</script>
