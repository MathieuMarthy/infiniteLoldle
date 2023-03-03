"use strict";
import * as Hapi from "@hapi/hapi";
import { Request, ResponseToolkit } from "@hapi/hapi";

const routes = [
    {
        method: "GET",
        path: "/",
        handler: async (request: Request, h: ResponseToolkit) => {
            return h.response("salut !").code(200)
        }
    }
]

const server = Hapi.server({
    port: 5000,
    host: "localhost"
});

server.route(routes);

export const init = async () => {
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
