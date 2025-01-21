import { config } from "../config.svelte.js";

import { Player } from "./Player.svelte.js";
import { Team } from "./Team.svelte.js";

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

    ws = new WebSocket(`${config.wsServer.ssl ? `wss` : `ws`}://${config.wsServer.ip}:${config.wsServer.port}`);;

    constructor () {
        this.ws.onopen = function (_open) {
            console.log(`opened ws.`);
        };

        this.ws.onmessage = function (message) {
            // const data = JSON.parse(message.data as string) as { event: Events, data: any };

            // let packet: Packet<any, any> | undefined = undefined;
            // switch (data.event) {
            //     case Events.Version:
            //         packet = new VersionPacket();
            //         break;
            //     case Events.Initialized:
            //         packet = new InitializedPacket();
            //         break;
            //     case Events.MatchCreated:
            //         packet = new MatchCreatedPacket();
            //         break;
            //     case Events.MatchEnded:
            //         packet = new MatchEndedPacket();
            //         break;
            //     case Events.MatchDestroyed:
            //         packet = new MatchDestroyedPacket();
            //         break;
            //     case Events.PreCountdownBegin:
            //         packet = new PreCountdownBeginPacket();
            //         break;
            //     case Events.PodiumStart:
            //         packet = new PodiumStartPacket();
            //         break;
            //     case Events.ReplayStart:
            //         packet = new ReplayStartPacket();
            //         break;
            //     case Events.ReplayEnd:
            //         packet = new ReplayEndPacket();
            //         break;
            //     case Events.GoalScored:
            //         packet = new GoalScoredPacket();
            //         break;
            //     case Events.StatFeed:
            //         packet = new StatFeedPacket();
            //         break;
            //     case Events.UpdateState:
            //         packet = new UpdatePacket();
            //         break;

            //     // Ignore the following packets.
            //     case Events.BallHit:
            //     case Events.ClockStarted:
            //     case Events.ClockUpdatedSeconds:
            //     case Events.ClockStopped:
            //     case Events.ReplayWillEnd:
            //     case Events.PostCountDownBegin:
            //     case Events.RoundStartedGo:
            //         break;
            //     default:
            //         core.logger.warn(`SOS Relay`, `Received unknown packet "${data.event as any}".`);
            //         return;
            // }

            // packet?.deserialize(data);
        };
    }

    clearSeries () {
        this.series = [0, 0];
    }
}
