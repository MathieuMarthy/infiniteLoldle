import { championsDao } from "../dao/championsDao";

export const championController = {
    getAllChampions: () => {
        try {
            return championsDao.getAllChampions()
        } catch (e: any) {
            return Promise.reject("fail to get all champions")
        }
    }
}
