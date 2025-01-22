import { core } from "../core.svelte";

import { Packet } from "./Packet.js";

import { GameState } from "../modules/Game.svelte";

export class MatchCreatedPacket extends Packet<GameState> {
    deserialize = (raw: GameState) => {
        core.game.state = raw;
    };
}
