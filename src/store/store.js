import Vue from 'vue'
import Vuex from 'vuex'
import cards from './modules/cards'
import modal from './modules/modal'
import gameInfo from './modules/gameInfo'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cards,
    modal,
    gameInfo
  }
})
