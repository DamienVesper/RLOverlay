import { config, type Config } from "../config.svelte";

import { Packet } from "./Packet.js";
import { UpdatePacket, type GameMsg } from "./UpdatePacket";

export class InitPacket extends Packet<Omit<Config, `wsServer`> & { msg: GameMsg }> {
    deserialize = (raw: Omit<Config, `wsServer`> & { msg: GameMsg }) => {
        config.titleText = raw.titleText;
        config.seriesText = raw.seriesText;
        config.seriesLimit = raw.seriesLimit;

        config.customTeamNames[0] = raw.customTeamNames[0];
        config.customTeamNames[1] = raw.customTeamNames[1];

        new UpdatePacket().deserialize(raw.msg);
    };
}
