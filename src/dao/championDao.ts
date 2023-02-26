import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import { Champion } from "../models/champion";

const firebaseConfig = {
    apiKey: "AIzaSyD0v61V5oOUDgpPENxIM7Hpq5lDbyRBFKM",
    authDomain: "infiniteloldle-42d34.firebaseapp.com",
    databaseURL: "https://infiniteloldle-42d34-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "infiniteloldle-42d34",
    storageBucket: "infiniteloldle-42d34.appspot.com",
    messagingSenderId: "428057092356",
    appId: "1:428057092356:web:b6b0cd08e338ad7004b051",
    measurementId: "G-M9LM2PKZBW"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const ChampionDao = {
    findAll: async () => {
        // on se place dans le branche "Champions" de la db
        const championsRef = ref(db, "Champions");
        const champions = [] as Champion[];

        // on récupère les données dans "Champions"
        onValue(championsRef, (snapshot) => {
            const data = snapshot.val();
            
            // pour tous les champions, on les ajoute dans le tableau
            for (const champion in data) {
                champions.push(new Champion(data[champion]));
            }
        });
        return champions
    },

    findByName: async (name: string) => {
        console.log(name);
    }
}
