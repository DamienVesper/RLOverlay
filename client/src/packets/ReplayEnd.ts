import { core } from "../core.svelte";

import { Packet } from "./Packet.js";

import { GameState } from "../modules/Game.svelte";

export class ReplayEndPacket extends Packet<GameState> {
    deserialize = (raw: GameState) => {
        core.game.statFeed.length = 0;

        core.game.state = raw;
        core.game.watchingReplay = false;
    };
}
