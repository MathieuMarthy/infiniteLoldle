
export const myApiDao = {
    getAllChampions: async () => {
        const res = await fetch(`${process.env.REACT_APP_MY_API_URL}/champions`);
        return await res.json();
    },

    getRandomSplashArt: async () => {
        const res = await fetch(`${process.env.REACT_APP_MY_API_URL}/splash-art/random`);
        return await res.json();
    }
}
