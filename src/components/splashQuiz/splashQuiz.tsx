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
        if (event.target.value === "") {
            setChampionsPropose([]);
            return
        }

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
            <div className="splashquiz-box mt-16 content-center">
                <p>A quel champion appartient ce splash art ?</p>
                <img className="splashquiz-image" src="https://media.discordapp.net/attachments/1020395649302274160/1069232778916405278/image.png" alt="champion à deviner"/>
            </div>
            <div className="flex flex-row">
                <div className="splashquiz-guess-input mt-12">
                    <input placeholder="Nom de champion..." className="splashquiz-input" 
                    type="text" id="champion-input" onChange={ onChampionInputChange }/>
                </div>
                <button>
                    <span className="splashquiz-send material-symbols-outlined">send</span>
                </button>
            </div>
            <div>
                <p>Champions disponibles :</p>
                <ul>
                    {championsPropose.map((champion, index) => (
                        <div className="flex">
                            <img key={index + "image"} className="champions-images" src={champion.getImage()} alt={champion.name}/>
                            <li key={index + "text"}>{champion.name}</li>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}
