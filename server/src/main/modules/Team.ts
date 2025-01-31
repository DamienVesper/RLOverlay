import { Team as TeamData } from "../../../../shared/src/net/SOS.js";
import { config } from "../config.js";
import { Player } from "./Player.js";

export class Team {
    id: number;

    name: TeamData[`name`];
    customName: TeamData[`name`];
    color: TeamData[`color_primary`];
    score: TeamData[`score`];

    players = new Map<string, Player>();

    constructor (id: number, data: TeamData) {
        this.id = id;
        this.name = data.name;
        this.customName = config.customTeamNames[id];

        this.color = data.color_primary;
        this.score = data.score;
    }
}
