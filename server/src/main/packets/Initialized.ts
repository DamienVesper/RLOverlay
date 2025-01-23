import { core } from "../core.js";

import { Initialized } from "../../../../shared/src/net/SOS.js";
import { Packet } from "./Packet.js";

import { GameState } from "../modules/Game.js";

export class InitializedPacket extends Packet<Initialized, GameState> {
    serialize = (_raw: Initialized) => core.game.state;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    deserialize = (_raw: Initialized) => {};
}
