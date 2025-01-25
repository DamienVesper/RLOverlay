import { core } from "../core.svelte";

import { Packet } from "./Packet.js";

import type { MatchEnded } from "../../../shared/src/net/SOS";

export class MatchEndedPacket extends Packet<MatchEnded[`data`][`winner_team_num`]> {
    deserialize = (raw: MatchEnded[`data`][`winner_team_num`]) => {
        const newSeries: [number, number] = [core.game.series[0], core.game.series[1]];
        newSeries[raw]++;

        // Set post-game stats separate from regular stats.
        core.game.postGameStats = {
            teams: structuredClone(core.game.teams),
            players: structuredClone(core.game.players),
            series: newSeries
        };

        // Sometimes this doesn't update automatically in update packet.
        // So we will do it ourselves.
        core.game.target = ``;
    };
}
