import { Relay } from "./relay.js";
import { Logger } from "./modules/Logger.js";
import { Game } from "./modules/Game.js";

export const core = {
    version: ``,

    logger: new Logger({ handleExceptions: true }),
    relay: new Relay(),
    game: new Game()
};
