import React, { useState, useEffect } from "react";

import "./splashQuiz.css";
import { ChampionDao } from "../../dao/championDao";
import { Champion } from "../../models/champion";


export const SplashQuiz: React.FC = () => {
    const [champions, setChampions] = useState<Champion[]>([]);
    const [championsPropose, setChampionsPropose] = useState<Champion[]>([]);

    // quand la page est chargé, on récupère tous les persos
    useEffect(() => {
        ChampionDao.findAll()
            .then((champions) => {
                setChampions(champions);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);


    // fonction qui est appelé à chaque changement dans la barre de cherche
    const onChampionInputChange = (event: any) => {
        const proprosedChampionsHtml = document.getElementById("proprosedChampions")
        if (event.target.value === "") {
            proprosedChampionsHtml!!.style.display = "none";
            setChampionsPropose([]);
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
        setChampionsPropose(filteredChampions.slice(0, 4));
    }


    return (
        <div className="flex flex-col items-center">
            <div className="splashquiz-box mt-12 content-center">
                <p>A quel champion appartient ce splash art ?</p>
                <img className="splashquiz-image" src="https://media.discordapp.net/attachments/1020395649302274160/1069232778916405278/image.png" alt="champion à deviner"/>
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
                {championsPropose.map((champion) => (
                    <div className="champions-div flex items-center p-2 m-2">
                        <img className="champions-images" src={champion.getImage()} alt={champion.name} key={champion.name + "image"}/>
                        <p className="champions-text" key={champion.name + "text"}>{champion.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
