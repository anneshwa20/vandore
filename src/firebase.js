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
    apiKey: "AIzaSyBTXJmXqDiRoNQWkQMHYEeiA3Bt4RTHkWg",
    authDomain: "vandore-auth.firebaseapp.com",
    projectId: "vandore-auth",
    storageBucket: "vandore-auth.appspot.com",
    messagingSenderId: "421912646290",
    appId: "1:421912646290:web:3d6660e727e6c3d6768c4b",
    measurementId: "G-9CDB65QBKX"
  };


  const firebaseApp= firebase.initializeApp(firebaseConfig);
  const firebaseAppMain= firebase.initializeApp(firebaseConfigMain,"secondary");

  const dbMain= firebaseAppMain.firestore();
  const authMain= firebaseAppMain.auth();

  const db= firebaseApp.firestore();
  const auth= firebase.auth();      

  export { db, auth,firebaseApp,dbMain, authMain,firebaseAppMain};
