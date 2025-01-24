import { config } from "../config.js";
import { Player } from "./Player.js";
import { Team } from "./Team.js";

import { StatFeedEvents } from "../../../../shared/src/net/SOS.js";

export enum GameState {
    Initial,
    MatchCreated,
    Waiting,
    Playing,
    Replay,
    Podium,
    MatchEnded
}

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

export class Game {
    state = GameState.Initial;

    teams = new Map<number, Team>();
    players = new Map<Player[`id`], Player>();

    series: [number, number] = [0, 0];
    seriesLimit = config.seriesLimit;

    goalData = {
        speed: 0,
        time: 0,
        scorer: {
            id: ``,
            name: ``,
            teamnum: 0
        },
        assister: {
            id: ``,
            name: ``
        }
    };

    lastStatFeed: {
        target: Player[`id`]
        event: StatFeedEvents | undefined
        time: number
    } = {
            target: ``,
            event: undefined,
            time: -1
        };

    statFeedDirty = false;
    statFeedLocked = false;

    target = ``;
    time = 0;
    isOT = false;
    over = false;
    sentCreationMsg = false;

    clearSeries () {
        this.series = [0, 0];
    }

    serialize () {
        const players = [...this.players.values()].map(({ id, teamId, name, boost, stats }) => ({
            id,
            teamId,
            name,
            boost,
            stats
        }));

        const teams = [...this.teams.values()].map(({ id, name, customName, color, score }) => ({
            id,
            name,
            customName,
            color,
            score
        }));

        return {
            state: this.state,
            players,
            teams,
            target: this.target,
            time: this.time,
            isOT: this.isOT,
            over: this.over,
            series: this.series
        } satisfies GameMsg as GameMsg;
    }
}
