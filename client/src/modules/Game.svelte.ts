import { config } from "../config.svelte.js";

import type { Packet } from "../packets/Packet.js";
import { InitPacket } from "../packets/Init.js";
import { MatchCreatedPacket } from "../packets/MatchCreated.js";
import { MatchEndedPacket } from "../packets/MatchEnded.js";
import { PreCountdownBeginPacket } from "../packets/PreCountdownBegin.js";
import { PodiumStartPacket } from "../packets/PodiumStart.js";
import { ReplayStartPacket } from "../packets/ReplayStart.js";
import { ReplayEndPacket } from "../packets/ReplayEnd.js";
import { GoalScoredPacket } from "../packets/GoalScored.js";
import { StatFeedPacket } from "../packets/StatFeed.js";
import { UpdatePacket, type GameMsg } from "../packets/UpdatePacket.js";

import { Events } from "../../../shared/src/net/SOS.js";

export enum GameState {
    Initial,
    MatchCreated,
    Waiting,
    Playing,
    Replay,
    Podium,
    MatchEnded
}

export enum ClientEvents {
    Init = `init`
}

export class Game {
    state = $state(GameState.Initial);

    teams: GameMsg[`teams`] = $state([]);
    players: GameMsg[`players`] = $state([]);

    series: [number, number] = $state([0, 0]);
    seriesLimit = $state(config.seriesLimit);

    goalData = $state({
        speed: 0,
        scorer: {
            id: ``,
            name: ``,
            teamnum: 0
        }
    });

    target = $state(``);
    time = $state(0);
    isOT = $state(false);

    ws = new WebSocket(`${config.wsServer.ssl ? `wss` : `ws`}://${config.wsServer.ip}:${config.wsServer.port}`);

    constructor () {
        this.ws.onopen = function (_open) {
            console.log(`opened ws.`);
        };

        this.ws.onmessage = function (message) {
            const data = JSON.parse(message.data as string) as { event: Events | ClientEvents, data: any };

            let packet: Packet<any> | undefined = undefined;
            switch (data.event) {
                case ClientEvents.Init:
                    packet = new InitPacket();
                    break;
                case Events.MatchCreated:
                    packet = new MatchCreatedPacket();
                    break;
                case Events.MatchEnded:
                    packet = new MatchEndedPacket();
                    break;
                case Events.PreCountdownBegin:
                    packet = new PreCountdownBeginPacket();
                    break;
                case Events.PodiumStart:
                    packet = new PodiumStartPacket();
                    break;
                case Events.ReplayStart:
                    packet = new ReplayStartPacket();
                    break;
                case Events.ReplayEnd:
                    packet = new ReplayEndPacket();
                    break;
                case Events.GoalScored:
                    packet = new GoalScoredPacket();
                    break;
                case Events.StatFeed:
                    packet = new StatFeedPacket();
                    break;
                case Events.UpdateState:
                    packet = new UpdatePacket();
                    break;
            }

            packet?.deserialize(data.data);
        };
    }

    clearSeries () {
        this.series = [0, 0];
    }
}
