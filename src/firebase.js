import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBy0xFb76_cn98H5am06Vy-2xZGQmEnQo4",
    authDomain: "restro-e4874.firebaseapp.com",
    databaseURL: "https://restro-e4874.firebaseio.com",
    projectId: "restro-e4874",
    storageBucket: "restro-e4874.appspot.com",
    messagingSenderId: "254630218312",
    appId: "1:254630218312:web:bee982f941d8444b59a67d",
    measurementId: "G-SDEQYVVN6K"
  };


  const firebaseConfigMain = {
    apiKey: "AIzaSyBBhbD-abkYc_WgtZzl7ZCWpHhvi7MdMlI",
    authDomain: "restro-main.firebaseapp.com",
    projectId: "restro-main",
    storageBucket: "restro-main.appspot.com",
    messagingSenderId: "956080165095",
    appId: "1:956080165095:web:c96f82611f7a9a40c85242",
    measurementId: "G-8ZEHLZ2GF8"
  };


  const firebaseApp= firebase.initializeApp(firebaseConfig);
  const firebaseAppMain= firebase.initializeApp(firebaseConfigMain,"secondary");

  const dbMain= firebaseAppMain.firestore();
  const authMain= firebaseAppMain.auth();

  const db= firebaseApp.firestore();
  const auth= firebase.auth();      

  export { db, auth,firebaseApp,dbMain, authMain,firebaseAppMain};
