import { WeatherData } from '../contexts/AppContext';

// Mock weather service - in a real app, you'd use OpenWeatherMap or similar
export class WeatherService {
  private static instance: WeatherService;
  private apiKey = 'YOUR_WEATHER_API_KEY'; // Replace with real API key
  
  static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService();
    }
    return WeatherService.instance;
  }

  async getCurrentWeather(location?: { lat: number; lon: number }): Promise<WeatherData> {
    // For demo purposes, return mock data with some variation
    const conditions: WeatherData['condition'][] = ['sunny', 'cloudy', 'rainy', 'windy'];
    const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
    const baseTemp = 70;
    const tempVariation = Math.floor(Math.random() * 20) - 10; // -10 to +10
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const weatherData: WeatherData = {
      temp: baseTemp + tempVariation,
      condition: randomCondition,
      humidity: Math.floor(Math.random() * 40) + 30, // 30-70%
      description: this.getWeatherDescription(randomCondition, baseTemp + tempVariation)
    };

    return weatherData;
  }

  private getWeatherDescription(condition: WeatherData['condition'], temp: number): string {
    const descriptions = {
      sunny: temp > 75 ? 'Perfect for light fabrics' : 'Great for layering',
      cloudy: 'Ideal for transitional pieces',
      rainy: 'Don\'t forget your umbrella and waterproof shoes',
      windy: 'Layer up and secure loose accessories',
      snowy: 'Time for cozy sweaters and boots'
    };
    
    return descriptions[condition] || 'Check the weather before heading out';
  }

  // Get location-based weather (mock implementation)
  async getLocationWeather(): Promise<WeatherData> {
    if ('geolocation' in navigator) {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        
        return this.getCurrentWeather({
          lat: position.coords.latitude,
          lon: position.coords.longitude
        });
      } catch (error) {
        console.warn('Location access denied, using default weather');
        return this.getCurrentWeather();
      }
    }
    
    return this.getCurrentWeather();
  }

  // Get weather-based outfit suggestions
  getOutfitSuggestions(weather: WeatherData): {
    recommendations: string[];
    avoid: string[];
    colors: string[];
  } {
    const suggestions = {
      sunny: {
        recommendations: ['Light fabrics', 'Breathable materials', 'Sun hat', 'Sunglasses'],
        avoid: ['Heavy jackets', 'Dark colors', 'Thick fabrics'],
        colors: ['Light colors', 'Pastels', 'White', 'Cream']
      },
      cloudy: {
        recommendations: ['Layers', 'Light cardigan', 'Comfortable shoes'],
        avoid: ['Heavy winter coats', 'Shorts in cool weather'],
        colors: ['Neutral tones', 'Soft colors', 'Grey', 'Beige']
      },
      rainy: {
        recommendations: ['Waterproof jacket', 'Closed-toe shoes', 'Umbrella'],
        avoid: ['Suede', 'Light colors', 'Canvas shoes'],
        colors: ['Dark colors', 'Navy', 'Black', 'Deep tones']
      },
      windy: {
        recommendations: ['Fitted clothing', 'Secure accessories', 'Layers'],
        avoid: ['Loose scarves', 'Flowing dresses', 'Hats'],
        colors: ['Rich colors', 'Bold tones', 'Jewel tones']
      },
      snowy: {
        recommendations: ['Warm layers', 'Insulated boots', 'Gloves', 'Scarf'],
        avoid: ['Thin fabrics', 'Open-toe shoes', 'Light jackets'],
        colors: ['Warm colors', 'Deep tones', 'Rich fabrics']
      }
    };

    return suggestions[weather.condition] || suggestions.sunny;
  }
}

export const weatherService = WeatherService.getInstance();