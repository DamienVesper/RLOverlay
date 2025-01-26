import Store from "electron-store";

export interface StoreType {
    titleText: string
    seriesText: string
    seriesLimit: number
    customTeamName0: string
    customTeamName1: string
}

export const schema = {
    titleText: { type: `string`, default: `RLCS` },
    seriesText: { type: `string`, default: `GAME {{game}} | BEST OF {{bo}}` },
    seriesLimit: { type: `number`, default: 0, minimum: 0, maximum: 9 },
    enableOBSTransitions: { type: `boolean`, default: true },
    customTeamName0: { type: `string`, default: `` },
    customTeamName1: { type: `string`, default: `` }
};

export const store = new Store<StoreType>({ schema }) as any;
