const STORAGE_KEY_PREFIX = 'listmaker-'
const STORAGE_DEFAULT_LIST = STORAGE_KEY_PREFIX + 'list'
const STORAGE_NOTIFICATION_REMOVED = STORAGE_KEY_PREFIX + 'notification'
const STORAGE_SAVED_LISTS = STORAGE_KEY_PREFIX + 'saved-lists'

export const updateList = (listItems) => localStorage.setItem(STORAGE_DEFAULT_LIST, JSON.stringify(listItems))

export const getStoredList = () => {
  const items = localStorage.getItem(STORAGE_DEFAULT_LIST)
  return !items ? {name: 'default', items: []} : JSON.parse(items)
}

export const removeNotification = () => localStorage.setItem(STORAGE_NOTIFICATION_REMOVED, true)

export const isNotificationAcknowledged = () => localStorage.getItem(STORAGE_NOTIFICATION_REMOVED) || false

export const getSavedLists = () => {
  const savedLists = localStorage.getItem(STORAGE_SAVED_LISTS)
  return !savedLists ? [] : JSON.parse(savedLists)
}

export const saveList = (list) => {
  const savedLists = getSavedLists()
  const savedList = savedLists.find(l => l.name === list.name)
  if (savedList) {
    savedList.items = list.items
    savedList.name = list.name
  } else {
    savedLists.push(list)
  }
  localStorage.setItem(STORAGE_SAVED_LISTS, JSON.stringify(savedLists))
}

export const deleteList = (list) => {
  const savedLists = getSavedLists()
  const filtered = savedLists.filter(l => l.name !== list.name)
  localStorage.setItem(STORAGE_SAVED_LISTS, JSON.stringify(filtered))
}
