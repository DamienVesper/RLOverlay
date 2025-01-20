import { core } from "../core.js";

import { PodiumStart } from "../../../shared/src/net/SOS.js";
import { Packet } from "./Packet.js";

import { GameState } from "../modules/Game.js";

export class PodiumStartPacket extends Packet<PodiumStart, GameState> {
    serialize = (raw: PodiumStart) => core.game.state;

    deserialize = (raw: PodiumStart) => {
        core.game.state = GameState.Podium;
    };
}
