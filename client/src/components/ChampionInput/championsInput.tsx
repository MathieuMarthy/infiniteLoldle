import React from "react";
import "./championInput.css";

type ChampionsInputProps = {
    onChampionInputChange: (event: any) => void,
    onKeyPressOnInput: (event: any) => void,
}

export const ChampionsInput: React.FC<ChampionsInputProps> = (props) => {
    return (
        <div className="flex flex-row">
            <div className="mt-6">
                <input
                    className="championInput-input" placeholder="Nom de champion..."
                    type="text" id="champion-input" onChange={props.onChampionInputChange}
                    onKeyDown={props.onKeyPressOnInput}/>
            </div>
        <button>
        <span className="championInput-send material-symbols-outlined mt-7">send</span>
            </button>
        </div>
    );
}
