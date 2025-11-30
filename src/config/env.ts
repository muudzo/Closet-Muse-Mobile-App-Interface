/**
 * Environment configuration with type safety and validation
 */

interface EnvConfig {
  // App Configuration
  appName: string;
  appVersion: string;
  appDescription: string;

  // API Configuration
  apiBaseUrl: string;
  weatherApiKey?: string;
  openaiApiKey?: string;

  // Feature Flags
  enableAnalytics: boolean;
  enableDebug: boolean;
  enablePWA: boolean;

  // External Services
  sentryDsn?: string;
  gaTrackingId?: string;

  // Environment
  isDevelopment: boolean;
  isProduction: boolean;
}

/**
 * Get environment variable with optional default value
 */
function getEnvVar(key: string, defaultValue?: string): string {
  const value = import.meta.env[key];
  if (value === undefined && defaultValue === undefined) {
    console.warn(`Environment variable ${key} is not defined`);
    return '';
  }
  return value || defaultValue || '';
}

/**
 * Parse boolean environment variable
 */
function parseBooleanEnv(key: string, defaultValue = false): boolean {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  return value === 'true' || value === '1';
}

/**
 * Application environment configuration
 */
export const env: EnvConfig = {
  // App Configuration
  appName: getEnvVar('VITE_APP_NAME', 'Closet Muse'),
  appVersion: getEnvVar('VITE_APP_VERSION', '1.0.0'),
  appDescription: getEnvVar(
    'VITE_APP_DESCRIPTION',
    'AI-Powered Fashion Assistant'
  ),

  // API Configuration
  apiBaseUrl: getEnvVar('VITE_API_BASE_URL', 'http://localhost:3000'),
  weatherApiKey: getEnvVar('VITE_WEATHER_API_KEY'),
  openaiApiKey: getEnvVar('VITE_OPENAI_API_KEY'),

  // Feature Flags
  enableAnalytics: parseBooleanEnv('VITE_ENABLE_ANALYTICS', false),
  enableDebug: parseBooleanEnv('VITE_ENABLE_DEBUG', true),
  enablePWA: parseBooleanEnv('VITE_ENABLE_PWA', true),

  // External Services
  sentryDsn: getEnvVar('VITE_SENTRY_DSN'),
  gaTrackingId: getEnvVar('VITE_GA_TRACKING_ID'),

  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

/**
 * Validate required environment variables
 */
export function validateEnv(): void {
  const requiredVars: Array<keyof EnvConfig> = ['appName', 'appVersion'];

  const missing = requiredVars.filter((key) => !env[key]);

  if (missing.length > 0) {
    console.error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

/**
 * Log environment configuration (only in development)
 */
export function logEnvConfig(): void {
  if (env.isDevelopment && env.enableDebug) {
    console.log('Environment Configuration:', {
      ...env,
      // Mask sensitive data
      weatherApiKey: env.weatherApiKey ? '***' : undefined,
      openaiApiKey: env.openaiApiKey ? '***' : undefined,
      sentryDsn: env.sentryDsn ? '***' : undefined,
    });
  }
}

// Validate on module load
validateEnv();
