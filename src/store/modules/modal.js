const state = {
  open: true,
  started: false
}

const getters = {
  getOpen: (state) => state.open,
  getStarted: (state) => state.started
}

const actions = {
  closeModal ({ commit }) {
    commit('closeModal')
  },
  openModal ({ commit }) {
    commit(' openModal')
  },
  startGame ({ getters, dispatch, commit }) {
    dispatch('closeModal')
    commit('started')

    dispatch('openAllNumber')
    let openTime = 3000 + ((getters.getCurrentStage - 3) * 200)
    setTimeout(() => {
      dispatch('closeAllNumber')
    }, openTime)
  }
}

const mutations = {
  closeModal: (state) => (state.open = false),
  openModal: (state) => (state.open = true),
  started: (state) => (state.started = true)
}

export default {
  state,
  getters,
  actions,
  mutations
}
