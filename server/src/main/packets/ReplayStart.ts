import { core } from "../core.js";

import { ReplayStart } from "../../../../shared/src/net/SOS.js";
import { Packet } from "./Packet.js";

import { GameState } from "../modules/Game.js";

export class ReplayStartPacket extends Packet<ReplayStart, GameState> {
    serialize = (_raw: ReplayStart) => core.game.state;

    deserialize = (_raw: ReplayStart) => {
        core.game.state = GameState.Replay;
    };
}
