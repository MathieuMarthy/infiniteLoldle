import { championsDao } from "../dao/championsDao";
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
    }
}
