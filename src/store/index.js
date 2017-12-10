import Vue from 'vue'
import Vuex from 'vuex'
// import { state, mutations } from './mutations'
// import plugins from './plugins'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
