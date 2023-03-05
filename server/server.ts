import * as Hapi from "@hapi/hapi";
import * as Inert from "@hapi/inert";
import * as Vision from "@hapi/vision";
import * as HapiSwagger from "hapi-swagger";
import Joi from "joi";
import {Request, ResponseToolkit} from "@hapi/hapi";
import {championController} from "./controller/championController";
import {InfiniteLoldleNotFoundError} from "./errors";

const joiChampion = Joi.object({
    "apiName": Joi.string().required(),
    "gender": Joi.string().required(),
    "id": Joi.number().required(),
    "name": Joi.string().required(),
    "position": Joi.array().items(Joi.string()).required(),
    "rangeType": Joi.string().required(),
    "region": Joi.array().items(Joi.string()).required(),
    "releaseDate": Joi.number().required(),
    "resource": Joi.string().required(),
    "species": Joi.array().items(Joi.string()).required(),
}).description("Champion with all his information");
const joiChampions = Joi.object().pattern(Joi.string(), joiChampion).description("Collection of champions");


const swaggerOptions = {
    info: {
        title: "L'API of infinite loldle",
        version: "1.0.0",
    }
};

const routes = [
    {
        method: "GET",
        path: "/champions",
        handler: async (request: Request, h: ResponseToolkit) => {
            try {
                return h.response(await championController.getAllChampions()).code(200)
            } catch (e) {
                return h.response({"message": "error while trying to get the champions"}).code(500)
            }
        },
        options: {
            description: "Get all champions",
            notes: "Get all champions",
            tags: ["api", "champions"],
            response: {
                status: {
                    200: joiChampions,
                }
            }
        }
    },
    {
        method: "GET",
        path: "/champions/{name}",
        handler: async (request: Request, h: ResponseToolkit) => {
            try {
                return h.response(await championController.getChampionByName(request.params.name)).code(200)
            } catch (e: any) {
                if (e instanceof InfiniteLoldleNotFoundError) {
                    return h.response({"message": "champion not found"}).code(404)
                } else {
                    return h.response({"message": "error while trying to get the champion"}).code(500)
                }
            }
        },
        options: {
            description: "Get a champion by his name",
            notes: "Get a champion by his name",
            tags: ["api", "champions"],
            validate: {
                params: Joi.object({
                    name: Joi.string().required().description("Name of the champion in lower case without space and special characters (ex: 'kaisa' for Kai'Sa)")
                })
            },
            response: {
                status: {
                    200: joiChampion,
                }
            }
        }
    },
    {
        method: "GET",
        path: "/champions/random",
        handler: async (request: Request, h: ResponseToolkit) => {
            try {
                return h.response(await championController.getRandomChampion()).code(200)
            } catch (e: any) {
                if (e instanceof InfiniteLoldleNotFoundError) {
                    return h.response({"message": "champion not found"}).code(404)
                } else {
                    return h.response({"message": "error while trying to get the champion"}).code(500)
                }
            }
        }
    },
    {
        method: "GET",
        path: "/splash-art/random",
        handler: async (request: Request, h: ResponseToolkit) => {
            try {
                const [champion, splashArtUrl] = await championController.getRandomSplashArt()
                return h.response({"splashArtUrl": splashArtUrl, "champion": champion}).code(200)
            } catch (e: any) {
                if (e instanceof InfiniteLoldleNotFoundError) {
                    return h.response({"message": "champion not found"}).code(404)
                } else {
                    return h.response({"message": "error while trying to get the champion"}).code(500)
                }
            }
        },
        options: {
            description: "Get a random splash art of a random champion",
            notes: "Get a random splash art of a random champion",
            tags: ["api", "splash-art"],
            response: {
                status: {
                    200: Joi.object({
                        "splashArtUrl": Joi.string().required().description("Url of the splash art"),
                        "champion": joiChampion
                    })
                }
            }
        }
    },
    {
        method: "GET",
        path: "/splash-art/random/{name}",
        handler: async (request: Request, h: ResponseToolkit) => {
            try {
                const splashArtUrl = await championController.getRandomSplashArtByName(request.params.name)
                return h.response({"splashArtUrl": splashArtUrl}).code(200)
            } catch (e: any) {
                if (e instanceof InfiniteLoldleNotFoundError) {
                    return h.response({"message": "champion not found"}).code(404)
                } else {
                    return h.response({"message": "error while trying to get the champion"}).code(500)
                }
            }
        },
        options: {
            description: "Get a random splash art of a champion by his name",
            notes: "Get a random splash art of a champion by his name",
            tags: ["api", "splash-art"],
            validate: {
                params: Joi.object({
                    name: Joi.string().required().description("Name of the champion in lower case without space and special characters (ex: 'kaisa' for Kai'Sa)")
                })
            },
            response: {
                status: {
                    200: Joi.object({
                        "splashArtUrl": Joi.string().required().description("Url of the splash art")
                    }),
                }
            }
        }
    }
]


const server = Hapi.server({
    port: 5000,
    host: "localhost",
    routes: {
        cors: {
            origin: ["*"],
            additionalHeaders: ["cache-control", "x-requested-with"]

        }

    }
});

server.route(routes);

export const init = async () => {
    await server.register([
        {plugin: Inert},
        {plugin: Vision},
        {
            plugin: HapiSwagger,
            options: swaggerOptions,
        },
    ]);

    await server.initialize();
    return server;
};

export const start = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
};

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});
