import { Champion } from "../models/champion"

export const ApiDao = {
    getIconChampion: (champion_name: string) => {
        return `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_GAME_VERSION}/img/champion/${champion_name}.png`
    },

    getRandomSplashArt: (champion: Champion) => {
        return fetch(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_GAME_VERSION}/data/en_US/champion/${champion.apiName}.json`)
            .then((response) => response.json())
            .then(function(data) {
                const skins = data.data[champion.apiName].skins
                const splashArt = skins[Math.floor(Math.random() * skins.length)].num
                return `${process.env.REACT_APP_API_URL}/img/champion/splash/${champion.apiName}_${splashArt}.jpg`
            })
    }
}
