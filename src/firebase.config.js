import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB6joQ5nCpPTo-7IqDZ0kt_KslNku38G44",
  authDomain: "phone-book-79702.firebaseapp.com",
  databaseURL: "https://phone-book-79702-default-rtdb.firebaseio.com",
  projectId: "phone-book-79702",
  storageBucket: "phone-book-79702.appspot.com",
  messagingSenderId: "505379381050",
  appId: "1:505379381050:web:e04056a87e5ef53efb3a03",
};

const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);
export const db = getDatabase(firebase);
