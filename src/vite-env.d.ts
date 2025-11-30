/// <reference types="vite/client" />

interface ImportMetaEnv {
  // App Configuration
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_DESCRIPTION: string;

  // API Configuration
  readonly VITE_API_BASE_URL: string;
  readonly VITE_WEATHER_API_KEY?: string;
  readonly VITE_OPENAI_API_KEY?: string;

  // Feature Flags
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_DEBUG: string;
  readonly VITE_ENABLE_PWA: string;

  // External Services
  readonly VITE_SENTRY_DSN?: string;
  readonly VITE_GA_TRACKING_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
