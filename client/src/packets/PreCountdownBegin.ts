import { core } from "../core.svelte";

import { Packet } from "./Packet.js";

import { animateTopBar } from "../utils/animate";

export class PreCountdownBeginPacket extends Packet<boolean> {
    deserialize = (raw: boolean) => {
        if (raw) {
            core.game.teams.length = 0;
            core.game.players.length = 0;

            try {
                setTimeout(animateTopBar, 750);
                window.obsstudio.setCurrentScene?.(`RL (Game)`);
            } catch (err) {
                console.warn(err);
            }
        }
    };
}
