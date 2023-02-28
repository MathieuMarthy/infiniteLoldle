import React, { useState, useEffect } from "react";

import "./splashQuiz.css";
import { db } from "../../dao/firebase";
import { onValue, ref } from "firebase/database";

import { Champion } from "../../models/champion";
import { ApiDao } from "../../dao/apiDao";


export const SplashQuiz: React.FC = () => {
    const [champions, setChampions] = useState<Champion[]>([]);
    const [championToFind, setChampionToFind] = useState<Champion>();
    const [remainingChampions, setRemainingChampions] = useState<Champion[]>([]);
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
            setRemainingChampions(championsDb);
            const randomChampion = championsDb[Math.floor(Math.random() * championsDb.length)]
            

            ApiDao.getRandomSplashArt(randomChampion)
                .then((splashArt) => {
                    setSplashArt(splashArt);
                    setChampionToFind(randomChampion);
            });
        });

        const championInput = document.querySelector("#champion-input") as HTMLInputElement;
        championInput.focus();
    }, []);


    const onKeyPressOnInput = (event: any) => {
        if (event.key === "Enter") {
            const championClicked = championsInSearchBar[0]
            console.log(championClicked)

            if (championClicked) {
                setChampionsProposed(championsProposed.concat([championClicked!!]))
            }
        }
    }


    const hideSearchBarPropositions = () => {
        const championsSearchBarHtml = document.getElementById("championsSearchBar");
        championsSearchBarHtml!!.style.display = "none";
    }

    // fonction qui est appelé à chaque changement dans la barre de cherche
    const onChampionInputChange = (event: any) => {
        if (event.target.value === "") {
            hideSearchBarPropositions();
            setChampionsInSearchBar([]);
            return
        }
        const championsSearchBarHtml = document.getElementById("championsSearchBar")
        championsSearchBarHtml!!.style.display = "block";

        let filteredChampions = remainingChampions.filter((champion) => {
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
        const championClicked = champions.find((champion) => champion.name === championName)
        
        // ajoute le champion dans la liste des champions proposés
        setChampionsProposed(championsProposed.concat([championClicked!!]))
    }

    // Quand on clique sur un champion
    useEffect(() => {
        const championsProposedDiv = document.getElementById("championsGive");

        if (championsProposedDiv && championsProposed.length !== 0) {
            const championToAdd = championsProposed[championsProposed.length - 1];
            console.log(championToAdd);

            const championDiv = document.createElement("div");
            championDiv.className ="champions-proposed flex items-center";
            const color = championToAdd.name === championToFind!!.name ? "Green" : "Red";
            championDiv.classList.add(color);

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

            // reset l'input
            const championInput = document.querySelector("#champion-input") as HTMLInputElement;
            championInput.value = "";
            championInput.focus();
            hideSearchBarPropositions();

            // ajoute l'élement en haut de la liste
            championsProposedDiv.insertBefore(championDiv, championsProposedDiv.firstChild);

            // si le champion proposé n'est pas bon
            if (championToAdd.name !== championToFind!!.name) {
                // on le retire de la liste des champions restants
                setRemainingChampions(r => r.filter((champion) => champion.name !== championToAdd.name))
            } else {
                championInput.disabled = true;
            }
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
                    type="text" id="champion-input" onChange={ onChampionInputChange }
                    onKeyDown={ onKeyPressOnInput }/>
                </div>
                <button>
                    <span className="splashquiz-send material-symbols-outlined mt-7">send</span>
                </button>
            </div>
            <div className="championsSearchBar mt-2" id="championsSearchBar">
                {championsInSearchBar.map((champion) => (
                    <div className="champions-div flex items-center p-2 m-2" onClick={ onClickOnChampion }>
                        <img className="champions-images" src={champion.getImage()} alt={champion.name} key={champion.name + "image"}/>
                        <p className="champions-text ml-2" key={champion.name + "text"}>{champion.name}</p>
                    </div>
                ))}
            </div>
            <div className="mt-2" id="championsGive">
            </div>
        </div>
    );
}
