import { core } from "../core.svelte.js";
import { Packet } from "./Packet.js";

import { StatFeedEvents, type StatFeed } from "../../../shared/src/net/SOS.js";

/**
 * Events to be displayed on the player bar.
 */
const playerBarEvents = [
    StatFeedEvents.Goal,
    StatFeedEvents.Assist,
    StatFeedEvents.Shot,
    StatFeedEvents.Save,
    StatFeedEvents.EpicSave,
    StatFeedEvents.Demolition
];

export class StatFeedPacket extends Packet<StatFeed[`data`]> {
    deserialize = (raw: StatFeed[`data`]) => {
        if (raw.type === StatFeedEvents.MVP) core.game.mvp = raw.main_target;
        else if (playerBarEvents.includes(raw.type)) {
            const playerStatFeed = core.game.statFeed.filter(x => x.main_target.id === raw.main_target.id);
            if (playerStatFeed.length === 2) core.game.statFeed.splice(core.game.statFeed.indexOf(playerStatFeed[0]), 1);

            const statFeed = Object.assign(raw, { time: Date.now() });
            const stateFeed = $state(statFeed);

            core.game.statFeed.push(statFeed);

            setTimeout(() => {
                core.game.statFeed.splice(core.game.statFeed.indexOf(stateFeed), 1);
            }, 6e3);
        }
    };
}
