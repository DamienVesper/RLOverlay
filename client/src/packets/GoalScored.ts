import { core } from "../core.svelte";

import { Packet } from "./Packet.js";

export class GoalScoredPacket extends Packet<typeof core.game.goalData> {
    deserialize = (raw: typeof core.game.goalData) => {
        core.game.goalData = {
            speed: raw.speed,
            scorer: raw.scorer,
            assister: raw.assister,
            time: raw.time
        };
    };
}
