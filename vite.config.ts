import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import path from 'path'; // Tambahkan ini

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
    alias: {
        '@': path.resolve(__dirname, './resources/js'),
        '@components': path.resolve(__dirname, './resources/js/components'),
        '@pages': path.resolve(__dirname, './resources/js/pages'),
        '@layouts': path.resolve(__dirname, './resources/js/layouts'),
        '@fragments': path.resolve(__dirname, './resources/js/fragments'), // Pastikan ini ada
        '@actions': path.resolve(__dirname, './resources/js/actions'),
    },
},
});