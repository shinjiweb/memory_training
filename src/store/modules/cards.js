const state = {
  cards: [],
  lastStage: 10,
  currentStage: 3,
  currentNumber: 1,
  allOpend: false
}

const getters = {
  getCards: (state) => state.cards,
  getCurrentStage: (state) => state.currentStage,
  getCurrentNumber: (state) => state.currentNumber,
  getAllOpend: (state) => state.allOpend
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
  judgeNumber ({ getters, dispatch, commit }, selectedcard) {
    // クリック防止
    if (state.allOpend) {
      return
    }
    console.log(selectedcard.number)

    dispatch('openSelectedCard', selectedcard)

    if (selectedcard.number !== state.currentNumber) {
      console.log('gameover')

      setTimeout(() => {
        commit('openModal')
      }, 1000)
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
    // クリック防止
    dispatch('openAllNumber')
    // TODO: Promiseでリファクタリング
    setTimeout(() => {
      dispatch('closeAllNumber')
      // アニメーションの時差対策
      setTimeout(() => {
        commit('nextStage')
        dispatch('resetCards')
        setTimeout(() => {
          dispatch('openAllNumber')
          let openTime = 3000 + ((getters.getCurrentStage - 3) * 200)
          setTimeout(() => {
            dispatch('closeAllNumber')
          }, openTime)
        }, 1000)
      }, 200)
    }, 2000)
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
  closeAllNumber ({ commit }) {
    // シャロ―コピー
    const closedCards = state.cards.slice(0)
    for (let card of closedCards) {
      card.isOpen = false
    }
    commit('closeAllNumber', closedCards)
  }
}

const mutations = {
  resetCards: (state, newCards) => (state.cards = newCards),
  openSelectedCard: (state, selectedcard) => {
    // cardのプロパティを書き換えただけだと反映されない
    state.cards.splice(selectedcard.id, 1, selectedcard)
  },
  countUp: (state) => state.currentNumber++,
  nextStage: (state) => {
    state.currentStage++
    state.currentNumber = 1
  },
  openAllNumber: (state, opendCards) => {
    state.allOpend = true
    state.cards = opendCards
  },
  closeAllNumber: (state, closedCards) => {
    state.cards = closedCards
    // アニメーションの時差対策
    setTimeout(() => {
      state.allOpend = false
    }, 200)
    // TODO: allOpendの値を変えるだけのmutationsも欲しい
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
