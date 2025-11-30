/**
 * Shared TypeScript types and interfaces
 */

// ============================================================================
// Wardrobe & Clothing Types
// ============================================================================

export type ClothingCategory =
  | 'tops'
  | 'bottoms'
  | 'dresses'
  | 'outerwear'
  | 'shoes'
  | 'accessories';

export type ClothingColor =
  | 'black'
  | 'white'
  | 'gray'
  | 'navy'
  | 'brown'
  | 'beige'
  | 'red'
  | 'pink'
  | 'purple'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'multicolor';

export type Season = 'spring' | 'summer' | 'fall' | 'winter' | 'all';

export type Occasion =
  | 'casual'
  | 'work'
  | 'formal'
  | 'party'
  | 'athletic'
  | 'date'
  | 'travel';

export interface ClothingItem {
  id: string;
  name: string;
  category: ClothingCategory;
  color: ClothingColor;
  season: Season[];
  occasion: Occasion[];
  imageUrl?: string;
  brand?: string;
  purchaseDate?: string;
  lastWorn?: string;
  timesWorn: number;
  favorite: boolean;
  tags?: string[];
}

// ============================================================================
// Outfit Types
// ============================================================================

export interface Outfit {
  id: string;
  name: string;
  items: ClothingItem[];
  occasion: Occasion;
  season: Season;
  rating?: number;
  notes?: string;
  createdAt: string;
  lastWorn?: string;
  imageUrl?: string;
}

export interface OutfitSchedule {
  id: string;
  date: string;
  outfit: Outfit;
  weather?: WeatherData;
}

// ============================================================================
// Weather Types
// ============================================================================

export interface WeatherData {
  temperature: number;
  feelsLike: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  location: string;
}

export interface WeatherForecast {
  date: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
}

// ============================================================================
// User & Profile Types
// ============================================================================

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  favoriteColors: ClothingColor[];
  favoriteStyles: Occasion[];
  preferredSeasons: Season[];
  sustainabilityMode: boolean;
  notificationsEnabled: boolean;
}

export interface UserStats {
  totalItems: number;
  totalOutfits: number;
  mostWornItem?: ClothingItem;
  favoriteCategory?: ClothingCategory;
  wardrobeValue?: number;
}

// ============================================================================
// AI Recommendation Types
// ============================================================================

export interface OutfitRecommendation {
  outfit: Outfit;
  score: number;
  reason: string;
  weatherAppropriate: boolean;
  occasionMatch: boolean;
}

export interface StyleSuggestion {
  title: string;
  description: string;
  items: ClothingItem[];
  inspiration?: string;
}

// ============================================================================
// Analytics Types
// ============================================================================

export interface WardrobeAnalytics {
  categoryDistribution: Record<ClothingCategory, number>;
  colorDistribution: Record<ClothingColor, number>;
  seasonalCoverage: Record<Season, number>;
  wearFrequency: {
    item: ClothingItem;
    count: number;
  }[];
  underutilizedItems: ClothingItem[];
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============================================================================
// UI State Types
// ============================================================================

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  status: LoadingState;
  error: string | null;
}

export type TabType = 'home' | 'wardrobe' | 'builder' | 'calendar' | 'profile';

export interface FilterOptions {
  categories?: ClothingCategory[];
  colors?: ClothingColor[];
  seasons?: Season[];
  occasions?: Occasion[];
  searchQuery?: string;
}

export interface SortOptions {
  field: 'name' | 'date' | 'timesWorn' | 'color' | 'category';
  order: 'asc' | 'desc';
}
