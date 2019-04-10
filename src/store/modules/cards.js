import helper from '@/assets/common/helper'

const state = {
  cards: [],
  lastStage: 10,
  currentStage: 3,
  currentNumber: 1,
  clickable: false
}

const getters = {
  getCards: (state) => state.cards,
  getCurrentStage: (state) => state.currentStage,
  getCurrentNumber: (state) => state.currentNumber,
  getClickable: (state) => state.clickable,
  getLastStage: (state) => state.lastStage
}

const actions = {
  // 配置リセット
  resetCards ({ commit }) {
    let newCards = []

    for (let i = 0; i < 25; i++) {
      const card = {
        id: i,
        number: 0,
        isOpen: false
      }
      newCards.push(card)
    }

    let number = 1
    while (number <= state.currentStage) {
      const index = Math.floor(Math.random() * 25)

      if (newCards[index].number === 0) {
        newCards[index].number = number
        number++
      }
    }

    commit('resetCards', newCards)
  },

  // 判定
  async judgeNumber ({ getters, dispatch, commit }, selectedcard) {
    // クリック防止
    if (!state.clickable) {
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

    commit('forbidClick')
    await helper.delay(2000)
    await dispatch('closeAllNumber')
    commit('nextStage')
    commit('resetCurrentNumber')
    dispatch('resetCards')
    await helper.delay(1000)
    dispatch('openAllNumber')
    let openTime = 3000 + ((getters.getCurrentStage - 3) * 200)
    await helper.delay(openTime)
    await dispatch('closeAllNumber')
    commit('allowClick')
  },

  // カードオープン
  openSelectedCard ({ commit }, selectedcard) {
    selectedcard.isOpen = true

    commit('openSelectedCard', selectedcard)
  },

  // 全部オープン
  openAllNumber ({ commit }) {
    // シャロ―コピー
    const opendCards = state.cards.slice(0)
    for (let card of opendCards) {
      if (card.number !== 0) {
        card.isOpen = true
      }
    }
    commit('openAllNumber', opendCards)
  },

  // 全部閉じる
  async closeAllNumber ({ commit }) {
    // シャロ―コピー
    const closedCards = state.cards.slice(0)
    for (let card of closedCards) {
      card.isOpen = false
    }
    commit('closeAllNumber', closedCards)
    // アニメーション中に表示が変わるのを防ぐ
    await helper.delay(200)
  }
}

const mutations = {
  resetCards: (state, newCards) => (state.cards = newCards),
  openSelectedCard: (state, selectedcard) => {
    // cardのプロパティを書き換えただけだと反映されない
    state.cards.splice(selectedcard.id, 1, selectedcard)
  },
  countUp: (state) => state.currentNumber++,
  nextStage: (state) => state.currentStage++,
  resetCurrentNumber: (state) => (state.currentNumber = 1),
  resetCurrentStage: (state) => (state.currentStage = 3),
  openAllNumber: (state, opendCards) => (state.cards = opendCards),
  closeAllNumber: (state, closedCards) => (state.cards = closedCards),
  allowClick: (state) => (state.clickable = true),
  forbidClick: (state) => (state.clickable = false)
}

export default {
  state,
  getters,
  actions,
  mutations
}
