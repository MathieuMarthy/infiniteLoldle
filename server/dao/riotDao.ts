import {RIOT_API_URL, GAME_VERSION} from "../constants";
import fetch from "node-fetch";

export const riotDao = {
    getRandomSplashArt: async (championApiName: string) => {
        const res = await fetch(`${RIOT_API_URL}/${GAME_VERSION}/data/en_US/champion/${championApiName}.json`)
        const json = await res.json()
        const skins = json.data[championApiName].skins
        const splashArt = skins[Math.floor(Math.random() * skins.length)].num
        return `${RIOT_API_URL}/img/champion/splash/${championApiName}_${splashArt}.jpg`
    }
}
