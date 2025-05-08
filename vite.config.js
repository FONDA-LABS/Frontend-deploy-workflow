import { defineConfig } from 'vituum'
import twig from '@vituum/twig';
import FastGlob from "fast-glob";

import cssnano from 'cssnano';

// PostCSS plugins
export default defineConfig({
    integrations: [
        twig()
    ],
    templates: {
        format: 'twig',
    },
    output: 'dist',
    input: FastGlob.sync([
        'src/views/**/*.vituum.twig.html',
        'src/styles/**/!(_)*.css',
        'src/scripts/**/*.js',
    ]),
    vite: {
        css: {
            postcss: {
                plugins: [
                    cssnano(),
                ],
            },
        },
        build: {
            rollupOptions: {
                manifest: null,
                emptyOutDir: true,
                output: {
                    assetFileNames: (assetInfo) => {
                        return `assets/[name].[ext]`;
                    },
                    chunkFileNames: (chunkInfo) => {
                        return `assets/[name].js`;
                    },
                    entryFileNames: (entryInfo) => {
                        return `assets/[name].js`;
                    },
                },
            }
        }
    }
})