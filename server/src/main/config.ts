export const config = {
    eventText: `RLCS`,
    seriesText: `GAME {{game}} | BEST OF {{bo}}`,
    seriesLimit: 0,
    customTeamNames: [``, ``],

    server: {
        host: `0.0.0.0`,
        port: 8080
    },

    sos: {
        host: `127.0.0.1`,
        port: 49122
    }
} satisfies Config as Config;

interface ServerConfig {
    host: string
    port: number

    /**
     * SSL options. Not used if running locally, or behind NGINX.
     */
    ssl?: {
        keyFile: string
        certFile: string
    }
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
    eventText: string
    seriesText: string
    seriesLimit: number
    customTeamNames: string[]

    server: ServerConfig
    sos: SOSConfig
}
