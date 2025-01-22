import { core } from "../core.svelte";

import { Packet } from "./Packet.js";

import { GameState } from "../modules/Game.svelte";

export class PodiumStartPacket extends Packet<GameState> {
    deserialize = (raw: GameState) => {
        core.game.state = raw;
        try {
            window.obsstudio.setCurrentScene?.(`RL (Stats)`);
        } catch (err) {
            console.warn(err);
        }
    };
}
