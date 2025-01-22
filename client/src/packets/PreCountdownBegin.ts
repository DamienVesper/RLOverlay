import { core } from "../core.svelte";

import { Packet } from "./Packet.js";

export class PreCountdownBeginPacket extends Packet<boolean> {
    deserialize = (raw: boolean) => {
        if (raw) {
            core.game.teams.clear();
            core.game.players.clear();

            try {
                window.obsstudio.setCurrentScene?.(`RL (Game)`);
            } catch (err) {
                console.warn(err);
            }
        }
    };
}
