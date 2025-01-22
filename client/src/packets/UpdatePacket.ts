import { core } from "../core.svelte";

import { Packet } from "./Packet.js";

import { Player } from "../modules/Player.svelte";
import { Team } from "../modules/Team.svelte";
import { GameState } from "../modules/Game.svelte";

export interface GameMsg {
    state: GameState
    players: Array<{ id: string, teamId: number, name: string, boost: number, stats: Player[`stats`] }>
    teams: Array<{ id: number, name: string, color: string, score: number }>
    target: string
    time: number
    isOT: boolean
    series: [number, number]
}

export class UpdatePacket extends Packet<GameMsg> {
    deserialize = (raw: GameMsg) => {
        core.game.state = raw.state;

        for (const team of raw.teams) {
            const tm = core.game.teams.get(team.id);

            if (tm !== undefined) tm.update(team);
            else core.game.teams.set(team.id, new Team(team));
        }

        for (const player of raw.players) {
            const pl = core.game.players.get(player.id);

            if (pl !== undefined) pl.update(player);
            else core.game.players.set(player.id, new Player(player));
        }

        core.game.target = raw.target;
        core.game.time = raw.time;
        core.game.isOT = raw.isOT;

        core.game.series[0] = raw.series[0];
        core.game.series[1] = raw.series[1];
    };
}
