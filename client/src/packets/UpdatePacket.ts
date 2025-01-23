import { core } from "../core.svelte";

import { Packet } from "./Packet.js";

import { Player } from "../modules/Player.svelte";
import { GameState } from "../modules/Game.svelte";

export interface GameMsg {
    state: GameState
    players: Array<{ id: string, teamId: number, name: string, boost: number, stats: Player[`stats`] }>
    teams: Array<{ id: number, name: string, color: string, score: number }>
    target: string
    time: number
    isOT: boolean
    over: boolean
    series: [number, number]
}

export class UpdatePacket extends Packet<GameMsg> {
    deserialize = (raw: GameMsg) => {
        core.game.state = raw.state;

        core.game.players = raw.players;
        core.game.teams = raw.teams;

        core.game.target = raw.target;
        core.game.time = raw.time;
        core.game.isOT = raw.isOT;

        if (!raw.over) {
            core.game.series[0] = raw.series[0];
            core.game.series[1] = raw.series[1];
        } else {
            core.game.newSeries[0] = raw.series[0];
            core.game.newSeries[1] = raw.series[1];
        }
    };
}
