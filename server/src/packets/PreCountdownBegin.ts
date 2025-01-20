import { core } from "../core.js";

import { PreCountdownBegin } from "../../../shared/src/net/SOS.js";
import { Packet } from "./Packet.js";

import { GameState } from "../modules/Game.js";

export class PreCountdownBeginPacket extends Packet<PreCountdownBegin, boolean> {
    serialize = (raw: PreCountdownBegin) => core.game.state === GameState.Waiting;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    deserialize = (raw: PreCountdownBegin) => {};
}
