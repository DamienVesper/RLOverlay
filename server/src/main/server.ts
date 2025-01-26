import { type WebSocket, WebSocketServer } from "ws";

import { core } from "./core";
import { config } from "./config";

export const server = new WebSocketServer({
    host: config.server.host,
    port: config.server.port
});

export interface WSData {
    id: number
}

export const checkSocketDisconnected = (id: number, socket: WebSocket) => {
    if (socket.readyState === socket.CLOSED) {
        core.logger.debug(`REST`, `A socket [#${id}] disconnected from the relay.`);

        core.sockets.delete(id);
        core.allocator.give(id);

        return true;
    }

    return false;
};

const sendInit = (socket: WebSocket) => {
    socket.send(JSON.stringify({
        event: `init`, // ClientEvents.Init
        data: {
            titleText: config.titleText,
            seriesText: config.seriesText,
            seriesLimit: config.seriesLimit,
            enableOBSTransitions: config.enableOBSTransitions,
            customTeamNames: config.customTeamNames,
            msg: core.game.serialize()
        }
    }));
};

export const sendAllInit = () => {
    for (const [id, socket] of [...core.sockets.entries()])
        if (!checkSocketDisconnected(id, socket)) sendInit(socket);
};

/**
 * TODO: Reverse proxy support.
 */
server.on(`connection`, (socket, req) => {
    const id = core.allocator.getNextId();

    core.sockets.set(id, socket);
    core.logger.debug(`REST`, `"${req.socket.remoteAddress}" [#${id}] connected to the relay.`);

    sendInit(socket);
});

server.on(`listening`, () => {
    core.logger.info(`REST`, `WebSocket server bound to "${config.server.host}:${config.server.port}".`);
});
