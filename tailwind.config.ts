/**
 * Tailwind CSS Configuration for Alvi Global Enterprises Website
 * 
 * This configuration defines the custom design system for the Alvi Global Enterprises website,
 * including brand colors, typography, spacing, animations, and component
 * styling. It extends Tailwind's default configuration with Alvi Global Enterprises-specific
 * design tokens and utilities.
 */

import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";

/**
 * Tailwind CSS configuration with Alvi Global Enterprises brand design system
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
      
      // Alvi Global Enterprises brand color palette
      colors: {
        // Malibu (secondary/accent colors)
        malibu: {
          '300': '#4db8ff', /* Light accent color - 65% lightness */
          '400': '#4285f4', /* Accent hover state - 52% lightness */
        },
        // Resolution Blue (primary brand color)
        'resolution-blue': {
          '600': '#0050ff', /* Primary brand color */
          '700': '#0033a6', /* Primary hover state - 42% lightness */
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
        // Multicolored icon system
        'icon-purple': "hsl(var(--icon-purple))",
        'icon-blue': "hsl(var(--icon-blue))",
        'icon-green': "hsl(var(--icon-green))",
        'icon-indigo': "hsl(var(--icon-indigo))",
        'icon-red': "hsl(var(--icon-red))",
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
      
      // Custom font size scale - Golden Ratio progression for mathematical harmony
      fontSize: {
        'xs': 'var(--font-size-xs)',     // 0.75rem (12px)
        'sm': 'var(--font-size-sm)',     // 0.875rem (14px)
        'base': 'var(--font-size-base)', // 1rem (16px)
        'lg': 'var(--font-size-lg)',     // 1.125rem (18px)
        'xl': 'var(--font-size-xl)',     // 1.25rem (20px)
        '2xl': 'var(--font-size-2xl)',   // 1.5rem (24px)
        '3xl': 'var(--font-size-3xl)',   // 1.875rem (30px)
        '4xl': 'var(--font-size-4xl)',   // 2.5rem (40px)
        '5xl': 'var(--font-size-5xl)',   // 3.75rem (60px)
        '6xl': 'var(--font-size-6xl)',   // 6rem (96px)
      },
      
      // Fluid Typography - Responsive scaling
      fluidFontSize: {
        'xs': 'var(--fluid-text-xs)',
        'sm': 'var(--fluid-text-sm)',
        'base': 'var(--fluid-text-base)',
        'lg': 'var(--fluid-text-lg)',
        'xl': 'var(--fluid-text-xl)',
        '2xl': 'var(--fluid-text-2xl)',
        '3xl': 'var(--fluid-text-3xl)',
        '4xl': 'var(--fluid-text-4xl)',
        '5xl': 'var(--fluid-text-5xl)',
        '6xl': 'var(--fluid-text-6xl)',
      },
      
      // Custom spacing scale - Golden Ratio progression for mathematical harmony
      spacing: {
        'xs': 'var(--space-xs)',     // 0.5rem (8px)
        'sm': 'var(--space-sm)',     // 0.75rem (12px)
        'md': 'var(--space-md)',     // 1rem (16px)
        'lg': 'var(--space-lg)',     // 1.25rem (20px)
        'xl': 'var(--space-xl)',     // 1.5rem (24px)
        '2xl': 'var(--space-2xl)',   // 2rem (32px)
        '3xl': 'var(--space-3xl)',   // 2.5rem (40px)
        '4xl': 'var(--space-4xl)',   // 3.75rem (60px)
      },
      
      // Custom border radius
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      
      // Mathematically optimized easing functions
      transitionTimingFunction: {
        'natural': 'var(--ease-natural)',
        'decelerate': 'var(--ease-decelerate)',
        'accelerate': 'var(--ease-accelerate)',
        'sharp': 'var(--ease-sharp)',
        'gentle': 'var(--ease-gentle)',
        'bounce': 'var(--ease-bounce)',
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
            // Alvi Global Enterprises brand animations - Mathematically optimized
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
                transform: "translateY(15px)"
              },
              "100%": {
                opacity: "1",
                transform: "translateY(0)"
              }
            },
            "scale-in": {
              "0%": {
                opacity: "0",
                transform: "scale(0.9)"
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
            // Floating blob animations
            "float-slow": {
              "0%, 100%": {
                transform: "translateY(0px) translateX(0px) scale(1)"
              },
              "25%": {
                transform: "translateY(-20px) translateX(10px) scale(1.05)"
              },
              "50%": {
                transform: "translateY(-10px) translateX(-15px) scale(0.95)"
              },
              "75%": {
                transform: "translateY(-30px) translateX(5px) scale(1.02)"
              }
            },
            "float-medium": {
              "0%, 100%": {
                transform: "translateY(0px) translateX(0px) scale(1)"
              },
              "33%": {
                transform: "translateY(-25px) translateX(-20px) scale(1.08)"
              },
              "66%": {
                transform: "translateY(-15px) translateX(25px) scale(0.92)"
              }
            },
            "float-fast": {
              "0%, 100%": {
                transform: "translateY(0px) translateX(0px) scale(1)"
              },
              "20%": {
                transform: "translateY(-15px) translateX(12px) scale(1.03)"
              },
              "40%": {
                transform: "translateY(-35px) translateX(-8px) scale(0.97)"
              },
              "60%": {
                transform: "translateY(-20px) translateX(18px) scale(1.06)"
              },
              "80%": {
                transform: "translateY(-10px) translateX(-12px) scale(0.94)"
              }
            },
            // Additional animations for SectionTemplate
            "slide-left": {
              "0%": {
                opacity: "0",
                transform: "translateX(-30px)"
              },
              "100%": {
                opacity: "1",
                transform: "translateX(0)"
              }
            },
            "slide-right": {
              "0%": {
                opacity: "0",
                transform: "translateX(30px)"
              },
              "100%": {
                opacity: "1",
                transform: "translateX(0)"
              }
            },
          },
      
          // Animation utilities - Mathematically optimized timing and easing
          animation: {
            "accordion-down": "accordion-down 0.2s var(--ease-natural)",
            "accordion-up": "accordion-up 0.2s var(--ease-natural)",
            "fade-in": "fade-in 0.5s var(--ease-decelerate)",        // Natural deceleration
            "slide-up": "slide-up 0.4s var(--ease-gentle)",          // Gentle motion
            "scale-in": "scale-in 0.3s var(--ease-bounce)",          // Playful bounce
            "pulse-soft": "pulse-soft 2s var(--ease-gentle) infinite",
            // Floating blob animations - Natural motion
            "float-slow": "float-slow 6s var(--ease-gentle) infinite",
            "float-medium": "float-medium 4s var(--ease-gentle) infinite",
            "float-fast": "float-fast 3s var(--ease-gentle) infinite",
            // Additional animations for SectionTemplate
            "slide-left": "slide-left 0.5s var(--ease-gentle)",
            "slide-right": "slide-right 0.5s var(--ease-gentle)",
          },
    },
  },
  
  // Plugins
  plugins: [tailwindAnimate], // Animation utilities plugin
} satisfies Config;
