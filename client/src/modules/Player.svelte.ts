import type { Player as PlayerData } from "../../../shared/src/net/SOS.js";

export class Player {
    id: PlayerData[`id`];
    teamId: PlayerData[`team`];

    name: PlayerData[`name`];
    boost: PlayerData[`boost`];

    stats: Record<`goals` | `assists` | `saves` | `shots` | `demos`, PlayerData[`goals`]>;

    constructor (data: PlayerData) {
        this.id = data.id;
        this.teamId = data.team;

        this.name = data.name;
        this.boost = data.boost;

        this.stats = {
            goals: data.goals,
            assists: data.assists,
            saves: data.saves,
            shots: data.shots,
            demos: data.demos
            // Could add touches here, as of right now don't see a necessity for them.
        };
    }
}
