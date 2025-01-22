import { SvelteMap } from "svelte/reactivity";

import { core } from "../core.svelte.js";
import { Player } from "./Player.svelte.js";
import { Team } from "./Team.svelte.js";

import type { Packet } from "../packets/Packet.js";
import { MatchCreatedPacket } from "../packets/MatchCreated.js";
import { MatchEndedPacket } from "../packets/MatchEnded.js";
import { PreCountdownBeginPacket } from "../packets/PreCountdownBegin.js";
import { PodiumStartPacket } from "../packets/PodiumStart.js";
import { ReplayStartPacket } from "../packets/ReplayStart.js";
import { ReplayEndPacket } from "../packets/ReplayEnd.js";
import { GoalScoredPacket } from "../packets/GoalScored.js";
import { StatFeedPacket } from "../packets/StatFeed.js";
import { UpdatePacket } from "../packets/UpdatePacket.js";

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
    Config = `config`
}

export class Game {
    state = $state(GameState.Initial);

    teams = new SvelteMap<number, Team>();
    players = new SvelteMap<Player[`id`], Player>();

    series: [number, number] = $state([0, 0]);
    seriesLimit = $state(core.seriesLimit);

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

    ws = new WebSocket(`${core.wsServer.ssl ? `wss` : `ws`}://${core.wsServer.ip}:${core.wsServer.port}`);

    constructor () {
        this.ws.onopen = function (_open) {
            console.log(`opened ws.`);
        };

        this.ws.onmessage = function (message) {
            const data = JSON.parse(message.data as string) as { event: Events | ClientEvents, data: any };

            let packet: Packet<any> | undefined = undefined;
            switch (data.event) {
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

            packet?.deserialize(data);
        };
    }

    clearSeries () {
        this.series = [0, 0];
    }
}
