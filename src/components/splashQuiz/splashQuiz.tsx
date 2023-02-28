import React, { useState, useEffect, SyntheticEvent } from "react";

import "./splashQuiz.css";
import { db } from "../../dao/firebase";
import { onValue, ref } from "firebase/database";

import { Champion } from "../../models/champion";
import { ApiDao } from "../../dao/apiDao";


export const SplashQuiz: React.FC = () => {
    const [champions, setChampions] = useState<Champion[]>([]);
    const [championToFind, setChampionToFind] = useState<Champion>();
    const [splashArt, setSplashArt] = useState<string>("");
    const [championsInSearchBar, setChampionsInSearchBar] = useState<Champion[]>([]);
    const [championsProposed, setChampionsProposed] = useState<Champion[]>([]);

    // quand la page est chargé, on récupère tous les persos
    useEffect(() => {
        const championsRef = ref(db, "Champions");
        const championsDb = [] as Champion[];

        // on récupère les données dans "Champions"
        onValue(championsRef, (snapshot) => {
            const data = snapshot.val();
            
            // pour tous les champions, on les ajoute dans le tableau
            for (const champion in data) {
                championsDb.push(new Champion(data[champion]));
            }
            setChampions(championsDb);
            const randomChampion = championsDb[Math.floor(Math.random() * championsDb.length)]
            setChampionToFind(randomChampion);

            ApiDao.getRandomSplashArt(randomChampion)
                .then((splashArt) => {
                    setSplashArt(splashArt);
                    console.log(splashArt);
            });
        });
    }, []);


    // fonction qui est appelé à chaque changement dans la barre de cherche
    const onChampionInputChange = (event: any) => {
        const proprosedChampionsHtml = document.getElementById("proprosedChampions")
        if (event.target.value === "") {
            proprosedChampionsHtml!!.style.display = "none";
            setChampionsInSearchBar([]);
            return
        }
        proprosedChampionsHtml!!.style.display = "block";

        let filteredChampions = champions.filter((champion) => {
            return champion.name
                    .toLowerCase()
                    .replaceAll("'", "")
                    .replaceAll(" ", "")
                    .includes(event.target.value
                                .toLowerCase()
                                .replaceAll("'", "")
                                .replaceAll(" ", ""))
        });
        let championsStartWithTarget = filteredChampions.filter(champion => champion.name.toLowerCase().startsWith(event.target.value))
        filteredChampions = championsStartWithTarget.concat(filteredChampions.filter(e => !championsStartWithTarget.includes(e)))
        setChampionsInSearchBar(filteredChampions.slice(0, 4));
    }

    const onClickOnChampion = (event: any) => {
        // récupère le champion qui à été cliqué
        const championName = event.target.innerText
        const championClicked = champions.find((champion) => champion.name == championName)
        
        // ajoute le champion dans la liste des champions proposés
        setChampionsProposed(championsProposed.concat([championClicked!!]))
    }

    useEffect(() => {
        const championsProposedDiv = document.getElementById("championsGive");

        if (championsProposedDiv && championsProposed.length != 0) {
            const championToAdd = championsProposed[championsProposed.length - 1]
            console.log(championToAdd);

            const championDiv = document.createElement("div");
            championDiv.className ="flex items-center p-2 m-2";

            const championImg = document.createElement("img");
            championImg.className = "champions-images";
            championImg.setAttribute("src", championToAdd.getImage())
            championImg.setAttribute("alt", championToAdd.name)
            championImg.setAttribute("key", championToAdd.name + "image")
            championDiv.appendChild(championImg);

            const championP = document.createElement("p");
            championP.className = "champions-text ml-2";
            championP.setAttribute("key", championToAdd.name + "text")
            championP.innerText = championToAdd.name
            championDiv.appendChild(championP);

            championsProposedDiv.appendChild(championDiv);
        }
    }, [championsProposed])


    return (
        <div className="flex flex-col items-center">
            <div className="splashquiz-box mt-12 content-center">
                <p>A quel champion appartient ce splash art ?</p>
                <img className="splashquiz-image" src={splashArt} alt="champion à deviner"/>
            </div>
            <div className="flex flex-row">
                <div className="splashquiz-guess-input mt-6">
                    <input placeholder="Nom de champion..." className="splashquiz-input" 
                    type="text" id="champion-input" onChange={ onChampionInputChange }/>
                </div>
                <button>
                    <span className="splashquiz-send material-symbols-outlined mt-7">send</span>
                </button>
            </div>
            <div className="proprosedChampions mt-2" id="proprosedChampions">
                {championsInSearchBar.map((champion) => (
                    <div className="champions-div flex items-center p-2 m-2" onClick={onClickOnChampion}>
                        <img className="champions-images" src={champion.getImage()} alt={champion.name} key={champion.name + "image"}/>
                        <p className="champions-text ml-2" key={champion.name + "text"}>{champion.name}</p>
                    </div>
                ))}
            </div>
            <div id="championsGive">

            </div>
        </div>
    );
}
