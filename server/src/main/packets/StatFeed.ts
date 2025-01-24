import { core } from "../core.js";
import { Packet } from "./Packet.js";

import { StatFeed } from "../../../../shared/src/net/SOS.js";

export class StatFeedPacket extends Packet<StatFeed, StatFeed[`data`] | undefined> {
    serialize = (raw: StatFeed) => {
        if (core.game.statFeedDirty) {
            core.game.statFeedDirty = false;
            return raw.data;
        }

        return undefined;
    };

    deserialize = (raw: StatFeed) => {
        if (core.game.statFeedLocked) return;
        core.game.statFeedLocked = true;

        if (
            Date.now() - core.game.lastStatFeed.time > 200
            || (
                Date.now() - core.game.lastStatFeed.time <= 200
                && !(
                    core.game.lastStatFeed.target === raw.data.main_target.id
                    && core.game.lastStatFeed.event === raw.data.event_name
                )
            )
        ) {
            core.game.lastStatFeed = {
                target: raw.data.main_target.id,
                event: raw.data.event_name,
                time: Date.now()
            };

            core.game.statFeedDirty = true;
        }

        core.game.statFeedLocked = false;
    };
}
