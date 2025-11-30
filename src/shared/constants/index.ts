/**
 * Application-wide constants
 */

import type {
  ClothingCategory,
  ClothingColor,
  Season,
  Occasion,
} from '../types';

// ============================================================================
// App Metadata
// ============================================================================

export const APP_NAME = 'Closet Muse';
export const APP_TAGLINE = 'AI-Powered Fashion Assistant';
export const APP_VERSION = '1.0.0';

// ============================================================================
// Clothing Categories
// ============================================================================

export const CLOTHING_CATEGORIES: ClothingCategory[] = [
  'tops',
  'bottoms',
  'dresses',
  'outerwear',
  'shoes',
  'accessories',
];

export const CATEGORY_LABELS: Record<ClothingCategory, string> = {
  tops: 'Tops',
  bottoms: 'Bottoms',
  dresses: 'Dresses',
  outerwear: 'Outerwear',
  shoes: 'Shoes',
  accessories: 'Accessories',
};

export const CATEGORY_ICONS: Record<ClothingCategory, string> = {
  tops: '👕',
  bottoms: '👖',
  dresses: '👗',
  outerwear: '🧥',
  shoes: '👟',
  accessories: '👜',
};

// ============================================================================
// Colors
// ============================================================================

export const CLOTHING_COLORS: ClothingColor[] = [
  'black',
  'white',
  'gray',
  'navy',
  'brown',
  'beige',
  'red',
  'pink',
  'purple',
  'blue',
  'green',
  'yellow',
  'orange',
  'multicolor',
];

export const COLOR_HEX_MAP: Record<ClothingColor, string> = {
  black: '#000000',
  white: '#FFFFFF',
  gray: '#808080',
  navy: '#000080',
  brown: '#8B4513',
  beige: '#F5F5DC',
  red: '#FF0000',
  pink: '#FFC0CB',
  purple: '#800080',
  blue: '#0000FF',
  green: '#008000',
  yellow: '#FFFF00',
  orange: '#FFA500',
  multicolor: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
};

// ============================================================================
// Seasons
// ============================================================================

export const SEASONS: Season[] = ['spring', 'summer', 'fall', 'winter', 'all'];

export const SEASON_LABELS: Record<Season, string> = {
  spring: 'Spring',
  summer: 'Summer',
  fall: 'Fall',
  winter: 'Winter',
  all: 'All Seasons',
};

export const SEASON_ICONS: Record<Season, string> = {
  spring: '🌸',
  summer: '☀️',
  fall: '🍂',
  winter: '❄️',
  all: '🌍',
};

// ============================================================================
// Occasions
// ============================================================================

export const OCCASIONS: Occasion[] = [
  'casual',
  'work',
  'formal',
  'party',
  'athletic',
  'date',
  'travel',
];

export const OCCASION_LABELS: Record<Occasion, string> = {
  casual: 'Casual',
  work: 'Work',
  formal: 'Formal',
  party: 'Party',
  athletic: 'Athletic',
  date: 'Date Night',
  travel: 'Travel',
};

export const OCCASION_ICONS: Record<Occasion, string> = {
  casual: '👕',
  work: '💼',
  formal: '🎩',
  party: '🎉',
  athletic: '⚽',
  date: '💕',
  travel: '✈️',
};

// ============================================================================
// Weather
// ============================================================================

export const WEATHER_ICONS: Record<string, string> = {
  clear: '☀️',
  clouds: '☁️',
  rain: '🌧️',
  snow: '❄️',
  thunderstorm: '⛈️',
  drizzle: '🌦️',
  mist: '🌫️',
  fog: '🌫️',
};

export const TEMPERATURE_RANGES = {
  cold: { max: 50, label: 'Cold', icon: '🥶' },
  cool: { min: 50, max: 65, label: 'Cool', icon: '😊' },
  mild: { min: 65, max: 75, label: 'Mild', icon: '😌' },
  warm: { min: 75, max: 85, label: 'Warm', icon: '😎' },
  hot: { min: 85, label: 'Hot', icon: '🥵' },
};

// ============================================================================
// UI Constants
// ============================================================================

export const TABS = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'wardrobe', label: 'Wardrobe', icon: '👔' },
  { id: 'builder', label: 'Builder', icon: '✨' },
  { id: 'calendar', label: 'Calendar', icon: '📅' },
  { id: 'profile', label: 'Profile', icon: '👤' },
] as const;

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const;

// ============================================================================
// Storage Keys
// ============================================================================

export const STORAGE_KEYS = {
  WARDROBE_ITEMS: 'closet_muse_wardrobe',
  OUTFITS: 'closet_muse_outfits',
  USER_PROFILE: 'closet_muse_profile',
  PREFERENCES: 'closet_muse_preferences',
  OUTFIT_SCHEDULE: 'closet_muse_schedule',
  THEME: 'closet_muse_theme',
  ONBOARDING_COMPLETE: 'closet_muse_onboarding',
} as const;

// ============================================================================
// API Endpoints
// ============================================================================

export const API_ENDPOINTS = {
  WEATHER: '/api/weather',
  RECOMMENDATIONS: '/api/recommendations',
  OUTFITS: '/api/outfits',
  WARDROBE: '/api/wardrobe',
} as const;

// ============================================================================
// Limits & Validation
// ============================================================================

export const LIMITS = {
  MAX_OUTFIT_ITEMS: 10,
  MAX_WARDROBE_ITEMS: 1000,
  MAX_IMAGE_SIZE_MB: 5,
  MAX_NAME_LENGTH: 100,
  MAX_DESCRIPTION_LENGTH: 500,
} as const;

export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  MAX_LENGTH: (max: number) => `Maximum ${max} characters allowed`,
  MIN_LENGTH: (min: number) => `Minimum ${min} characters required`,
  FILE_TOO_LARGE: (max: number) => `File size must be less than ${max}MB`,
} as const;
