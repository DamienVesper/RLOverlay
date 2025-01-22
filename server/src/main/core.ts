import type { WebSocket } from "ws";

import { Relay } from "./relay.js";

import { Logger } from "./modules/Logger.js";
import { IDAllocator } from "./modules/IDAllocator.js";
import { Game } from "./modules/Game.js";

export const core = {
    version: ``,
    sockets: new Map<number, WebSocket>(),

    allocator: new IDAllocator(8),

    logger: new Logger({ handleExceptions: true }),
    relay: new Relay(),
    game: new Game()
};
