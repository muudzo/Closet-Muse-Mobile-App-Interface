import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Types
export interface WardrobeItem {
  id: string;
  name: string;
  category:
    | 'tops'
    | 'bottoms'
    | 'dresses'
    | 'shoes'
    | 'accessories'
    | 'perfumes';
  color: string;
  brand: string;
  style: 'casual' | 'elegant' | 'professional' | 'sporty';
  image?: string;
  favorite: boolean;
  timesWorn: number;
  lastWorn?: Date;
  notes?: string;
}

export interface Outfit {
  id: string;
  name?: string;
  date: Date;
  occasion: string;
  items: {
    top?: WardrobeItem;
    bottom?: WardrobeItem;
    dress?: WardrobeItem;
    shoes?: WardrobeItem;
    accessory?: WardrobeItem;
    perfume?: WardrobeItem;
  };
  rating?: number;
  notes?: string;
  planned: boolean;
  confidence: number;
}

export interface WeatherData {
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'windy';
  humidity: number;
  description: string;
}

interface AppState {
  wardrobe: WardrobeItem[];
  outfits: Outfit[];
  currentWeather: WeatherData;
  user: {
    name: string;
    level: number;
    achievements: string[];
    preferences: {
      favoriteColors: string[];
      preferredStyles: string[];
      occasions: string[];
    };
  };
}

type AppAction =
  | { type: 'ADD_ITEM'; payload: WardrobeItem }
  | { type: 'UPDATE_ITEM'; payload: WardrobeItem }
  | { type: 'DELETE_ITEM'; payload: string }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'ADD_OUTFIT'; payload: Outfit }
  | { type: 'UPDATE_OUTFIT'; payload: Outfit }
  | { type: 'DELETE_OUTFIT'; payload: string }
  | { type: 'RATE_OUTFIT'; payload: { id: string; rating: number } }
  | { type: 'UPDATE_WEATHER'; payload: WeatherData }
  | { type: 'LOAD_DATA'; payload: AppState };

const initialState: AppState = {
  wardrobe: [],
  outfits: [],
  currentWeather: {
    temp: 72,
    condition: 'sunny',
    humidity: 45,
    description: 'Perfect day for fashion!',
  },
  user: {
    name: '',
    level: 1,
    achievements: [],
    preferences: {
      favoriteColors: [],
      preferredStyles: [],
      occasions: [],
    },
  },
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        wardrobe: [...state.wardrobe, action.payload],
      };

    case 'UPDATE_ITEM':
      return {
        ...state,
        wardrobe: state.wardrobe.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };

    case 'DELETE_ITEM':
      return {
        ...state,
        wardrobe: state.wardrobe.filter((item) => item.id !== action.payload),
      };

    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        wardrobe: state.wardrobe.map((item) =>
          item.id === action.payload
            ? { ...item, favorite: !item.favorite }
            : item
        ),
      };

    case 'ADD_OUTFIT':
      return {
        ...state,
        outfits: [...state.outfits, action.payload],
      };

    case 'UPDATE_OUTFIT':
      return {
        ...state,
        outfits: state.outfits.map((outfit) =>
          outfit.id === action.payload.id ? action.payload : outfit
        ),
      };

    case 'DELETE_OUTFIT':
      return {
        ...state,
        outfits: state.outfits.filter((outfit) => outfit.id !== action.payload),
      };

    case 'RATE_OUTFIT':
      return {
        ...state,
        outfits: state.outfits.map((outfit) =>
          outfit.id === action.payload.id
            ? { ...outfit, rating: action.payload.rating }
            : outfit
        ),
      };

    case 'UPDATE_WEATHER':
      return {
        ...state,
        currentWeather: action.payload,
      };

    case 'LOAD_DATA':
      return action.payload;

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('closet-muse-data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // Convert date strings back to Date objects
        parsedData.outfits = parsedData.outfits.map((outfit: any) => ({
          ...outfit,
          date: new Date(outfit.date),
          items: {
            ...outfit.items,
            // Ensure items are properly linked
          },
        }));
        dispatch({ type: 'LOAD_DATA', payload: parsedData });
      } catch (error) {
        console.error('Failed to load saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('closet-muse-data', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Utility functions
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function getItemsByCategory(
  items: WardrobeItem[],
  category: WardrobeItem['category']
) {
  return items.filter((item) => item.category === category);
}

export function calculateStyleMatch(items: WardrobeItem[]): number {
  if (items.length === 0) return 0;

  const styles = items.map((item) => item.style);
  const mostCommonStyle = styles.reduce((a, b, _, arr) =>
    arr.filter((v) => v === a).length >= arr.filter((v) => v === b).length
      ? a
      : b
  );

  const matchingItems = styles.filter(
    (style) => style === mostCommonStyle
  ).length;
  return Math.round((matchingItems / items.length) * 100);
}

export function getWeatherIcon(condition: WeatherData['condition']): string {
  const icons = {
    sunny: '☀️',
    cloudy: '☁️',
    rainy: '🌧️',
    snowy: '❄️',
    windy: '💨',
  };
  return icons[condition] || '☀️';
}
