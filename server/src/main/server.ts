import { App, HttpResponse, type WebSocket } from "uWebSockets.js";

import { WebSocketServer } from "ws";

import { core } from "./core";
import { config } from "./config";

export const server = new WebSocketServer({
    host: config.server.host,
    port: config.server.port
});

export interface WSData {
    id: number
}

/**
 * TODO: Reverse proxy support.
 */
server.on(`connection`, (socket, req) => {
    const id = core.allocator.getNextId();

    core.sockets.set(id, socket);
    core.logger.debug(`REST`, `"${req.socket.remoteAddress}" [#${id}] connected to the relay.`);

    socket.send(JSON.stringify({
        event: `init`, // ClientEvents.Init
        data: {
            titleText: config.titleText,
            seriesText: config.seriesText,
            seriesLimit: config.seriesLimit,
            customTeamNames: config.customTeamNames,
            msg: core.game.serialize()
        }
    }));
});

server.on(`close`, () => {
    // TODO: Detect which WebSocket closes and remove it from the map (without using socket.io, please).
    core.logger.debug(`REST`, `A socket disconnected from the relay.`);

    // const userData = socket.getUserData();

    // core.sockets.delete(userData.id);
    // core.allocator.give(userData.id);
});

server.on(`listening`, () => {
    core.logger.info(`REST`, `WebSocket server bound to "${config.server.host}:${config.server.port}".`);
});
