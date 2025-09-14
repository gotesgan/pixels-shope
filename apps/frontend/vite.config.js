import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Option 1: Allow all hosts (what you currently have)
    allowedHosts: ['.localtest.me'],

    // Option 2: If 'all' doesn't work, try this regex pattern for .localtest.me domains
    // allowedHosts: [/.+\.localtest\.me$/],

    // Option 3: Explicitly list the domains you need
    // allowedHosts: [
    //   'souled-store.localtest.me',
    //   'api.localtest.me',
    //   'admin.localtest.me'
    // ],

    // Additional server options that might help
    host: true, // Allow external connections
    port: 5174, // Default Vite port
  },
});
