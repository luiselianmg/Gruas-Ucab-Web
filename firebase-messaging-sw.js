importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyB6myATHH6rsNumpYgBluJLStoMGOFvino",
  authDomain: "gruitas-ucab.firebaseapp.com",
  projectId: "gruitas-ucab",
  storageBucket: "gruitas-ucab.firebasestorage.app",
  messagingSenderId: "130776213663",
  appId: "1:130776213663:web:4ae1ac6a2b6df417c2daaa",
  measurementId: "G-5X53D1YPTG"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
