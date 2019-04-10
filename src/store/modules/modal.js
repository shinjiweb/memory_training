import helper from '@/assets/common/helper'

const state = {
  open: true,
  started: false,
  completed: false
}

const getters = {
  getOpen: (state) => state.open,
  getStarted: (state) => state.started,
  getCompleted: (state) => state.completed
}

const actions = {
  closeModal ({ commit }) {
    commit('closeModal')
  },
  openModal ({ commit }) {
    commit(' openModal')
  },
  async startGame ({ getters, dispatch, commit }) {
    dispatch('closeModal')
    commit('started')
    await helper.delay(1000)

    dispatch('openAllNumber')
    let openTime = 3000 + ((getters.getCurrentStage - 3) * 200)
    await helper.delay(openTime)
    await dispatch('closeAllNumber')
    commit('allowClick')
  },
  async retryGame ({ getters, dispatch, commit }) {
    dispatch('closeModal')
    await dispatch('closeAllNumber')
    commit('resetCurrentNumber')
    dispatch('resetCards')
    await helper.delay(1000)
    dispatch('openAllNumber')
    let openTime = 3000 + ((getters.getCurrentStage - 3) * 200)
    await helper.delay(openTime)
    await dispatch('closeAllNumber')
    commit('allowClick')
  },
  async restart ({ getters, dispatch, commit }) {
    dispatch('closeModal')
    commit('incomplete')
    await dispatch('closeAllNumber')
    commit('resetCurrentNumber')
    commit('resetCurrentStage')
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
  closeModal: (state) => (state.open = false),
  openModal: (state) => (state.open = true),
  started: (state) => (state.started = true),
  complete: (state) => (state.completed = true),
  incomplete: (state) => (state.completed = false)
}

export default {
  state,
  getters,
  actions,
  mutations
}
