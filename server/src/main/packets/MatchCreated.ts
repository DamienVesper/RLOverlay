import { core } from "../core.js";

import { MatchCreated } from "../../../../shared/src/net/SOS.js";
import { Packet } from "./Packet.js";

import { GameState } from "../modules/Game.js";

export class MatchCreatedPacket extends Packet<MatchCreated, GameState> {
    serialize = (_raw: MatchCreated) => core.game.state;

    deserialize = (_raw: MatchCreated) => {
        core.logger.debug(`Rocket League`, `Game ${core.game.series.reduce((a, b) => a + b) + 1} started.`);
        core.game.state = GameState.MatchCreated;
    };
}
