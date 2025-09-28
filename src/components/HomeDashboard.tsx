import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Cloud, Sun, CloudRain, Heart, Share2, Sparkles, Thermometer, RefreshCw, Zap } from 'lucide-react';
import { useApp, getWeatherIcon } from '../contexts/AppContext';
import { weatherService } from '../services/weatherService';
import { outfitRecommendationService, OutfitRecommendation } from '../services/outfitRecommendationService';
import { toast } from 'sonner';

export default function HomeDashboard() {
  const { state, dispatch } = useApp();
  const [todaysOutfit, setTodaysOutfit] = useState<OutfitRecommendation | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Load today's outfit recommendation
  useEffect(() => {
    loadTodaysOutfit();
    updateWeather();
  }, []);

  const loadTodaysOutfit = async () => {
    setLoading(true);
    
    try {
      const recommendation = await outfitRecommendationService.generateDailyRecommendation(
        state.wardrobe,
        state.currentWeather,
        'casual', // Default to casual for daily recommendation
        state.user.preferences
      );
      
      setTodaysOutfit(recommendation);
    } catch (error) {
      console.error('Failed to generate outfit recommendation:', error);
      toast.error('Failed to generate outfit recommendation');
    } finally {
      setLoading(false);
    }
  };

  const updateWeather = async () => {
    try {
      const weather = await weatherService.getLocationWeather();
      dispatch({ type: 'UPDATE_WEATHER', payload: weather });
    } catch (error) {
      console.error('Failed to update weather:', error);
    }
  };

  const refreshRecommendation = async () => {
    setRefreshing(true);
    await loadTodaysOutfit();
    setRefreshing(false);
    toast.success('New recommendation generated!');
  };

  const saveOutfit = () => {
    if (!todaysOutfit) return;

    const newOutfit = {
      id: Date.now().toString(),
      name: `${todaysOutfit.style} - ${new Date().toLocaleDateString()}`,
      date: new Date(),
      occasion: todaysOutfit.occasion,
      items: todaysOutfit.items,
      planned: true,
      confidence: todaysOutfit.confidence,
      notes: todaysOutfit.reasoning.join('. ')
    };

    dispatch({ type: 'ADD_OUTFIT', payload: newOutfit });
    toast.success('Outfit saved to your calendar!');
  };

  const shareOutfit = () => {
    if (!todaysOutfit) return;
    
    const items = Object.values(todaysOutfit.items).filter(Boolean);
    const outfitText = `Check out my ${todaysOutfit.style} look: ${items.map(item => item!.name).join(', ')}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Closet Muse Outfit',
        text: outfitText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(outfitText);
      toast.success('Outfit details copied to clipboard!');
    }
  };

  const getItemEmoji = (item: any) => {
    const emojiMap = {
      tops: '👚',
      bottoms: '👖',
      dresses: '👗',
      shoes: '👠',
      accessories: '💎',
      perfumes: '🌸'
    };
    return emojiMap[item.category as keyof typeof emojiMap] || '👕';
  };

  return (
    <div className="px-4 pt-6 pb-24 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl text-gray-800 mb-2">Good morning Andile ✨</h1>
        <p className="text-gray-600">Let's make today stylish</p>
      </div>

      {/* Weather Card */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-purple-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-white rounded-full shadow-sm">
              <span className="text-xl">{getWeatherIcon(state.currentWeather.condition)}</span>
            </div>
            <div>
              <p className="text-lg text-gray-800">{state.currentWeather.temp}°F</p>
              <p className="text-sm text-gray-600 capitalize">{state.currentWeather.condition}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-purple-600">
            <Thermometer size={16} />
            <span className="text-sm">{state.currentWeather.description}</span>
          </div>
        </div>
      </Card>

      {/* Today's Outfit Recommendation */}
      <Card className="p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="text-purple-500" size={20} />
            <h2 className="text-lg text-gray-800">Today's Look</h2>
          </div>
          <div className="flex items-center space-x-2">
            {todaysOutfit && (
              <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                {todaysOutfit.confidence}% Match
              </Badge>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={refreshRecommendation}
              disabled={refreshing}
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <RefreshCw size={14} className={`${refreshing ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-48 mb-4"></div>
              <div className="space-y-2">
                <div className="bg-gray-200 rounded h-4 w-3/4"></div>
                <div className="bg-gray-200 rounded h-4 w-1/2"></div>
              </div>
            </div>
          </div>
        ) : todaysOutfit ? (
          <div className="space-y-4">
            {/* Outfit Preview */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 text-center">
              <div className="w-32 h-32 mx-auto bg-white rounded-full shadow-soft flex items-center justify-center mb-4">
                <div className="grid grid-cols-3 gap-1 text-xl">
                  {Object.values(todaysOutfit.items).slice(0, 6).map((item, index) => (
                    item && (
                      <span key={index} className="text-lg">
                        {getItemEmoji(item)}
                      </span>
                    )
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{todaysOutfit.occasion}</p>
              <h3 className="text-lg text-gray-800 mb-4">{todaysOutfit.style}</h3>
              
              {/* Outfit Items */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {Object.entries(todaysOutfit.items).map(([type, item]) => (
                  item && (
                    <div key={type} className="bg-white rounded-lg p-3 shadow-sm">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">{type}</p>
                      <p className="text-sm text-gray-800">{item.name}</p>
                      <p className="text-xs text-purple-600">{item.color}</p>
                      {item.favorite && <span className="text-xs">❤️</span>}
                    </div>
                  )
                ))}
              </div>
              
              {/* AI Reasoning */}
              <div className="bg-white rounded-lg p-3 shadow-sm">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Zap className="text-purple-500" size={16} />
                  <p className="text-sm text-gray-800">AI Insights</p>
                </div>
                <p className="text-xs text-gray-600">{todaysOutfit.reasoning[0]}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button 
                className="flex-1 bg-purple-500 hover:bg-purple-600 text-white"
                onClick={saveOutfit}
              >
                <Heart size={16} className="mr-2" />
                Save Outfit
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50"
                onClick={shareOutfit}
              >
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Unable to generate recommendation</p>
            <Button onClick={loadTodaysOutfit} className="bg-purple-500 hover:bg-purple-600 text-white">
              Try Again
            </Button>
          </div>
        )}
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center hover:shadow-lg smooth-transition cursor-pointer">
          <div className="w-12 h-12 mx-auto bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mb-3">
            <Sparkles className="text-white" size={20} />
          </div>
          <h3 className="text-sm text-gray-800 mb-1">Style Quiz</h3>
          <p className="text-xs text-gray-600">Discover your vibe</p>
        </Card>
        
        <Card className="p-4 text-center hover:shadow-lg smooth-transition cursor-pointer">
          <div className="w-12 h-12 mx-auto bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center mb-3">
            <CloudRain className="text-white" size={20} />
          </div>
          <h3 className="text-sm text-gray-800 mb-1">Weather Style</h3>
          <p className="text-xs text-gray-600">Perfect for today</p>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-4">
        <h3 className="text-lg text-gray-800 mb-4">Wardrobe Stats</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl text-purple-600 mb-1">{state.wardrobe.length}</p>
            <p className="text-xs text-gray-600">Total Items</p>
          </div>
          <div>
            <p className="text-2xl text-pink-600 mb-1">
              {state.wardrobe.filter(item => item.favorite).length}
            </p>
            <p className="text-xs text-gray-600">Favorites</p>
          </div>
          <div>
            <p className="text-2xl text-teal-600 mb-1">{state.outfits.length}</p>
            <p className="text-xs text-gray-600">Saved Outfits</p>
          </div>
        </div>
      </Card>
    </div>
  );
}