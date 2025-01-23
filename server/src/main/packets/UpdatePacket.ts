import { core } from "../core.js";

import { UpdateState } from "../../../../shared/src/net/SOS.js";
import { Packet } from "./Packet.js";

import { Player } from "../modules/Player.js";
import { Team } from "../modules/Team.js";
import { GameMsg, GameState } from "../modules/Game.js";

export class UpdatePacket extends Packet<UpdateState, GameMsg> {
    serialize = (_raw: UpdateState) => core.game.serialize();

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
        core.game.over = data.game.hasWinner;
    };
}
