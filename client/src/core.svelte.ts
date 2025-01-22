import { Game } from "./modules/Game.svelte";

export const core = $state({
    titleText: ``,
    seriesText: ``,
    seriesLimit: 0,

    customTeamNames: [``, ``],

    wsServer: {
        ip: `127.0.0.1`,
        port: 8080
    },

    game: new Game()
} satisfies Core as Core);

export interface Core {
    titleText: string
    seriesText: string
    seriesLimit: number

    customTeamNames: string[]

    wsServer: {
        ip: string
        port: number
        ssl?: boolean
    }

    game: Game
}

export type Unpacked<T> = T extends Array<infer U> ? U : T;
