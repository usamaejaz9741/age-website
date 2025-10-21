/**
 * Vite Configuration for Alvi Global Enterprises Website
 * 
 * This configuration file sets up the build tooling for the Alvi Global Enterprises website,
 * including development server settings, build optimizations, and plugin
 * configurations for React, TypeScript, and component tagging.
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

/**
 * Vite configuration for the Alvi Global Enterprises website
 * 
 * Configures:
 * - Development server settings
 * - React with SWC for fast compilation
 * - Path aliases for clean imports
 * - Build optimizations and chunk splitting
 * - Component tagging for development
 */
export default defineConfig(({ mode }) => ({
  // Development server configuration
  server: {
    host: "localhost",        // Server hostname
    port: 8080,              // Server port
    strictPort: false,       // Allow fallback to other ports if 8080 is busy
    open: true,              // Automatically open browser on start
  },
  
  // Plugin configuration
  plugins: [
    // React plugin with SWC for fast compilation
    react(),
    // Component tagger for development (Lovable integration)
    mode === "development" && componentTagger()
  ].filter(Boolean), // Remove falsy values from plugins array
  
  // Module resolution configuration
  resolve: {
    alias: {
      // Alias for clean imports (e.g., "@/components/Header" instead of "../../components/Header")
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
  // Build configuration
  build: {
    // Generate source maps for debugging
    sourcemap: mode !== 'production',
    // Enable minification optimizations
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
        pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : []
      },
      format: {
        comments: false
      }
    },
    rollupOptions: {
      output: {
        // Optimized manual chunk splitting with dynamic imports
        manualChunks: (id) => {
          // Radix UI - automatically split by usage
          if (id.includes('@radix-ui')) {
            return 'vendor-radix';
          }
          // Core React
          if (id.includes('react') || id.includes('react-dom')) {
            return 'vendor-react';
          }
          // Router
          if (id.includes('react-router')) {
            return 'vendor-router';
          }
          // Charts (lazy loaded on AI Growth Score page)
          if (id.includes('recharts')) {
            return 'vendor-charts';
          }
          // Data layer
          if (id.includes('supabase') || id.includes('react-query')) {
            return 'vendor-data';
          }
          // Form libraries
          if (id.includes('react-hook-form') || id.includes('@hookform')) {
            return 'vendor-forms';
          }
          // DOMPurify and security
          if (id.includes('dompurify')) {
            return 'vendor-security';
          }
          // Utility libraries
          if (id.includes('node_modules') && !id.includes('@radix-ui')) {
            return 'vendor-utils';
          }
        }
      }
    },
    // Enable chunk size warnings
    chunkSizeWarningLimit: 500
  },
  
  // Dependency optimization
  optimizeDeps: {
    // Pre-bundle these dependencies for faster dev server startup
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      '@tanstack/react-query',
      '@supabase/supabase-js',
      '@google/generative-ai',
      'react-hook-form',
      'clsx',
      'tailwind-merge'
    ]
  }
}));
