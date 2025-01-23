import { core } from "../core.js";

import { PreCountdownBegin } from "../../../../shared/src/net/SOS.js";
import { Packet } from "./Packet.js";

export class PreCountdownBeginPacket extends Packet<PreCountdownBegin, boolean> {
    serialize = (_raw: PreCountdownBegin) => {
        if (!core.game.sentCreationMsg) {
            core.game.sentCreationMsg = true;
            core.logger.debug(`OBS`, `Requesting scene transition to "RL (Game)".`);

            return true;
        }

        return false;
    };

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    deserialize = (_raw: PreCountdownBegin) => {};
}
