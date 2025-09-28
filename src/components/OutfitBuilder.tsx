import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Shuffle, Heart, Share2, Save, Wand2, Calendar, MapPin } from 'lucide-react';

export default function OutfitBuilder() {
  const [selectedItems, setSelectedItems] = useState({
    top: null,
    bottom: null,
    shoes: null,
    accessory: null,
    perfume: null
  });
  const [occasion, setOccasion] = useState('');
  const [weather, setWeather] = useState('');

  const wardrobeItems = {
    tops: [
      { id: 1, name: 'Silk Blouse', color: 'Blush Pink', image: '👚', style: 'elegant' },
      { id: 2, name: 'Cotton Tee', color: 'White', image: '👕', style: 'casual' },
      { id: 3, name: 'Blazer', color: 'Navy', image: '🧥', style: 'professional' }
    ],
    bottoms: [
      { id: 4, name: 'High-waist Jeans', color: 'Denim Blue', image: '👖', style: 'casual' },
      { id: 5, name: 'Midi Skirt', color: 'Black', image: '👗', style: 'elegant' },
      { id: 6, name: 'Trousers', color: 'Cream', image: '👖', style: 'professional' }
    ],
    shoes: [
      { id: 7, name: 'Block Heels', color: 'Nude', image: '👠', style: 'elegant' },
      { id: 8, name: 'Sneakers', color: 'White', image: '👟', style: 'casual' },
      { id: 9, name: 'Loafers', color: 'Brown', image: '👞', style: 'professional' }
    ],
    accessories: [
      { id: 10, name: 'Pearl Earrings', color: 'White', image: '💎', style: 'elegant' },
      { id: 11, name: 'Crossbody Bag', color: 'Tan', image: '👜', style: 'casual' },
      { id: 12, name: 'Watch', color: 'Gold', image: '⌚', style: 'professional' }
    ],
    perfumes: [
      { id: 13, name: 'Lavender Dreams', notes: 'Floral, Fresh', image: '🌸', style: 'elegant' },
      { id: 14, name: 'Citrus Burst', notes: 'Energetic, Zesty', image: '🍋', style: 'casual' },
      { id: 15, name: 'Midnight Musk', notes: 'Sophisticated, Bold', image: '🌙', style: 'professional' }
    ]
  };

  const generateRandomOutfit = () => {
    const getRandomItem = (items: any[]) => items[Math.floor(Math.random() * items.length)];
    
    setSelectedItems({
      top: getRandomItem(wardrobeItems.tops),
      bottom: getRandomItem(wardrobeItems.bottoms),
      shoes: getRandomItem(wardrobeItems.shoes),
      accessory: getRandomItem(wardrobeItems.accessories),
      perfume: getRandomItem(wardrobeItems.perfumes)
    });
  };

  const selectItem = (category: string, item: any) => {
    setSelectedItems(prev => ({ ...prev, [category]: item }));
  };

  const getStyleMatch = () => {
    const items = Object.values(selectedItems).filter(Boolean);
    if (items.length === 0) return 0;
    
    const styles = items.map((item: any) => item.style);
    const mostCommonStyle = styles.reduce((a, b, _, arr) => 
      arr.filter(v => v === a).length >= arr.filter(v => v === b).length ? a : b
    );
    
    const matchingItems = styles.filter(style => style === mostCommonStyle).length;
    return Math.round((matchingItems / items.length) * 100);
  };

  return (
    <div className="px-4 pt-6 pb-24 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl text-gray-800 mb-2">Outfit Builder</h1>
        <p className="text-gray-600">Mix & match your perfect look</p>
      </div>

      {/* Quick Filters */}
      <div className="grid grid-cols-2 gap-3">
        <Select value={occasion} onValueChange={setOccasion}>
          <SelectTrigger className="bg-purple-50 border-purple-200">
            <SelectValue placeholder="Occasion" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="casual">Casual</SelectItem>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="date">Date Night</SelectItem>
            <SelectItem value="party">Party</SelectItem>
            <SelectItem value="formal">Formal</SelectItem>
          </SelectContent>
        </Select>

        <Select value={weather} onValueChange={setWeather}>
          <SelectTrigger className="bg-blue-50 border-blue-200">
            <SelectValue placeholder="Weather" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sunny">Sunny</SelectItem>
            <SelectItem value="cloudy">Cloudy</SelectItem>
            <SelectItem value="rainy">Rainy</SelectItem>
            <SelectItem value="cold">Cold</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Outfit Preview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg text-gray-800">Your Outfit</h3>
          <div className="flex items-center space-x-2">
            <Badge className="bg-purple-100 text-purple-700">
              {getStyleMatch()}% Match
            </Badge>
            <Button
              size="sm"
              variant="outline"
              onClick={generateRandomOutfit}
              className="border-purple-200 text-purple-600 hover:bg-purple-50"
            >
              <Shuffle size={14} className="mr-1" />
              Random
            </Button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
          <div className="grid grid-cols-5 gap-3 mb-6">
            {Object.entries(selectedItems).map(([category, item]) => (
              <div key={category} className="text-center">
                <div className="w-16 h-16 bg-white rounded-lg shadow-sm flex items-center justify-center mb-2">
                  {item ? (
                    <span className="text-2xl">{item.image}</span>
                  ) : (
                    <span className="text-gray-300 text-xs">No {category}</span>
                  )}
                </div>
                <p className="text-xs text-gray-600 capitalize">{category}</p>
              </div>
            ))}
          </div>

          {Object.values(selectedItems).some(Boolean) && (
            <div className="space-y-2 mb-4">
              {Object.entries(selectedItems).map(([category, item]) => (
                item && (
                  <div key={category} className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 capitalize">{category}:</span>
                    <span className="text-gray-800">{item.name} ({item.color})</span>
                  </div>
                )
              ))}
            </div>
          )}

          <div className="flex space-x-2">
            <Button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white">
              <Save size={14} className="mr-2" />
              Save Outfit
            </Button>
            <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
              <Heart size={14} />
            </Button>
            <Button variant="outline" className="border-purple-200 text-purple-600 hover:bg-purple-50">
              <Share2 size={14} />
            </Button>
          </div>
        </div>
      </Card>

      {/* Item Selection */}
      <Tabs defaultValue="tops" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="tops">Tops</TabsTrigger>
          <TabsTrigger value="bottoms">Bottoms</TabsTrigger>
          <TabsTrigger value="shoes">Shoes</TabsTrigger>
          <TabsTrigger value="accessories">Access.</TabsTrigger>
          <TabsTrigger value="perfumes">Scents</TabsTrigger>
        </TabsList>

        {Object.entries(wardrobeItems).map(([category, items]) => (
          <TabsContent key={category} value={category} className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {items.map((item) => (
                <Card
                  key={item.id}
                  className={`p-3 cursor-pointer smooth-transition hover:shadow-lg ${
                    selectedItems[category as keyof typeof selectedItems]?.id === item.id
                      ? 'ring-2 ring-purple-300 bg-purple-50'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => selectItem(category, item)}
                >
                  <div className="aspect-square bg-gradient-to-br from-gray-50 to-purple-50 rounded-lg flex items-center justify-center mb-2">
                    <span className="text-2xl">{item.image}</span>
                  </div>
                  <h4 className="text-sm text-gray-800 truncate">{item.name}</h4>
                  <p className="text-xs text-purple-600">{item.color}</p>
                  {category === 'perfumes' && (
                    <p className="text-xs text-gray-500 mt-1">{item.notes}</p>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* AI Suggestions */}
      <Card className="p-4 bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
        <div className="flex items-center space-x-2 mb-3">
          <Wand2 className="text-teal-600" size={20} />
          <h3 className="text-lg text-gray-800">AI Suggestion</h3>
        </div>
        <p className="text-gray-600 text-sm mb-3">
          Based on the weather and your selected occasion, try pairing a silk blouse with high-waist trousers for a sophisticated look.
        </p>
        <Button size="sm" className="bg-teal-500 hover:bg-teal-600 text-white">
          Apply Suggestion
        </Button>
      </Card>
    </div>
  );
}