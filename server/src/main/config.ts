import { store } from "./store";

export const config = {
    titleText: store.get(`titleText`),
    seriesText: store.get(`seriesText`),
    seriesLimit: store.get(`seriesLimit`),
    enableOBSTransitions: store.get(`enableOBSTransitions`),
    customTeamNames: [
        store.get(`customTeamName0`),
        store.get(`customTeamName1`)
    ],

    server: {
        host: `0.0.0.0`,
        port: 49522
    },

    sos: {
        host: `127.0.0.1`,
        port: 49122
    }
} satisfies Config as Config;

interface ServerConfig {
    host: string
    port: number
}

interface SOSConfig {
    host: string
    port: number

    options?: {
        // Delay between receiving events and propagating them.
        delay: number
    }
}

export interface Config {
    titleText: string
    seriesText: string
    seriesLimit: number
    enableOBSTransitions: boolean
    customTeamNames: string[]

    server: ServerConfig
    sos: SOSConfig
}
