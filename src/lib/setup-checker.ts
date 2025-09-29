/**
 * Setup Checker - Validates environment configuration
 * 
 * This utility checks if all required environment variables are properly configured
 * and provides helpful feedback to users about what needs to be set up.
 */

export interface SetupStatus {
  isConfigured: boolean;
  missingVariables: string[];
  warnings: string[];
  recommendations: string[];
}

/**
 * Check if the application is properly configured
 */
export function checkSetupStatus(): SetupStatus {
  const missingVariables: string[] = [];
  const warnings: string[] = [];
  const recommendations: string[] = [];

  // Check Supabase configuration
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    missingVariables.push('VITE_SUPABASE_URL');
  } else if (!supabaseUrl.includes('supabase.co')) {
    warnings.push('VITE_SUPABASE_URL appears to be invalid (should contain "supabase.co")');
  }

  if (!supabaseAnonKey) {
    missingVariables.push('VITE_SUPABASE_ANON_KEY');
  } else if (!supabaseAnonKey.startsWith('eyJ')) {
    warnings.push('VITE_SUPABASE_ANON_KEY appears to be invalid (should start with "eyJ")');
  }

  // Check Gemini API configuration
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!geminiApiKey) {
    missingVariables.push('VITE_GEMINI_API_KEY');
  } else if (!geminiApiKey.startsWith('AIzaSy')) {
    warnings.push('VITE_GEMINI_API_KEY appears to be invalid (should start with "AIzaSy")');
  }

  // Generate recommendations
  if (missingVariables.length > 0) {
    recommendations.push('Create a .env.local file in your project root');
    recommendations.push('Add the missing environment variables to .env.local');
    recommendations.push('Restart your development server after adding variables');
  }

  if (missingVariables.includes('VITE_SUPABASE_URL') || missingVariables.includes('VITE_SUPABASE_ANON_KEY')) {
    recommendations.push('Set up your Supabase project and get credentials from the dashboard');
    recommendations.push('Run the database setup scripts in Supabase SQL Editor');
  }

  if (missingVariables.includes('VITE_GEMINI_API_KEY')) {
    recommendations.push('Get your Gemini API key from Google AI Studio');
    recommendations.push('AI features will not work without this key');
  }

  return {
    isConfigured: missingVariables.length === 0,
    missingVariables,
    warnings,
    recommendations
  };
}

/**
 * Log setup status to console (development only)
 */
export function logSetupStatus(): void {
  if (!import.meta.env.DEV) return;

  const status = checkSetupStatus();

  if (status.isConfigured) {
    console.log('✅ Application is properly configured');
    return;
  }

  console.group('⚠️ Application Setup Required');
  
  if (status.missingVariables.length > 0) {
    console.warn('Missing environment variables:', status.missingVariables);
  }
  
  if (status.warnings.length > 0) {
    console.warn('Configuration warnings:', status.warnings);
  }
  
  if (status.recommendations.length > 0) {
    console.info('Recommendations:');
    status.recommendations.forEach((rec, index) => {
      console.info(`${index + 1}. ${rec}`);
    });
  }
  
  console.groupEnd();
}

/**
 * Check if database is properly set up
 */
export function isDatabaseConfigured(): boolean {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  return !!(supabaseUrl && supabaseAnonKey && 
           supabaseUrl.includes('supabase.co') && 
           supabaseAnonKey.startsWith('eyJ'));
}

/**
 * Check if AI features are properly set up
 */
export function isAIConfigured(): boolean {
  const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  return !!(geminiApiKey && geminiApiKey.startsWith('AIzaSy'));
}
