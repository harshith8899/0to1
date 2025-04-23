// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCRa7Cq_JqPvyICBk9mozxD3XmYwcl-Jm4",
    authDomain: "club-a74c0.firebaseapp.com",
    projectId: "club-a74c0",
    storageBucket: "club-a74c0.firebasestorage.app",
    messagingSenderId: "7273594842",
    appId: "1:7273594842:web:b3a2782b533a5f64b74ae3",
    measurementId: "G-XGJWBYTWRB"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize Firestore
  const db = firebase.firestore();