import React, {ReactNode, useEffect, useState} from "react";
import {Champion} from "../../models/champion";
import "./championSuggest.css";

type ChampionSearchBarProps = {
    onClickOnChampion: (event: any) => void,
    championsInSearchBar: Champion[],
}

export const ChampionsSuggest: React.FC<ChampionSearchBarProps> = (props) => {
    const [blockToShow, setBlockToShow] = useState<ReactNode[]>([]);

    useEffect(() => {
        if (props.championsInSearchBar.length !== 0) {
            setBlockToShow(
                props.championsInSearchBar.map((champion) => (
                    <div className="champions-div flex items-center p-2 m-2" onClick={props.onClickOnChampion}>
                        <img className="champions-images" src={champion.getImage()} alt={champion.name}
                             key={champion.name + "image"}/>
                        <p className="champions-text ml-2" key={champion.name + "text"}>{champion.name}</p>
                    </div>
                ))
            )
        } else {
            setBlockToShow([
                <div className="flex items-center p-2 m-2">
                    <p className="">Aucun champion correspondant</p>
                </div>
            ]);
        }
    }, [props.championsInSearchBar])

    return (
        <div className="championsSuggest mt-2" id="championsSearchBar">
            {blockToShow.map((block) => block)}
        </div>
    );
}
