import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { sveltekit } from "@sveltejs/kit/vite";

export default defineConfig(({ mode }) => {
    /**
     * Vite environment variables.
     */
    process.env = {
        ...process.env,
    };

    return {
        build: {
            chunkSizeWarningLimit: 2000,
            cssMinify: `lightningcss`,
            rollupOptions: {
                output: {
                    manualChunks(id, chunkInfo) {
                        if (id.includes("node_modules")) return "vendor";
                        if (id.includes("shared")) return "shared";
                    }
                }
            }
        },

        server: {
            port: 3000,
            strictPort: true,
            host: "0.0.0.0"
        },

        preview: {
            port: 3000,
            strictPort: true,
            host: "0.0.0.0"
        },

        css: {
            devSourcemap: mode === "development"
        },

        json: {
            stringify: true
        },

        plugins: [
            sveltekit(),
            ViteImageOptimizer({
                test: /\.(svg)$/i,
                logStats: false
            })
        ]
    };
});
