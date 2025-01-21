import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { svelte } from "@sveltejs/vite-plugin-svelte";

import { config } from "./src/config";

export default defineConfig(({ mode }) => {
    /**
     * Vite environment variables.
     */
    process.env = {
        ...process.env,
        WS_URL: `${config.wsServer.ssl ? `wss` : `ws`}://${config.wsServer.ip}:${config.wsServer.port}`
    };

    return {
        resolve: {
            dedupe: [`svelte`]
        },

        build: {
            manifest: `manifest.json`,
            chunkSizeWarningLimit: 2000,
            cssMinify: `lightningcss`,
            rollupOptions: {
                output: {
                    entryFileNames: `assets/lib/[hash].js`,
                    assetFileNames: `assets/lib/[hash][extname]`,
                    chunkFileNames: `assets/lib/[hash].js`,
                    manualChunks (id, chunkInfo) {
                        if (id.includes(`node_modules`)) return `vendor`;
                        if (id.includes(`shared`)) return `shared`;
                    }
                }
            }
        },

        server: {
            port: 3000,
            strictPort: true,
            host: `0.0.0.0`
        },

        preview: {
            port: 3000,
            strictPort: true,
            host: `0.0.0.0`
        },

        css: {
            devSourcemap: mode === `development`
        },

        json: {
            stringify: true
        },

        plugins: [
            svelte(),
            ViteImageOptimizer({
                test: /\.(svg)$/i,
                logStats: false
            })
        ]
    };
});
