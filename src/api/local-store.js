const STORAGE_KEY = 'listmakerlist'
const STORAGE_NOTIFICATION_REMOVED = 'listmakernotification'

export const updateList = (listItems) => localStorage.setItem(STORAGE_KEY, JSON.stringify(listItems))

export const getStoredList = () => {
  const items = localStorage.getItem(STORAGE_KEY)
  return !items ? [] : JSON.parse(items)
}

export const removeNotification = () => localStorage.setItem(STORAGE_NOTIFICATION_REMOVED, true)

export const isNotificationAcknowledged = () => localStorage.getItem(STORAGE_NOTIFICATION_REMOVED) || false
