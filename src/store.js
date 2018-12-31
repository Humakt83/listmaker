import { 
  updateList,
  getStoredList,
  isNotificationAcknowledged,
  removeNotification,
  getSavedLists,
  saveList,
  deleteList
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
  updateDefaultList (state, items) {
    Vue.set(state, 'defaultList', items)
  },
  setNotification (state, value) {
    state.notificationRemoved = value
  },
  setSavedLists (state, value) {
    state.savedLists = value
    if (state.activeList) {
      state.activeList = state.savedLists.find(l => l.name === state.activeList.name)
    }
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
      context.commit('updateDefaultList', list)
    } else {
      await saveList(list)
      const savedLists = await getSavedLists()
      context.commit('setSavedLists', savedLists)
    }
  },
  async fetchStoredList (context) {
    const storedList = await getStoredList()
    context.commit('updateDefaultList', storedList)
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
    await context.commit('setSavedLists', savedLists)
    context.commit('setActiveList', list.name)
  },
  async clearOrDeleteList (context, list) {
    if (list.name !== DEFAULT_LIST) {
      await deleteList(list)
      const savedLists = await getSavedLists()
      context.commit('setSavedLists', savedLists)
    } else {
      updateList(list)
      context.commit('updateDefaultList', list)
    }
  }
}

export default new Vuex.Store({
  state, getters, mutations, actions
})
