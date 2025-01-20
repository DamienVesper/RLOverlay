import { core } from "../core.js";

import { GoalScored } from "../../../../shared/src/net/SOS.js";
import { Packet } from "./Packet.js";

export class GoalScoredPacket extends Packet<GoalScored, typeof core.game.goalData> {
    serialize = (_raw: GoalScored) => core.game.goalData;

    deserialize = (raw: GoalScored) => {
        core.game.teams.get(raw.data.scorer.teamnum).score++;
        core.game.goalData = {
            speed: raw.data.goalspeed,
            scorer: raw.data.scorer
        };
    };
}
