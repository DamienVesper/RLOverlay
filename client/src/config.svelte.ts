const urlParams = new URLSearchParams(window.location.search);

export const config = $state({
    titleText: ``,
    seriesText: ``,
    seriesLimit: 0,

    customTeamNames: [``, ``],

    wsServer: {
        ip: urlParams.get(`ip`) || `127.0.0.1`,
        port: Number(urlParams.get(`port`)) || 49522
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
