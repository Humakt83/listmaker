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

const DEFAULT_LIST = 'default'

const state = {
  defaultList: {name: DEFAULT_LIST, items: []},
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
  },
  setActiveList (state, name) {
    state.activeList = state.savedLists.find(l => l.name === name)
  }
}

const getters = {
  getList: state => {
    return state.activeList || state.defaultList
  },
  getItemsInList: (state, getters) => getters.getList.items,
  isNotificationRemoved: state => state.notificationRemoved,
  getSavedListNames: state => {
    return state.savedLists.map(l => l.name)
  },
}

const actions = {
  async updateList (context, list) {
    if (list.name === DEFAULT_LIST) {
      updateList(list)
      context.commit('updateItemList', list)
    } else {
      await saveList(list)
      const savedLists = await getSavedLists()
      context.commit('setSavedLists', savedLists)
    }
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
  async loadList (context, name) {
    context.commit('setActiveList', name)
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
