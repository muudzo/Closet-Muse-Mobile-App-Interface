import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { api } from '../services/api';
import { TrendingUp } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';

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
        // Shuffle trends for "always shuffles new inspo pictures" effect
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setTrends(shuffled);
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
          <div className="h-64 bg-gray-200 rounded-lg"></div>
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

      <Carousel className="w-full">
        <CarouselContent>
          {trends.map((trend) => (
            <CarouselItem key={trend.id} className="basis-full">
              <div className="p-1">
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3">
                  <img
                    src={trend.image_url}
                    alt={trend.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <div>
                      <h3 className="text-white font-medium text-lg mb-1">
                        {trend.title}
                      </h3>
                      <p className="text-white/90 text-sm line-clamp-2 mb-2">
                        {trend.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {trend.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-white/80 bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="hidden sm:block">
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </div>
      </Carousel>
    </Card>
  );
}
