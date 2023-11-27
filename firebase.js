import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCYPkYbHRBKxrnHWKQSSLV_pv0v2iV-31Y",
  authDomain: "devweb-acb83.firebaseapp.com",
  projectId: "devweb-acb83",
  storageBucket: "devweb-acb83.appspot.com",
  messagingSenderId: "948359966804",
  appId: "1:948359966804:web:0a95e9583255b02124bdc1",
  measurementId: "G-H7YJTZ0HXP"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)