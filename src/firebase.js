// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// import firebase from 'firebase/app'
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "@firebase/firestore";

// const firebaseApp = firebase.initializeApp({
//     apiKey: "AIzaSyDxTxufw3XyY4cIc4ntr7pT8l1gkHKm9wI",
//     authDomain: "instagram-clone-react-d9d40.firebaseapp.com",
//     projectId: "instagram-clone-react-d9d40",
//     storageBucket: "instagram-clone-react-d9d40.appspot.com",
//     messagingSenderId: "1070682441960",
//     appId: "1:1070682441960:web:b61a9f3d0188c57248215d",
//     measurementId: "G-VWNN6JLLLL"
// })

// const app = initializeApp(firebaseConfig);   

// const db = firebaseApp.getFirestore();
// const auth = firebase.auth()
// const storage = firebase.storage()
// export {db,auth,storage}




import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDxTxufw3XyY4cIc4ntr7pT8l1gkHKm9wI",
    authDomain: "instagram-clone-react-d9d40.firebaseapp.com",
    projectId: "instagram-clone-react-d9d40",
    storageBucket: "instagram-clone-react-d9d40.appspot.com",
    messagingSenderId: "1070682441960",
    appId: "1:1070682441960:web:b61a9f3d0188c57248215d",
    measurementId: "G-VWNN6JLLLL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()
 const db = getFirestore(app);
export {db,auth}