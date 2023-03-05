import { RIOT_API_URL, GAME_VERSION, INFINITE_LOLDLE_API_URL } from "../contants";

export const apiDao = {
    getAllChampions: async () => {
        const res = await fetch(`${INFINITE_LOLDLE_API_URL}/champions`);
        return await res.json();
    },

    getRandomSplashArt: async () => {
        const res = await fetch(`${INFINITE_LOLDLE_API_URL}/splash-art/random`);
        const json = await res.json();
        return [json.splashArtUrl, json.champion];
    },

    getIconChampion: (champion_name: string) => {
        return `${RIOT_API_URL}/${GAME_VERSION}/img/champion/${champion_name}.png`
    },
}
