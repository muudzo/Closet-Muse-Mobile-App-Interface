import { WardrobeItem, WeatherData, Outfit } from '../contexts/AppContext';
import { weatherService } from './weatherService';

export interface OutfitRecommendation {
  items: {
    top?: WardrobeItem;
    bottom?: WardrobeItem;
    dress?: WardrobeItem;
    shoes?: WardrobeItem;
    accessory?: WardrobeItem;
    perfume?: WardrobeItem;
  };
  confidence: number;
  reasoning: string[];
  occasion: string;
  style: string;
}

export class OutfitRecommendationService {
  private static instance: OutfitRecommendationService;

  static getInstance(): OutfitRecommendationService {
    if (!OutfitRecommendationService.instance) {
      OutfitRecommendationService.instance = new OutfitRecommendationService();
    }
    return OutfitRecommendationService.instance;
  }

  async generateDailyRecommendation(
    wardrobe: WardrobeItem[],
    weather: WeatherData,
    occasion: string = 'casual',
    preferences?: {
      favoriteColors?: string[];
      preferredStyles?: string[];
    }
  ): Promise<OutfitRecommendation> {
    const weatherSuggestions = weatherService.getOutfitSuggestions(weather);
    const availableItems = this.filterAvailableItems(wardrobe);
    
    // Get outfit suggestions based on weather and occasion
    const recommendation = this.buildOutfitRecommendation(
      availableItems,
      weather,
      occasion,
      weatherSuggestions,
      preferences
    );

    return recommendation;
  }

  private filterAvailableItems(wardrobe: WardrobeItem[]): WardrobeItem[] {
    // In a real app, you might filter out items that are dirty, being cleaned, etc.
    return wardrobe.filter(item => {
      // Don't recommend items worn very recently
      if (item.lastWorn) {
        const daysSinceWorn = Math.floor(
          (Date.now() - item.lastWorn.getTime()) / (1000 * 60 * 60 * 24)
        );
        return daysSinceWorn >= 1; // At least 1 day since last worn
      }
      return true;
    });
  }

  private buildOutfitRecommendation(
    wardrobe: WardrobeItem[],
    weather: WeatherData,
    occasion: string,
    weatherSuggestions: any,
    preferences?: any
  ): OutfitRecommendation {
    const reasoning: string[] = [];
    const items: OutfitRecommendation['items'] = {};

    // Determine if we need a dress or separates
    const shouldUseDress = this.shouldRecommendDress(occasion, weather);
    
    if (shouldUseDress) {
      const dress = this.selectBestItem(
        wardrobe.filter(item => item.category === 'dresses'),
        weather,
        occasion,
        preferences
      );
      if (dress) {
        items.dress = dress;
        reasoning.push(`Selected ${dress.name} for a complete ${occasion} look`);
      }
    } else {
      // Select top
      const top = this.selectBestItem(
        wardrobe.filter(item => item.category === 'tops'),
        weather,
        occasion,
        preferences
      );
      if (top) {
        items.top = top;
        reasoning.push(`Chose ${top.name} as it suits ${weather.condition} weather`);
      }

      // Select bottom
      const bottom = this.selectBestItem(
        wardrobe.filter(item => item.category === 'bottoms'),
        weather,
        occasion,
        preferences,
        items.top // Consider color coordination
      );
      if (bottom) {
        items.bottom = bottom;
        reasoning.push(`Paired with ${bottom.name} for the ${occasion} occasion`);
      }
    }

    // Select shoes
    const shoes = this.selectBestItem(
      wardrobe.filter(item => item.category === 'shoes'),
      weather,
      occasion,
      preferences
    );
    if (shoes) {
      items.shoes = shoes;
      reasoning.push(`${shoes.name} complement the overall style`);
    }

    // Select accessory
    const accessory = this.selectBestItem(
      wardrobe.filter(item => item.category === 'accessories'),
      weather,
      occasion,
      preferences
    );
    if (accessory) {
      items.accessory = accessory;
      reasoning.push(`Added ${accessory.name} for a polished touch`);
    }

    // Select perfume
    const perfume = this.selectBestItem(
      wardrobe.filter(item => item.category === 'perfumes'),
      weather,
      occasion,
      preferences
    );
    if (perfume) {
      items.perfume = perfume;
      reasoning.push(`${perfume.name} matches the ${occasion} vibe`);
    }

    // Calculate confidence based on how well items match
    const confidence = this.calculateOutfitConfidence(items, weather, occasion);

    return {
      items,
      confidence,
      reasoning,
      occasion: this.formatOccasion(occasion),
      style: this.determineOutfitStyle(Object.values(items).filter(Boolean) as WardrobeItem[])
    };
  }

  private selectBestItem(
    items: WardrobeItem[],
    weather: WeatherData,
    occasion: string,
    preferences?: any,
    coordinateWith?: WardrobeItem
  ): WardrobeItem | undefined {
    if (items.length === 0) return undefined;

    // Score each item based on multiple factors
    const scoredItems = items.map(item => ({
      item,
      score: this.scoreItem(item, weather, occasion, preferences, coordinateWith)
    }));

    // Sort by score and return the best match
    scoredItems.sort((a, b) => b.score - a.score);
    return scoredItems[0].item;
  }

  private scoreItem(
    item: WardrobeItem,
    weather: WeatherData,
    occasion: string,
    preferences?: any,
    coordinateWith?: WardrobeItem
  ): number {
    let score = 0;

    // Weather appropriateness
    score += this.getWeatherScore(item, weather);

    // Occasion appropriateness
    score += this.getOccasionScore(item, occasion);

    // User preferences
    if (preferences) {
      if (preferences.favoriteColors?.includes(item.color)) score += 20;
      if (preferences.preferredStyles?.includes(item.style)) score += 15;
    }

    // Favorite items get a boost
    if (item.favorite) score += 10;

    // Avoid items worn too frequently
    score -= Math.min(item.timesWorn * 2, 20);

    // Color coordination
    if (coordinateWith) {
      score += this.getColorCoordinationScore(item, coordinateWith);
    }

    return score;
  }

  private getWeatherScore(item: WardrobeItem, weather: WeatherData): number {
    const weatherAppropriate = {
      sunny: {
        tops: item.color.toLowerCase().includes('light') || item.color.toLowerCase().includes('white') ? 25 : 10,
        bottoms: 15,
        dresses: item.color.toLowerCase().includes('light') ? 30 : 15,
        shoes: item.name.toLowerCase().includes('sandal') ? 25 : 10,
        accessories: item.name.toLowerCase().includes('sunglasses') ? 30 : 10,
        perfumes: 15
      },
      rainy: {
        tops: 15,
        bottoms: item.name.toLowerCase().includes('jean') ? 20 : 15,
        dresses: 10,
        shoes: item.name.toLowerCase().includes('boot') ? 30 : 5,
        accessories: item.name.toLowerCase().includes('umbrella') ? 35 : 10,
        perfumes: 15
      },
      cloudy: {
        tops: 20,
        bottoms: 20,
        dresses: 15,
        shoes: 15,
        accessories: 15,
        perfumes: 15
      },
      windy: {
        tops: item.name.toLowerCase().includes('fitted') ? 25 : 10,
        bottoms: 20,
        dresses: 10,
        shoes: 15,
        accessories: 5, // Avoid loose accessories
        perfumes: 15
      },
      snowy: {
        tops: item.name.toLowerCase().includes('sweater') ? 30 : 10,
        bottoms: 15,
        dresses: 5,
        shoes: item.name.toLowerCase().includes('boot') ? 35 : 5,
        accessories: item.name.toLowerCase().includes('scarf') ? 30 : 10,
        perfumes: 15
      }
    };

    return weatherAppropriate[weather.condition]?.[item.category] || 10;
  }

  private getOccasionScore(item: WardrobeItem, occasion: string): number {
    const occasionMatch = {
      casual: {
        casual: 30,
        elegant: 10,
        professional: 5,
        sporty: 25
      },
      work: {
        casual: 10,
        elegant: 25,
        professional: 35,
        sporty: 5
      },
      date: {
        casual: 15,
        elegant: 35,
        professional: 20,
        sporty: 5
      },
      party: {
        casual: 10,
        elegant: 35,
        professional: 15,
        sporty: 5
      },
      formal: {
        casual: 5,
        elegant: 35,
        professional: 30,
        sporty: 0
      }
    };

    return occasionMatch[occasion as keyof typeof occasionMatch]?.[item.style] || 15;
  }

  private getColorCoordinationScore(item: WardrobeItem, coordinateWith: WardrobeItem): number {
    // Simple color coordination logic
    const colorPairs = {
      'Blush Pink': ['Cream', 'White', 'Navy', 'Denim Blue'],
      'Black': ['White', 'Cream', 'Red', 'Gold'],
      'Navy': ['White', 'Cream', 'Blush Pink', 'Gold'],
      'White': ['Black', 'Navy', 'Blush Pink', 'Denim Blue'],
      'Cream': ['Blush Pink', 'Navy', 'Brown', 'Gold']
    };

    const coordinatingColors = colorPairs[coordinateWith.color as keyof typeof colorPairs] || [];
    return coordinatingColors.includes(item.color) ? 20 : 0;
  }

  private shouldRecommendDress(occasion: string, weather: WeatherData): boolean {
    // Prefer dresses for certain occasions and good weather
    const dressOccasions = ['date', 'party', 'formal'];
    const goodWeatherForDress = weather.condition === 'sunny' && weather.temp > 65;
    
    return dressOccasions.includes(occasion) || (occasion === 'casual' && goodWeatherForDress);
  }

  private calculateOutfitConfidence(
    items: OutfitRecommendation['items'],
    weather: WeatherData,
    occasion: string
  ): number {
    const itemsArray = Object.values(items).filter(Boolean) as WardrobeItem[];
    
    if (itemsArray.length === 0) return 0;

    // Base confidence on number of items
    let confidence = Math.min(itemsArray.length * 15, 75);

    // Style consistency bonus
    const styles = itemsArray.map(item => item.style);
    const uniqueStyles = new Set(styles);
    if (uniqueStyles.size <= 2) confidence += 15;

    // Weather appropriateness bonus
    if (weather.temp > 70 && weather.condition === 'sunny') confidence += 10;

    return Math.min(confidence, 98); // Cap at 98%
  }

  private determineOutfitStyle(items: WardrobeItem[]): string {
    if (items.length === 0) return 'Casual';

    const styleCounts = items.reduce((acc, item) => {
      acc[item.style] = (acc[item.style] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const dominantStyle = Object.entries(styleCounts)
      .sort(([,a], [,b]) => b - a)[0][0];

    const styleNames = {
      casual: 'Casual Chic',
      elegant: 'Elegant Style',
      professional: 'Professional Look',
      sporty: 'Sporty Casual'
    };

    return styleNames[dominantStyle as keyof typeof styleNames] || 'Mixed Style';
  }

  private formatOccasion(occasion: string): string {
    const formatted = {
      work: 'Work Meeting',
      casual: 'Casual Outing',
      date: 'Date Night',
      party: 'Party Time',
      formal: 'Formal Event'
    };

    return formatted[occasion as keyof typeof formatted] || 'Daily Wear';
  }
}

export const outfitRecommendationService = OutfitRecommendationService.getInstance();