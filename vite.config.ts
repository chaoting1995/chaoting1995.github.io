import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import packageFile from './package.json';
import vitePrerender from 'vite-plugin-prerender';
import path from 'path';

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
    vitePrerender({
      // Required - The path to the vite-outputted app to prerender.
      staticDir: path.join(__dirname, 'dist'),
      // Required - Routes to render.
      routes: ['/', '/listenings', '/listening', '/topicCreator'],
    }),
  ],
  server: {
    port: 3000,
  },
  base: '/debateTimer',
});
