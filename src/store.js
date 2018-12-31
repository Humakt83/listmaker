import { 
  updateList,
  getStoredList,
  isNotificationAcknowledged,
  removeNotification,
  getSavedLists,
  saveList
  } from './api/local-store'
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
  defaultList: {name: 'default', items: []},
  notificationRemoved: true,
  savedLists: [],
  activeList: null
}

const mutations = {
  updateItemList (state, items) {
    Vue.set(state, 'defaultList', items)
  },
  setNotification (state, value) {
    state.notificationRemoved = value
  },
  setSavedLists (state, value) {
    state.savedLists = value
  }
}

const getters = {
  getList: state => {
    return state.activeList || state.defaultList || {name: 'default', items: []}
  },
  getItemsInList: (state, getters) => getters.getList.items,
  isNotificationRemoved: state => state.notificationRemoved,
  getSavedListNames: state => {
    return state.savedLists.map(l => l.name)
  },
  getSavedList: state => name => {
    return state.savedLists.find(l => l.name === name)
  }
}

const actions = {
  updateList (context, list) {
    updateList(list)
    context.commit('updateItemList', list)
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
  },
  async fetchSavedLists (context) {
    const savedLists = await getSavedLists()
    context.commit('setSavedLists', savedLists)
  },
  async addOrUpdateSavedList (context, list) {
    await saveList(list)
    const savedLists = await getSavedLists()
    context.commit('setSavedLists', savedLists)
  }
}

export default new Vuex.Store({
  state, getters, mutations, actions
})
