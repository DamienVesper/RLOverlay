import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig(({ mode }) => {
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
