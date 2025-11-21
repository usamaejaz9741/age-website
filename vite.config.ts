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
    strictPort: true,        // Enforce port 8080 for reliable E2E testing
    open: false,             // Disable auto-open for better test/CI experience
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
    // Use esbuild for faster builds
    minify: 'esbuild',
    // Target modern browsers
    target: 'esnext',
    rollupOptions: {
      output: {
        // Simplified chunk splitting - let Vite handle it automatically
        // This prevents module initialization order issues
        manualChunks: undefined
      }
    }
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
      'react-hook-form',
      'clsx',
      'tailwind-merge'
    ]
  }
}));
