import { defineConfig } from 'vite';

export default defineConfig({

  optimizeDeps: {
    allowNodeBuiltins: ['gsap']
  }
});
