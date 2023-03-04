import {initializeApp} from "firebase/app";
import {getDatabase, ref, onValue} from "firebase/database";
import {InfiniteLoldleNotFoundError} from "../errors";

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
    champions: [],

    /**
     * Get all champions
     */
    getAllChampions: async () => {
        return championsDao.champions
    },

    /**
     * Get a champion by his name
     * @param name
     */
    getChampionByName: async (name: string) => {
        const champion = championsDao.champions.find((champion) => champion["name"] === name)
        if (!champion) {
            throw new InfiniteLoldleNotFoundError()
        }
        return champion
    }
}

// Quand les données de la base de données sont modifiées, on met à jour le cache
onValue(ref(db, "Champions"), (snapshot) => {
    championsDao.champions = snapshot.val()
})
