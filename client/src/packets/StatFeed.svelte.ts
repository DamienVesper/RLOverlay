import { core } from "../core.svelte.js";
import { Packet } from "./Packet.js";

import { StatFeedEvents, type StatFeed } from "../../../shared/src/net/SOS.js";

export class StatFeedPacket extends Packet<StatFeed[`data`]> {
    deserialize = (raw: StatFeed[`data`]) => {
        if (raw.event_name === StatFeedEvents.MVP) core.game.mvp = raw.main_target;
        else if (raw.event_name !== StatFeedEvents.Win) {
            const playerStatFeed = core.game.statFeed.filter(x => x.main_target.id === raw.main_target.id);
            if (playerStatFeed.length === 2) core.game.statFeed.splice(core.game.statFeed.indexOf(playerStatFeed[0]), 1);

            const time = Date.now();

            const statFeed = Object.assign(raw, { time });
            const stateFeed = $state(statFeed);

            core.game.statFeed.push(statFeed);

            setTimeout(() => {
                core.game.statFeed.splice(core.game.statFeed.indexOf(stateFeed), 1);
            }, 1e3);
        }
    };
}
