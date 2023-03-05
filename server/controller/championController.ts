import { championsDao } from "../dao/championsDao";
import {riotDao} from "../dao/riotDao";
import {InfiniteLoldleNotFoundError} from "../errors";

export const championController = {
    getAllChampions: () => {
        try {
            return championsDao.getAllChampions()
        } catch (e: any) {
            return Promise.reject()
        }
    },

    getChampionByName: (name: string) => {
        try {
            return championsDao.getChampionByName(name)
        } catch (e: any) {
            if (e instanceof InfiniteLoldleNotFoundError) {
                throw e
            }
            return Promise.reject()
        }
    },

    getRandomChampion: () => {
        try {
            return championsDao.getRandomChampion()
        } catch (e: any) {
            if (e instanceof InfiniteLoldleNotFoundError) {
                throw e
            }
            return Promise.reject()
        }
    },

    getRandomSplashArtByName: async (name: string) => {
        try {
            const champion: any = await championsDao.getChampionByName(name)
            return riotDao.getRandomSplashArt(champion["apiName"])
        } catch (e: any) {
            if (e instanceof InfiniteLoldleNotFoundError) {
                throw e
            }
            return Promise.reject()
        }
    },

    getRandomSplashArt: async () => {
        try {
            const champion = await championsDao.getRandomChampion()
            return [champion, await riotDao.getRandomSplashArt(champion["apiName"])]
        } catch (e: any) {
            if (e instanceof InfiniteLoldleNotFoundError) {
                throw e
            }
            return Promise.reject()
        }
    }
}
