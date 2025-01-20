import { core } from "../core.js";

import { UpdateState } from "../../../../shared/src/net/SOS.js";
import { Packet } from "./Packet.js";

import { Player } from "../modules/Player.js";
import { Team } from "../modules/Team.js";
import { GameState } from "../modules/Game.js";

export interface GameMsg {
    players: Array<{ id: string, teamId: number, name: string, boost: number, stats: Player[`stats`] }>
    teams: Array<{ id: number, name: string, color: string, score: number }>
    target: string
    isOT: boolean
    series: [number, number]
}

export class UpdatePacket extends Packet<UpdateState, GameMsg> {
    serialize = (_raw: UpdateState) => {
        const players = [...core.game.players.values()].map(({ id, teamId, name, boost, stats }) => ({
            id,
            teamId,
            name,
            boost,
            stats
        }));

        const teams = [...core.game.teams.values()].map(({ id, name, customName, color, score }) => ({
            id,
            name,
            customName,
            color,
            score
        }));

        return {
            players,
            teams,
            target: core.game.target,
            time: core.game.time,
            isOT: core.game.isOT,
            series: core.game.series
        };
    };

    deserialize = (raw: UpdateState) => {
        const { data } = raw;

        // Set game state if not already done so.
        if (core.game.state !== GameState.Playing) core.game.state = GameState.Playing;

        // Populate teams.
        Object.values(data.game.teams).forEach((team, i) => core.game.teams.set(i, new Team(i, team)));

        // Populate players.
        Object.values(data.players).forEach(player => {
            const playerObj = new Player(player);

            core.game.players.set(player.id, playerObj);
            core.game.teams.get(player.team)?.players.set(player.id, playerObj);
        });

        core.game.target = data.game.target;
        core.game.time = Math.floor(data.game.time_seconds);
        core.game.isOT = data.game.isOT;
    };
}
