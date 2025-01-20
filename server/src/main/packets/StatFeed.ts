import { StatFeed } from "../../../../shared/src/net/SOS.js";
import { Packet } from "./Packet.js";

export class StatFeedPacket extends Packet<StatFeed, StatFeed[`data`]> {
    serialize = (raw: StatFeed) => raw.data;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    deserialize = (_raw: StatFeed) => {};
}
