import { core } from "../core.js";

import { MatchEnded } from "../../../../shared/src/net/SOS.js";
import { Packet } from "./Packet.js";

import { GameState } from "../modules/Game.js";

export class MatchEndedPacket extends Packet<MatchEnded, GameState> {
    serialize = (_raw: MatchEnded) => core.game.state;

    deserialize = (raw: MatchEnded) => {
        core.game.series[raw.data.winner_team_num]++;
        core.logger.debug(`Rocket League`, `Game ${core.game.series.reduce((a, b) => a + b)} ended. Winner: "${core.game.teams.get(raw.data.winner_team_num)?.name}". Score: ${core.game.series.join(`-`)}`);

        core.game.teams.clear();
        core.game.players.clear();

        core.game.state = GameState.Initial;
    };
}
