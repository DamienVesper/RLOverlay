import { core } from "../core.svelte";

import { Packet } from "./Packet.js";

import { GameState } from "../modules/Game.svelte";

export class MatchDestroyedPacket extends Packet<GameState> {
    deserialize = (raw: GameState) => {
        // Sometimes this doesn't update automatically in update packet.
        // So we will do it ourselves.
        core.game.target = ``;
    };
}
