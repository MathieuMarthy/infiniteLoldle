import * as Hapi from "@hapi/hapi";
import * as Inert from "@hapi/inert";
import * as Vision from "@hapi/vision";
import * as HapiSwagger from "hapi-swagger";
import Joi from "joi";
import {Request, ResponseToolkit} from "@hapi/hapi";
import {championController} from "./controller/championController";


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
        title: "L'API of infinite loldel",
        version: "1.0.0",
    }
};

const routes = [
    {
        method: "GET",
        path: "/",
        handler: async (request: Request, h: ResponseToolkit) => {
            try {
                return h.response(await championController.getAllChampions()).code(200)
            } catch (e) {
                return h.response("Fail").code(500)
            }
        },
        options: {
            description: "Get all champions",
            notes: "Get all champions",
            tags: ["api"],
            response: {
                status: {
                    200: joiChampions,
                }
            }
        }
    }
]

const server = Hapi.server({
    port: 5000,
    host: "localhost"
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
