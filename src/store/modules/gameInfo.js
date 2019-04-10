import helper from '@/assets/common/helper'

const state = {
  lastStage: 10,
  currentStage: 3,
  currentNumber: 1
}

const getters = {
  getLastStage: (state) => state.lastStage,
  getCurrentStage: (state) => state.currentStage,
  getCurrentNumber: (state) => state.currentNumber
}

const actions = {
  // 判定
  async judgeNumber ({ getters, dispatch, commit }, selectedcard) {
    // クリック防止
    if (!getters.getClickable) {
      return
    }

    dispatch('openSelectedCard', selectedcard)

    // ゲームオーバー
    if (selectedcard.number !== state.currentNumber) {
      commit('forbidClick')
      await helper.delay(1000)
      commit('openModal')
      return
    }

    if (state.currentNumber !== state.currentStage) {
      commit('countUp')
      return
    }

    // ゲームクリア
    if (state.currentStage === state.lastStage) {
      commit('forbidClick')
      commit('complete')
      await helper.delay(1000)
      commit('openModal')
      return
    }

    // 次のステージに移動
    commit('forbidClick')
    await helper.delay(2000)
    await dispatch('closeAllNumber')
    commit('nextStage')
    await dispatch('showNewNumbers')
  }
}

const mutations = {
  countUp: (state) => state.currentNumber++,
  nextStage: (state) => state.currentStage++,
  resetCurrentNumber: (state) => (state.currentNumber = 1),
  resetCurrentStage: (state) => (state.currentStage = 3)
}

export default {
  state,
  getters,
  actions,
  mutations
}
