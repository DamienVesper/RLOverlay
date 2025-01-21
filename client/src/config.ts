export const config = {
    wsServer: {
        ip: `127.0.0.1`,
        port: 8080
    }
} satisfies Config as Config;

export interface Config {
    wsServer: {
        ip: string
        port: number

        /**
         * SSL options. Not used if running locally, or behind NGINX.
         */
        ssl?: {
            keyFile: string
            certFile: string
        }
    }
}
