import { Game } from "./modules/Game.svelte";

export const core = $state({
    game: new Game()
} satisfies Config as Config);

export interface Config {
    game: Game
}

export type Unpacked<T> = T extends Array<infer U> ? U : T;
