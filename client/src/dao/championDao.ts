import { onValue, ref } from "firebase/database";
import { db } from "./firebase";
import { Champion } from "../models/champion";

export const championDao = {
    getAll: () => {
        const championsRef = ref(db, "Champions");
        const champions: Champion[] = [];

        // on récupère les données dans "Champions"
        onValue(championsRef, (snapshot) => {
            const data = snapshot.val();

            // pour tous les champions, on les ajoute dans le tableau
            for (const champion in data) {
                champions.push(new Champion(data[champion]));
            }
            console.log(champions);
        });
    }
}