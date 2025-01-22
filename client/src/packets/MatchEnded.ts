import { core } from "../core.svelte";

import { Packet } from "./Packet.js";

import type { MatchEnded } from "../../../shared/src/net/SOS";

export class MatchEndedPacket extends Packet<MatchEnded[`data`][`winner_team_num`]> {
    deserialize = (raw: MatchEnded[`data`][`winner_team_num`]) => {
        core.game.series[raw]++;
    };
}
