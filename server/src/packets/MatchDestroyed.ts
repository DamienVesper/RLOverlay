import { core } from "../core.js";

import { MatchDestroyed } from "../../../shared/src/net/SOS.js";
import { Packet } from "./Packet.js";

import { GameState } from "../modules/Game.js";

export class MatchDestroyedPacket extends Packet<MatchDestroyed, GameState> {
    serialize = (raw: MatchDestroyed) => core.game.state;

    deserialize = (raw: MatchDestroyed) => {
        core.game.teams.clear();
        core.game.players.clear();
        // core.game.clearSeries();

        core.game.state = GameState.Initial;
    };
}
