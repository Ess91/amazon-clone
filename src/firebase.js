// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBr-PXQjIqr11QpjFXSahsdGeyAdSJMbQE",
  authDomain: "clone-56b93.firebaseapp.com",
  databaseURL: "https://clone-56b93.firebaseio.com",
  projectId: "clone-56b93",
  storageBucket: "clone-56b93.appspot.com",
  messagingSenderId: "1036877883337",
  appId: "1:1036877883337:web:cb38542e4cadb67e7fea18",
  measurementId: "G-RJRS2CC4Q9"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };