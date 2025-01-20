import { config } from "../config.js";
import { Player } from "./Player.js";
import { Team } from "./Team.js";

export enum GameState {
    Initial,
    MatchCreated,
    Waiting,
    Playing,
    Replay,
    Podium,
    MatchEnded
}

export class Game {
    state = GameState.Initial;

    teams = new Map<number, Team>();
    players = new Map<Player[`id`], Player>();

    series: [number, number] = [0, 0];
    seriesLimit = config.seriesLimit;

    goalData = {
        speed: 0,
        scorer: {
            id: ``,
            name: ``,
            teamnum: 0
        }
    };

    target = ``;
    time = 0;
    isOT = false;

    clearSeries () {
        this.series = [0, 0];
    }
}
