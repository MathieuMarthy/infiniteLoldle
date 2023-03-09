import React from "react";
import {Champion} from "../../models/champion";
import {ChampionsInput} from "../ChampionInput/championsInput";
import {ChampionsSuggest} from "../ChampionsSuggest/championsSuggest";

type ChampionSearchBarProps = {
    onChampionInputChange: (event: any) => void,
    onKeyPressOnInput: (event: any) => void,
    onClickOnChampion: (event: any) => void,
    championsInSearchBar: Champion[],
}

export const ChampionSearchBar: React.FC<ChampionSearchBarProps> = (props) => {
    return (
        <div className="ml-20">
            <ChampionsInput
                onChampionInputChange={props.onChampionInputChange}
                onKeyPressOnInput={props.onKeyPressOnInput}
            />
            <ChampionsSuggest
                onClickOnChampion={props.onClickOnChampion}
                championsInSearchBar={props.championsInSearchBar}
            />
        </div>
    );
}
