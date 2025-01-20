import { core } from "../core.js";

import { Version } from "../../../../shared/src/net/SOS.js";
import { Packet } from "./Packet.js";

export class VersionPacket extends Packet<Version, undefined> {
    serialize = (_raw: Version) => undefined;

    deserialize = (raw: Version) => {
        core.version = raw.data;
        core.logger.info(`SOS Relay`, `Running SOS v${core.version}.`);
    };
}
