import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import packageFile from './package.json';
import { ssr } from 'vite-plugin-ssr/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.VERSION': JSON.stringify(packageFile.version)
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    eslint({ include: 'src' }),
    svgr(),
    ssr({ prerender: true })
  ],
  server: {
    port: 3000,
  },
  base: '/debateTimer',
});
