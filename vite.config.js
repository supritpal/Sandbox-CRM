import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { handleApiRequest } from './server/backend.js';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'sandbox-crm-api-server',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url && req.url.startsWith('/api')) {
            await handleApiRequest(req, res);
            return;
          }
          next();
        });
      }
    }
  ],
  server: {
    port: 3000,
    host: true
  }
});
