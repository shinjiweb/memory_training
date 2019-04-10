<template>
  <div class="gameInfo">ステージ： {{ getCurrentStage }} / {{ getLastStage }}</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "GameInfo",
  computed: {
    ...mapGetters(["getCurrentStage", "getLastStage"])
  }
};
</script>

<style lang="scss" scoped>
.gameInfo {
  max-width: calc(500px + 20px);
  margin: 20px auto 40px;
  width: 80%;
  text-align: right;
}
</style>

