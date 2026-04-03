importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAfWRgufWgQNmR7iukt3xCzlStR9Y5YC0Q",
  authDomain: "test-b8add.firebaseapp.com",
  projectId: "test-b8add",
  storageBucket: "test-b8add.appspot.com",
  messagingSenderId: "196686544330",
  appId: "1:196686544330:web:2a1a8d5379b76770f16333",
  measurementId: "G-435ZVMPZGW"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
