export class Champion {
    name
    constructor(name: string) {
        this.name = name
    }

    getImagePath(): string {
        const fileName = this.name
            .toLowerCase()
            .replaceAll("'", "")
            .replaceAll(" ", "")
            .replaceAll("é", "")
        return `assets/champions/${fileName}.png`
    }
}

