import {Champion} from "./champion";
import React from "react";


export class SearchBar {
    private remainingChampions: Champion[]
    private allChampions: Champion[]
    private proposedChampions: Champion[] = []
    private html: HTMLDivElement
    private onClickFonction: (event: any) => void

    constructor(allChampions: Champion[], searchBarHtml: HTMLDivElement, onClickOnChampion: (event: any) => void) {
        this.remainingChampions = allChampions
        this.allChampions = allChampions
        this.html = searchBarHtml
        this.onClickFonction = onClickOnChampion
    }

    /**
     * Fonction appelée quand on change la valeur de l'input
     * Elle permet de mettre à jour les champions proposés
     * en recherchant les champions qui contiennent la valeur de l'input
     * @param event
     */
    onChangeOnInput(event: any) {
        const inputValue = event.target.value

        // si l'input est vide on propose aucun champions
        if (inputValue === "") {
            this.hideSearchBar()
            this.proposedChampions = []
            return
        }

        // on récupère tous les champions qui contiennent la valeur de l'input
        let filteredChampions = this.remainingChampions
            .filter(champion => {
                return this.clearString(champion.name)
                    .includes(this.clearString(inputValue))
            })

        // on récupère tous les champions qui commencent par la valeur de l'input
        const championsStartWithInputValue = filteredChampions
            .filter(champion => {
                return this.clearString(champion.name)
                    .startsWith(this.clearString(inputValue))
            })

        // on met en premier les champions qui commencent par la valeur de l'input
        // et ensuite on met les autres champions, en supprimant les doublons
        filteredChampions = championsStartWithInputValue
            .concat(filteredChampions
                .filter(champion => !championsStartWithInputValue.includes(champion)))

        // on met à jour les champions proposés
        this.proposedChampions = filteredChampions
    }

    restart() {

    }

    private createHtmlChildrens(champions: Champion[]): HTMLDivElement[] {
        // <div className="champions-div flex items-center p-2 m-2" onClick={ onClickOnChampion }>
        //     <img className="champions-images" src={champion.getImage()} alt={champion.name} key={champion.name + "image"}/>
        //     <p className="champions-text ml-2" key={champion.name + "text"}>{champion.name}</p>
        // </div>
        return champions.map(champion => {
            const championsDiv = document.createElement("div") as HTMLDivElement
            championsDiv.className = "champions-div flex items-center p-2 m-2"
            championsDiv.onclick = this.onClickFonction

            const championsImage = document.createElement("img")
            championsImage.className = "champions-images"
            championsImage.src = champion.getImage()
            championsImage.alt = champion.name

            const championsText = document.createElement("p")
            championsText.className = "champions-text ml-2"
            championsText.innerText = champion.name

            championsDiv.appendChild(championsImage)
            championsDiv.appendChild(championsText)

            return championsDiv
        })
    }

    private hideSearchBar() {
        this.html.style.display = "none";
    }

    private showSearchBar() {
        this.html.style.display = "block";
    }

    private clearString(string: string): string {
        return string
            .toLowerCase()
            .replaceAll("'", "")
            .replaceAll(" ", "")
    }
}
