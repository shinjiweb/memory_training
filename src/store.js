import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  cards: [],
  lastStage: 10,
  currentStage: 3,
  status: 'READY',
  currentNumber: 1
}

const getters = {
  getCards: (state) => state.cards,
  getStatus: (state) => state.status,
  getCurrentNumber: (state) => state.currentNumber,
  getCurrentStage: (state) => state.currentStage
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
  judgeNumber ({ dispatch, commit }, selectedcard) {
    console.log(selectedcard.number)
    dispatch('open', selectedcard)

    if (selectedcard.number !== state.currentNumber) {
      console.log('gameover')
      return
    }

    if (state.currentNumber !== state.currentStage) {
      commit('countUp')
      return
    }

    if (state.currentStage === state.lastStage) {
      console.log('complete')
      return
    }

    commit('nextStage')
    dispatch('resetCards')
  },

  // ゲームスタート
  startGame ({ commit }) {
    commit('startGame')
  },

  // カードオープン
  open ({ commit }, selectedcard) {
    selectedcard.isOpen = true

    commit('open', selectedcard)
  }
}

const mutations = {
  startGame: (state) => (state.status = 'GAME'),
  resetCards: (state, newCards) => (state.cards = newCards),
  open: (state, selectedcard) => {
    // cardのプロパティを書き換えただけだと反映されない
    state.cards.splice(selectedcard.id, 1, selectedcard)
  },
  countUp: (state) => state.currentNumber++,
  nextStage: (state) => {
    state.currentStage++
    state.currentNumber = 1
    state.status = 'READY'
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
