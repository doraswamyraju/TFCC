import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-motion': ['motion/react'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    // Enable minification (esbuild is faster, terser requires plugin)
    minify: 'esbuild',
    // Optimize asset handling
    assetsInlineLimit: 4096, // Inline small assets
    chunkSizeWarningLimit: 1000,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'motion/react', 'lucide-react'],
  },
})
