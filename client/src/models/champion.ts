import { RiotApiDao } from "../dao/riotApiDao"

export class Champion {
    id: Number = 0
    name: string = ""
    gender: string = ""
    position: string = ""
    species: string = ""
    resource: string = ""
    rangeType: string = ""
    region: string = ""
    releaseDate: string = ""
    apiName: string = ""

    constructor(object: Object) {
        Object.assign(this, object)
    }

    getImage() {
        return RiotApiDao.getIconChampion(this.apiName);
    }
}
