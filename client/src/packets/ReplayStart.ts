import { core } from "../core.svelte";

import { Packet } from "./Packet.js";

import { GameState } from "../modules/Game.svelte";

export class ReplayStartPacket extends Packet<GameState> {
    deserialize = (raw: GameState) => {
        core.game.state = raw;
        core.game.watchingReplay = true;
    };
}
