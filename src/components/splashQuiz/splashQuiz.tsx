import React, { useState, useEffect } from "react";

import "./splashQuiz.css";
import { ChampionDao } from "../../dao/championDao";
import { Champion } from "../../models/champion";


export const SplashQuiz: React.FC = () => {
    const [championsPropose, setChampionsPropose] = useState<Champion[]>([]);

    // réupération des champions

    const onChampionInputChange = (event: any) => {
        const filteredChampions = champions.filter((champion) => {
            return champion.name.toLowerCase().includes(event.target.value.toLowerCase())
        });
        setChampionsPropose(filteredChampions);
    }

    return (
        <div className="flex flex-col items-center">
            <div className="splashquiz-box mt-32 content-center">
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
                {championsPropose.map((champion) => (
                    <p>{champion["name"]}</p>
                ))}
            </div>
        </div>
    );
}
