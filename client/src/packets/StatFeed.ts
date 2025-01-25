import { core } from "../core.svelte.js";
import { Packet } from "./Packet.js";

import type { StatFeed } from "../../../shared/src/net/SOS.js";

export class StatFeedPacket extends Packet<StatFeed[`data`]> {
    deserialize = (raw: StatFeed[`data`]) => {
        core.game.statFeed.push(Object.assign(raw, { time: Date.now() }));
    };
}
