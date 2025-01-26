import { core } from "../core.svelte.js";
import { Packet } from "./Packet.js";

import { StatFeedEvents, type StatFeed } from "../../../shared/src/net/SOS.js";

export class StatFeedPacket extends Packet<StatFeed[`data`]> {
    deserialize = (raw: StatFeed[`data`]) => {
        if (raw.event_name === StatFeedEvents.MVP) core.game.mvp = raw.main_target;
        else if (raw.event_name !== StatFeedEvents.Win) core.game.statFeed.push(Object.assign(raw, { time: Date.now() }));
    };
}
