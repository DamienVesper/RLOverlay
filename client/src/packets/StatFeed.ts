import { Packet } from "./Packet.js";

import type { StatFeed } from "../../../shared/src/net/SOS.js";

export class StatFeedPacket extends Packet<StatFeed[`data`]> {
    // TODO:  Implement statfeed.
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    deserialize = (_raw: StatFeed[`data`]) => {};
}
