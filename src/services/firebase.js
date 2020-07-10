import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBulgZ9T58v8EpGL3idHDjXCuS1P8jQb28",
  authDomain: "chat-app-b62b2.firebaseapp.com",
  databaseURL: "https://chat-app-b62b2.firebaseio.com",
  projectId: "chat-app-b62b2",
  storageBucket: "chat-app-b62b2.appspot.com",
  messagingSenderId: "90334661392",
  appId: "1:90334661392:web:2453648227a2440af87395",
  measurementId: "G-44R6LTJJZN",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const db = firebase.database();
