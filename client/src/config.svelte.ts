export const config = $state({
    titleText: ``,
    seriesText: ``,
    seriesLimit: 0,

    customTeamNames: [``, ``],

    wsServer: {
        ip: `127.0.0.1`,
        port: 8080
    }
} satisfies Config as Config);

export interface Config {
    titleText: string
    seriesText: string
    seriesLimit: number

    customTeamNames: string[]

    wsServer: {
        ip: string
        port: number
        ssl?: boolean
    }
}
