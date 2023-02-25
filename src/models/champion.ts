export class Champion {
    id: Number = 0
    name: String = ""
    gender: String = ""
    position: String = ""
    species: String = ""
    resource: String = ""
    rangeType: String = ""
    region: String = ""
    releaseDate: String = ""

    constructor(object: Object) {
        Object.assign(this, object)
    }

    getImagePath(): string {
        const fileName = this.name!!
            .toLowerCase()
            .replaceAll("'", "")
            .replaceAll(" ", "")
            .replaceAll("é", "")
        return `assets/champions/${fileName}.png`
    }
}
