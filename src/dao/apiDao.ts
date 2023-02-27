export const ApiDao = {
    getIconChampion: (champion_name: string) => {
        return `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_GAME_VERSION}/img/champion/${champion_name}.png`
    }
}
