// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYPkYbHRBKxrnHWKQSSLV_pv0v2iV-31Y",
  authDomain: "devweb-acb83.firebaseapp.com",
  projectId: "devweb-acb83",
  storageBucket: "devweb-acb83.appspot.com",
  messagingSenderId: "948359966804",
  appId: "1:948359966804:web:0a95e9583255b02124bdc1",
  measurementId: "G-H7YJTZ0HXP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export default firebase