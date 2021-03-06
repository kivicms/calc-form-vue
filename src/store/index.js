import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: []
  },
  mutations: {
    update (state, items) {
      state.items = items
      localStorage.setItem('items', JSON.stringify(items))
    }
  }
})
