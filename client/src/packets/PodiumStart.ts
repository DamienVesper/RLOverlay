import { config } from "../config.svelte";
import { core } from "../core.svelte";

import { Packet } from "./Packet.js";

import { GameState } from "../modules/Game.svelte";

export class PodiumStartPacket extends Packet<GameState> {
    deserialize = (raw: GameState) => {
        core.game.state = raw;

        if (config.enableOBSTransitions || config.forcedTransitions) {
            try {
                window.obsstudio.setCurrentScene?.(`RL (Stats)`);
            } catch (err) {
                console.warn(err);
            }
        }
    };
}
