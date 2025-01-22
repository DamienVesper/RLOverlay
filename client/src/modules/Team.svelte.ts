import { SvelteMap } from "svelte/reactivity";

import { config } from "../config.svelte.js";
import type { Unpacked } from "../core.svelte.js";

import { Player } from "./Player.svelte.js";

import type { GameMsg } from "../packets/UpdatePacket.js";

import type { Team as TeamData } from "../../../shared/src/net/SOS.js";

export class Team {
    id = $state(0);

    name: TeamData[`name`] = $state(``);
    customName: TeamData[`name`] = $state(``);
    color: TeamData[`color_primary`] = $state(``);
    score: TeamData[`score`] = $state(0);

    players = new SvelteMap<string, Player>();

    constructor (data: Unpacked<GameMsg[`teams`]>) {
        this.update(data);
    }

    update = (data: Unpacked<GameMsg[`teams`]>) => {
        this.id = data.id;
        this.name = data.name;
        this.customName = config.customTeamNames[this.id];

        this.color = data.color;
        this.score = data.score;
    };
}
