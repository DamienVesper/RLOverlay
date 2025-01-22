import { Player as PlayerData } from "../../../../shared/src/net/SOS.js";

export class Player {
    id: PlayerData[`id`];
    teamId: PlayerData[`team`];

    name: PlayerData[`name`];
    boost: PlayerData[`boost`];

    stats: Record<`score` | `goals` | `assists` | `saves` | `shots` | `demos` | `touches`, PlayerData[`goals`]>;

    constructor (data: PlayerData) {
        this.id = data.id;
        this.teamId = data.team;

        this.name = data.name;
        this.boost = data.boost;

        this.stats = {
            score: data.score,
            goals: data.goals,
            assists: data.assists,
            saves: data.saves,
            shots: data.shots,
            demos: data.demos,
            touches: data.touches
        };
    }
}
