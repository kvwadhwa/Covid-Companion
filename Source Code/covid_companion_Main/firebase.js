// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACIm8wB_lOFveGsb-dgFdij-ZbO8aOPwg",
  authDomain: "covid-app-dd2ab.firebaseapp.com",
  projectId: "covid-app-dd2ab",
  storageBucket: "covid-app-dd2ab.appspot.com",
  messagingSenderId: "844083102258",
  appId: "1:844083102258:web:dcd8733c04daafee6c322b",
  // measurementId: "${config.measurementId}"
};



// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const store = firebase.firestore()

export { auth, store };