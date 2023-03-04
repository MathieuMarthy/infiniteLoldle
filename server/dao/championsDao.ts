import {initializeApp} from "firebase/app";
import {child, get, getDatabase, ref} from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "infiniteloldle-42d34.firebaseapp.com",
    databaseURL: "https://infiniteloldle-42d34-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "infiniteloldle-42d34",
    storageBucket: "infiniteloldle-42d34.appspot.com",
    messagingSenderId: "428057092356",
    appId: "1:428057092356:web:1579867c976190ed04b051",
    measurementId: "G-FG481TFYXT"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app)

export const championsDao = {
    /**
     * Get all champions
     */
    getAllChampions: async () => {
        const championsRef = ref(db, "Champions");
        const data = await get(child(championsRef, "/"))
        return data.val()
    }
}
