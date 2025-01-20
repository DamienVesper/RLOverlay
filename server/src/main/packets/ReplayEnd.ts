import { core } from "../core.js";

import { ReplayEnd } from "../../../../shared/src/net/SOS.js";
import { Packet } from "./Packet.js";

import { GameState } from "../modules/Game.js";

export class ReplayEndPacket extends Packet<ReplayEnd, GameState> {
    serialize = (_raw: ReplayEnd) => core.game.state;

    deserialize = (_raw: ReplayEnd) => {
        core.game.state = GameState.Playing;
    };
}
