import { core } from "../core.js";

import { PreCountdownBegin } from "../../../../shared/src/net/SOS.js";
import { Packet } from "./Packet.js";

import { GameState } from "../modules/Game.js";

export class PreCountdownBeginPacket extends Packet<PreCountdownBegin, boolean> {
    serialize = (_raw: PreCountdownBegin) => core.game.state === GameState.MatchCreated;

    deserialize = (_raw: PreCountdownBegin) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        core.game.state === GameState.MatchCreated && core.logger.debug(`OBS`, `Requesting scene transition to "RL (Game)".`);
    };
}
