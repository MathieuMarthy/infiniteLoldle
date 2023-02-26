import { getDatabase, ref, onValue } from "firebase/database";
import { initializeApp } from "firebase/app";
import { Champion } from "../models/champion";

import data from "../const.json";

const firebaseConfig = {
    apiKey: data["apiKey"],
    authDomain: "infiniteloldle-42d34.firebaseapp.com",
    databaseURL: "https://infiniteloldle-42d34-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "infiniteloldle-42d34",
    storageBucket: "infiniteloldle-42d34.appspot.com",
    messagingSenderId: "428057092356",
    appId: "1:428057092356:web:1579867c976190ed04b051",
    measurementId: "G-FG481TFYXT"
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
