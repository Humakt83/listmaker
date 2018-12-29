import { updateList, getStoredList, isNotificationAcknowledged, removeNotification } from './api/local-store'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
  listItems: [],
  notificationRemoved: true
}

const mutations = {
  updateItemList (state, items) {
    Vue.set(state, 'listItems', items)
    updateList(state.listItems)
  },
  setNotification (state, value) {
    state.notificationRemoved = value
  }
}

const getters = {
  getListItems: state => {
    return state.listItems
  },
  isNotificationRemoved: state => state.notificationRemoved
}

const actions = {
  updateList (context, listItems) {
    context.commit('updateItemList', listItems)
  },
  async fetchStoredList (context) {
    const storedList = await getStoredList()
    context.commit('updateItemList', storedList)
  },
  async fetchNotificationAcknowledged (context) {
    const acknowledged = await isNotificationAcknowledged()
    context.commit('setNotification', acknowledged)
  },
  async removeNotification (context) {
    removeNotification()
    context.commit('setNotification', true)
  }
}

export default new Vuex.Store({
  state, getters, mutations, actions
})
