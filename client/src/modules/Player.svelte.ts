import type { Unpacked } from "../core.svelte.js";

import type { GameMsg } from "../packets/UpdatePacket.js";

import type { Player as PlayerData } from "../../../shared/src/net/SOS.js";

export class Player {
    id: PlayerData[`id`] = $state(``);
    teamId: PlayerData[`team`] = $state(0);

    name: PlayerData[`name`] = $state(``);
    boost: PlayerData[`boost`] = $state(0);

    stats: Record<`score` | `goals` | `assists` | `saves` | `shots` | `demos` | `touches`, PlayerData[`goals`]> = $state({
        score: 0,
        goals: 0,
        assists: 0,
        saves: 0,
        shots: 0,
        demos: 0,
        touches: 0
    });

    constructor (data: Unpacked<GameMsg[`players`]>) {
        this.update(data);
    }

    update = (data: Unpacked<GameMsg[`players`]>) => {
        this.id = data.id;
        this.teamId = data.teamId;

        this.name = data.name;
        this.boost = data.boost;

        this.stats.score = data.stats.score;
        this.stats.goals = data.stats.goals;
        this.stats.assists = data.stats.assists;
        this.stats.saves = data.stats.saves;
        this.stats.shots = data.stats.shots;
        this.stats.demos = data.stats.demos;
        this.stats.touches = data.stats.touches;
    };
}
