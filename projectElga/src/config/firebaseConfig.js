import { getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
// import { getFirestore } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { initializeApp } from "firebase/app";
import {initializeAuth, browserLocalPersistence} from "firebase/auth";
const firebaseConfig = {

  apiKey: "AIzaSyDr9JNBft73VHJ_r4662VW1nYfWTB4wj0E",
  authDomain: "elga-roma-717ed.firebaseapp.com",
  projectId: "elga-roma-717ed",
  storageBucket: "elga-roma-717ed.appspot.com",
  messagingSenderId: "529591963729",
  appId: "1:529591963729:web:82f37b90e5da303631e870",
  measurementId: "G-6TNR5H94F1",
};
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { firebaseConfig,db,storage,auth,app};  