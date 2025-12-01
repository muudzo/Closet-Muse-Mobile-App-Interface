import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { AppProvider } from '@/contexts/AppContext';

/**
 * Custom render function that wraps components with necessary providers
 */
function customRender(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, {
    wrapper: ({ children }) => <AppProvider>{children}</AppProvider>,
    ...options,
  });
}

// Re-export everything from testing library
export * from '@testing-library/react';

// Override render method
export { customRender as render };

/**
 * Mock data generators for testing
 */

export const mockClothingItem = (overrides = {}) => ({
  id: '1',
  name: 'Test Item',
  category: 'tops' as const,
  color: 'black' as const,
  season: ['all' as const],
  occasion: ['casual' as const],
  timesWorn: 0,
  favorite: false,
  ...overrides,
});

export const mockOutfit = (overrides = {}) => ({
  id: '1',
  name: 'Test Outfit',
  items: [mockClothingItem()],
  occasion: 'casual' as const,
  season: 'all' as const,
  createdAt: new Date().toISOString(),
  ...overrides,
});

export const mockWeatherData = (overrides = {}) => ({
  temperature: 72,
  feelsLike: 70,
  condition: 'clear',
  description: 'Clear sky',
  humidity: 50,
  windSpeed: 5,
  icon: '01d',
  location: 'Test City',
  ...overrides,
});
