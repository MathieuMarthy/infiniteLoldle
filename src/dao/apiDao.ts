import constants from "../const.json"


export const ApiDao = {
    getIconChampion: (champion_name: string) => {
        return `${constants["apiUrl"]}/${constants["gameVersion"]}/img/champion/${champion_name}.png`
    }
}
