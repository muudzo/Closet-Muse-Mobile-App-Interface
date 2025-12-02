import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { api } from '../services/api';
import { TrendingUp } from 'lucide-react';

interface TrendItem {
  id: string;
  title: string;
  image_url: string;
  description: string;
  tags: string[];
}

export function FashionTrends() {
  const [trends, setTrends] = useState<TrendItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const data = await api.getFashionTrends();
        setTrends(data);
      } catch (error) {
        console.error('Failed to fetch trends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  if (loading) {
    return (
      <Card className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="text-pink-500" size={20} />
          <h2 className="text-lg text-gray-800">Trending Now</h2>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="h-48 bg-gray-200 rounded-lg"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </Card>
    );
  }

  if (trends.length === 0) return null;

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <TrendingUp className="text-pink-500" size={20} />
          <h2 className="text-lg text-gray-800">Trending Now</h2>
        </div>
        <Badge variant="outline" className="text-pink-500 border-pink-200">
          Inspiration
        </Badge>
      </div>

      <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 scrollbar-hide">
        {trends.map((trend) => (
          <div key={trend.id} className="flex-none w-64 group cursor-pointer">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
              <img
                src={trend.image_url}
                alt={trend.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <p className="text-white text-sm line-clamp-2">
                  {trend.description}
                </p>
              </div>
            </div>
            <h3 className="text-gray-800 font-medium truncate">
              {trend.title}
            </h3>
            <div className="flex flex-wrap gap-1 mt-1">
              {trend.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-xs text-gray-500">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
