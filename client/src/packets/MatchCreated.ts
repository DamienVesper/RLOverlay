import { core } from "../core.svelte";

import { Packet } from "./Packet.js";

import { GameState } from "../modules/Game.svelte";

export class MatchCreatedPacket extends Packet<GameState> {
    deserialize = (raw: GameState) => {
        core.game.state = raw;

        // Update game only after it has concluded, to not confuse the viewers.
        if (core.game.newSeries[0] !== 0 && core.game.newSeries[1] !== 0) {
            core.game.series[0] = core.game.newSeries[0];
            core.game.series[1] = core.game.newSeries[1];
        }
    };
}
