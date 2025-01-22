import { App, HttpResponse, type WebSocket } from "uWebSockets.js";

import { core } from "./core";
import { config } from "./config";

export const app = App();
const textDecoder = new TextDecoder();

function getIP (res: HttpResponse) {
    const IP = textDecoder.decode(res.getRemoteAddressAsText());
    const proxyIP = textDecoder.decode(res.getProxiedRemoteAddressAsText());

    // Proxy IP should be an empty string when not proxied.
    return proxyIP || IP;
}

export interface WSData {
    IP: string
    id: number
}

app.ws<WSData>(`/`, {
    idleTimeout: 10,
    maxPayloadLength: 2, // 2 ** 6 = 64

    upgrade (res, req, context) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function, prefer-arrow-callback
        res.onAborted(function () {});

        res.upgrade(
            {
                IP: getIP(res),
                id: core.allocator.getNextId()
            },
            req.getHeader(`sec-websocket-key`),
            req.getHeader(`sec-websocket-protocol`),
            req.getHeader(`sec-websocket-extensions`),
            context
        );
    },

    open (socket: WebSocket<WSData>) {
        const userData = socket.getUserData();

        core.sockets.set(userData.id, socket);
        core.logger.debug(`REST`, `"${userData.IP}" [#${userData.id}] connected to the relay.`);

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
    },

    close (socket: WebSocket<WSData>, _code, _message) {
        const userData = socket.getUserData();

        core.sockets.delete(userData.id);
        core.allocator.give(userData.id);

        core.logger.debug(`REST`, `"${userData.IP}" [#${userData.id}] disconnected from the relay.`);
    }
});
