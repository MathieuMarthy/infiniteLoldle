import React, {useState, useEffect} from "react";

import "./splashQuiz.css";
import {Champion} from "../../models/champion";
import {apiDao} from "../../dao/apiDao";
import {ChampionSearchBar} from "../ChampionSearchBar/championSearchBar";
import {ChampionsProposed} from "../championsProposed/championsProposed";

export const SplashQuiz: React.FC = () => {
    const [champions, setChampions] = useState<Champion[]>([]);
    const [championToFind, setChampionToFind] = useState<Champion>();
    const [remainingChampions, setRemainingChampions] = useState<Champion[]>([]);
    const [splashArt, setSplashArt] = useState<string>("");
    const [championsInSearchBar, setChampionsInSearchBar] = useState<Champion[]>([]);
    const [championsProposed, setChampionsProposed] = useState<Champion[]>([]);

    // quand la page est chargé, on récupère tous les persos
    useEffect(() => {
        // on prend tous les champions
        apiDao.getAllChampions()
            .then((champions) => {
                const championsList = [] as Champion[];
                // on transforme les champions en objet
                for (const champion in champions) {
                    championsList.push(new Champion(champions[champion]));
                }

                setChampions(championsList);
                setRemainingChampions(championsList);

                // on récupère un splash art et son champion aléatoirement
                apiDao.getRandomSplashArt()
                    .then(([splashArt, champion]) => {
                        setSplashArt(splashArt);
                        setChampionToFind(new Champion(champion));
                    })
            })
    }, []);


    const onKeyPressOnInput = (event: any) => {
        if (event.key === "Enter") {
            const championClicked = championsInSearchBar[0]

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

    // Quand un champion est proposé, on l'ajoute dans la liste en bas
    useEffect(() => {
        const championsProposedDiv = document.getElementById("championsGive");

        if (championsProposedDiv && championsProposed.length !== 0) {
            const championToAdd = championsProposed[championsProposed.length - 1];

            // reset l'input
            const championInput = document.querySelector("#champion-input") as HTMLInputElement;
            championInput.value = "";
            championInput.focus();
            hideSearchBarPropositions();
            // si le champion proposé n'est pas bon
            if (championToAdd.name !== championToFind!!.name) {
                // on le retire de la liste des champions restants
                setRemainingChampions(r => r.filter((champion) => champion.name !== championToAdd.name))
            } else {
                championInput.disabled = true;
                championInput.placeholder = "Gagné !"

                const restartButton = document.querySelector("#restart-button") as HTMLButtonElement;
                restartButton!!.style.display = "flex";
            }
        }
    }, [championsProposed])

    const restartGame = () => {
        const championInput = document.querySelector("#champion-input") as HTMLInputElement;
        championInput.disabled = false;
        championInput.placeholder = "Nom de champion..."

        const championsProposedDiv = document.getElementById("championsGive");
        championsProposedDiv!!.innerHTML = "";

        const restartButton = document.querySelector("#restart-button") as HTMLButtonElement;
        restartButton!!.style.display = "none";

        apiDao.getRandomSplashArt()
            .then(([splashArt, champion]) => {
                setSplashArt(splashArt);
                setChampionToFind(new Champion(champion));
            })
    }

    return (
        <div className="flex flex-col items-center">
            <div className="splashquiz-box mt-12 content-center">
                <p>A quel champion appartient ce splash art ?</p>
                <img className="splashquiz-image" src={splashArt} alt="champion à deviner"/>
            </div>

            <ChampionSearchBar
                onChampionInputChange={onChampionInputChange}
                onKeyPressOnInput={onKeyPressOnInput}
                onClickOnChampion={onClickOnChampion}
                championsInSearchBar={championsInSearchBar}
            />

            <ChampionsProposed
                championsProposed={championsProposed}
                championToFind={championToFind}/>
            <button className="restart-button" id="restart-button" onClick={restartGame}>
                <p>Relancer</p>
            </button>
        </div>
    );
}
