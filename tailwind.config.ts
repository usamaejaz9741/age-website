/**
 * Tailwind CSS Configuration for AGE Website
 * 
 * This configuration defines the custom design system for the AGE website,
 * including brand colors, typography, spacing, animations, and component
 * styling. It extends Tailwind's default configuration with AGE-specific
 * design tokens and utilities.
 */

import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

/**
 * Tailwind CSS configuration with AGE brand design system
 * 
 * Features:
 * - Custom color palette (Resolution Blue, Malibu)
 * - Brand typography (Kufam font family)
 * - Custom spacing and sizing scales
 * - Brand-specific animations and effects
 * - shadcn/ui component integration
 */
export default {
  // Dark mode configuration (class-based)
  darkMode: ["class"],
  
  // Content paths for Tailwind to scan for classes
  content: [
    "./pages/**/*.{ts,tsx}", 
    "./components/**/*.{ts,tsx}", 
    "./app/**/*.{ts,tsx}", 
    "./src/**/*.{ts,tsx}"
  ],
  
  // CSS prefix (none for this project)
  prefix: "",
  
  theme: {
    // Container configuration for responsive layouts
    container: {
      center: true,           // Center container horizontally
      padding: "2rem",        // Default padding
      screens: {
        "2xl": "1400px",      // Max width for 2xl screens
      },
    },
    
    extend: {
      // Custom font families
      fontFamily: {
        heading: ["Kufam", "sans-serif"], // Brand heading font
      },
      
      // AGE brand color palette
      colors: {
        // Malibu (secondary/accent colors)
        malibu: {
          '300': '#60cdff', /* Light accent color */
          '400': '#33c1fd', /* Accent hover state */
        },
        // Resolution Blue (primary brand color)
        'resolution-blue': {
          '600': '#0050ff', /* Primary brand color */
          '700': '#0051ff', /* Primary hover state */
        },
        // Base colors
        black: '#000000',
        white: '#ffffff',
        // Neutral grays with opacity variants
        neutral: {
          DEFAULT: '#000000',
          75: 'rgb(0 0 0 / 0.75)',  // 75% opacity black
          50: 'rgb(0 0 0 / 0.5)',   // 50% opacity black
          25: 'rgb(0 0 0 / 0.25)',  // 25% opacity black
          10: 'rgb(0 0 0 / 0.1)',   // 10% opacity black
          5: 'rgb(0 0 0 / 0.05)',   // 5% opacity black
        },
        // shadcn/ui semantic colors (using CSS variables)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#ffffff",
        foreground: "#000000",
        // Primary color system
        primary: {
          DEFAULT: "hsl(var(--resolution-blue-600))",
          hover: "hsl(var(--resolution-blue-700))",
          foreground: "#ffffff",
        },
        // Secondary color system
        secondary: {
          DEFAULT: "hsl(var(--malibu-300))",
          hover: "hsl(var(--malibu-400))",
          foreground: "#000000",
        },
        // Status colors
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        // Muted colors for subtle elements
        muted: {
          DEFAULT: "hsl(var(--muted) / 0.1)",
          foreground: "hsl(var(--muted-foreground))",
          hover: "hsl(var(--muted) / 0.2)",
        },
        // Accent colors
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          muted: "hsl(var(--accent) / 0.1)",
        },
        // Popover colors
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        // Card colors
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Sidebar colors (for future use)
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      
      // Custom background images
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',     // Hero section gradient
        'gradient-card': 'var(--gradient-card)',     // Card gradient
      },
      
      // Custom shadow system
      boxShadow: {
        'soft': 'var(--shadow-soft)',       // Subtle shadow for cards
        'medium': 'var(--shadow-medium)',   // Medium shadow for modals
        'strong': 'var(--shadow-strong)',   // Strong shadow for emphasis
      },
      
      // Custom font size scale
      fontSize: {
        'xs': 'var(--font-size-xs)',
        'sm': 'var(--font-size-sm)',
        'base': 'var(--font-size-base)',
        'lg': 'var(--font-size-lg)',
        'xl': 'var(--font-size-xl)',
        '2xl': 'var(--font-size-2xl)',
        '3xl': 'var(--font-size-3xl)',
        '4xl': 'var(--font-size-4xl)',
        '5xl': 'var(--font-size-5xl)',
        '6xl': 'var(--font-size-6xl)',
      },
      
      // Custom spacing scale
      spacing: {
        'xs': 'var(--space-xs)',
        'sm': 'var(--space-sm)',
        'md': 'var(--space-md)',
        'lg': 'var(--space-lg)',
        'xl': 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
        '3xl': 'var(--space-3xl)',
        '4xl': 'var(--space-4xl)',
      },
      
      // Custom border radius
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      
      // Custom keyframe animations
      keyframes: {
        // Accordion animations (for shadcn/ui components)
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // AGE brand animations
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "slide-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "scale-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)"
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)"
          }
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" }
        },
      },
      
      // Animation utilities
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
      },
    },
  },
  
  // Plugins
  plugins: [tailwindAnimate], // Animation utilities plugin
} satisfies Config;
