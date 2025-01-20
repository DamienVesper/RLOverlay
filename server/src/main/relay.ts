import { WebSocket } from "ws";

import { config } from "./config.js";
import { core } from "./core.js";

import { Events } from "../../../shared/src/net/SOS.js";

import { Packet } from "./packets/Packet.js";
import { MatchCreatedPacket } from "./packets/MatchCreated.js";
import { MatchDestroyedPacket } from "./packets/MatchDestroyed.js";
import { UpdatePacket } from "./packets/UpdatePacket.js";
import { VersionPacket } from "./packets/VersionPacket.js";
import { StatFeedPacket } from "./packets/StatFeed.js";
import { PodiumStartPacket } from "./packets/PodiumStart.js";
import { ReplayStartPacket } from "./packets/ReplayStart.js";
import { ReplayEndPacket } from "./packets/ReplayEnd.js";
import { MatchEndedPacket } from "./packets/MatchEnded.js";
import { InitializedPacket } from "./packets/Initialized.js";
import { PreCountdownBeginPacket } from "./packets/PreCountdownBegin.js";
import { GoalScoredPacket } from "./packets/GoalScored.js";

export class Relay {
    ws = new WebSocket(`ws://${config.sos.host}:${config.sos.port}`);

    constructor () {
        this.ws.onopen = function (_open) {
            core.logger.info(`SOS Relay`, `Connected to Rocket League.`);
        };

        this.ws.onmessage = function (message) {
            const data = JSON.parse(message.data as string) as { event: Events, data: any };

            let packet: Packet<any, any> | undefined = undefined;
            switch (data.event) {
                case Events.Version:
                    packet = new VersionPacket();
                    break;
                case Events.Initialized:
                    packet = new InitializedPacket();
                    break;
                case Events.MatchCreated:
                    packet = new MatchCreatedPacket();
                    break;
                case Events.MatchEnded:
                    packet = new MatchEndedPacket();
                    break;
                case Events.MatchDestroyed:
                    packet = new MatchDestroyedPacket();
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

                // Ignore the following packets.
                case Events.BallHit:
                case Events.ClockStarted:
                case Events.ClockUpdatedSeconds:
                case Events.ClockStopped:
                case Events.ReplayWillEnd:
                case Events.PostCountDownBegin:
                case Events.RoundStartedGo:
                    break;
                default:
                    core.logger.warn(`SOS Relay`, `Received unknown packet "${data.event as any}".`);
                    return;
            }

            packet?.deserialize(data);
        };

        this.ws.onerror = function (err) {
            core.logger.error(`SOS Relay`, err?.message ?? JSON.stringify(err));
        };

        this.ws.onclose = function (_close) {
            core.logger.info(`SOS Relay`, `Connection has been closed.`);
            process.exit();
        };
    }
}
