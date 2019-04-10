import helper from '@/assets/common/helper'

const state = {
  cards: [],
  clickable: false
}

const getters = {
  getCards: (state) => state.cards,
  getClickable: (state) => state.clickable
}

const actions = {
  // 配置リセット
  resetCards ({ getters, commit }) {
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
    while (number <= getters.getCurrentStage) {
      const index = Math.floor(Math.random() * 25)

      if (newCards[index].number === 0) {
        newCards[index].number = number
        number++
      }
    }

    commit('resetCards', newCards)
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
  },

  async showNewNumbers ({ getters, dispatch, commit }) {
    commit('resetCurrentNumber')
    dispatch('resetCards')
    await helper.delay(1000)
    dispatch('openAllNumber')
    let openTime = 3000 + ((getters.getCurrentStage - 3) * 200)
    await helper.delay(openTime)
    await dispatch('closeAllNumber')
    commit('allowClick')
  }
}

const mutations = {
  resetCards: (state, newCards) => (state.cards = newCards),
  openSelectedCard: (state, selectedcard) => {
    // cardのプロパティを書き換えただけだと反映されない
    state.cards.splice(selectedcard.id, 1, selectedcard)
  },
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
