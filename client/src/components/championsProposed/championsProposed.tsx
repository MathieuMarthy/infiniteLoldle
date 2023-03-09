import React from "react";
import {Champion} from "../../models/champion";
import "./championProposed.css";

type championsProposedProps = {
    championsProposed: Champion[],
    championToFind: Champion | undefined,
}

export const ChampionsProposed: React.FC<championsProposedProps> = (props) => {
    return (
        <div className="flex flex-col-reverse mt-2" id="championsGive">
            {props.championsProposed.map((champion) =>
                <div className={`champions-proposed flex items-center ${champion.name === props.championToFind!!.name ? "Green" : "Red"}`}>
                    <img
                        className="champions-images"
                        key={champion.name + "image"}
                        src={champion.getImage()}
                        alt={champion.name}
                    />
                    <p
                        className="champions-text ml-2"
                        key={champion.name + "text"}
                    >{champion.name}</p>
                </div>
            )}
        </div>
    );
}
