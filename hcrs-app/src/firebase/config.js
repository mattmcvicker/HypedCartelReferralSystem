import firebase from 'firebase';
// import '@firebase/auth';
// import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCJ123OnUKcLqwGM_UZEcnmpQCbqv7kvs4",
    authDomain: "hypedcartel-d986d.firebaseapp.com",
    databaseURL: "https://hypedcartel-d986d-default-rtdb.firebaseio.com",
    projectId: "hypedcartel-d986d",
    storageBucket: "hypedcartel-d986d.appspot.com",
    messagingSenderId: "216318106802",
    appId: "1:216318106802:web:faff08bc79415e1acd3dab",
    measurementId: "G-KJ3YQ8HVYS"
  };


if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };