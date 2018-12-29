import { updateList, getStoredList } from './api/local-store'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
  listItems: []
}

const mutations = {
  updateItemList (state, items) {
    Vue.set(state, 'listItems', items)
    updateList(state.listItems)
  }
}

const getters = {
  getListItems: state => {
    return state.listItems
  }
}

const actions = {
  updateList (context, listItems) {
    context.commit('updateItemList', listItems)
  },
  async fetchStoredList (context) {
    const storedList = await getStoredList()
    context.commit('updateItemList', storedList)
  }
}

export default new Vuex.Store({
  state, getters, mutations, actions
})
