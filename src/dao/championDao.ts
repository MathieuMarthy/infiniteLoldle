import { PrismaClient } from "@prisma/client";

import { Champion } from "../models/champion";

const prisma = new PrismaClient();

export const ChampionDao = {
    findAll: async () => {
        const champions = await prisma.champion.findMany();
        return champions.map((champion) => new Champion(champion["name"]));
    },

    findByName: async (name: string) => {
        const champion = await prisma.champion.findUnique({
            where: {
                name: name
            }
        });
        
        return champion === null? null : new Champion(champion["name"]); 
    }
}
