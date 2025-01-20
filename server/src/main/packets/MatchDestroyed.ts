import { core } from "../core.js";

import { MatchDestroyed } from "../../../../shared/src/net/SOS.js";
import { Packet } from "./Packet.js";

import { GameState } from "../modules/Game.js";

export class MatchDestroyedPacket extends Packet<MatchDestroyed, GameState> {
    serialize = (_raw: MatchDestroyed) => core.game.state;

    deserialize = (_raw: MatchDestroyed) => {
        core.game.teams.clear();
        core.game.players.clear();

        core.game.state = GameState.Initial;
    };
}
