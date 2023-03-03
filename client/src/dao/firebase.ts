import { getDatabase} from "firebase/database";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: "infiniteloldle-42d34.firebaseapp.com",
    databaseURL: "https://infiniteloldle-42d34-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "infiniteloldle-42d34",
    storageBucket: "infiniteloldle-42d34.appspot.com",
    messagingSenderId: "428057092356",
    appId: "1:428057092356:web:1579867c976190ed04b051",
    measurementId: "G-FG481TFYXT"
  };

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
