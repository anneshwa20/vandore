import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCIeVz0Z_1CT33oeeTn-KL17cESTrRLDpk",
  authDomain: "vandore-ac2b8.firebaseapp.com",
  projectId: "vandore-ac2b8",
  storageBucket: "vandore-ac2b8.appspot.com",
  messagingSenderId: "315011379701",
  appId: "1:315011379701:web:3c136627853176361770bc",
  measurementId: "G-RCBJDXKDWY"
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
