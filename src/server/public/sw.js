this.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.')
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`)

  let notificationData = {
    body: event.data.text(),
    title: '通知',
    data: { url: '/' }
  }
  const title = notificationData.title
  // 可以发个消息通知页面
  // util.postMessage(notificationData)
  // 弹消息框
  event.waitUntil(self.registration.showNotification(title, notificationData))
})

this.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.')

  let notification = event.notification
  notification.close()
  event.waitUntil(
    /* eslint no-undef: "off" */
    clients.openWindow(notification.data.url)
  )
})
