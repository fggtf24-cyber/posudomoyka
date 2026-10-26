// Показывает уведомления, которые присылает сервер рассылки (push/src/index.js).
self.addEventListener("push", e => {
  let m = {};
  try { m = e.data.json(); } catch {}
  e.waitUntil(self.registration.showNotification(m.title || "Свиноферма",
    { body: m.body || "", icon: "icon.png", badge: "icon.png", tag: m.tag, renotify: true }));
});

// нажали на уведомление — открыть приложение (уже открытое — показать)
self.addEventListener("notificationclick", e => {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: "window" }).then(ws => ws[0] ? ws[0].focus() : clients.openWindow("./")));
});
