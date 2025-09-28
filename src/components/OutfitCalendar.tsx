import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ChevronLeft, ChevronRight, Plus, Eye, Edit, Trash2 } from 'lucide-react';

export default function OutfitCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Mock outfit data for calendar
  const outfitData = {
    '2025-08-15': { outfit: '👚👖👠', occasion: 'Work', rating: 5 },
    '2025-08-16': { outfit: '👗👟💎', occasion: 'Casual', rating: 4 },
    '2025-08-18': { outfit: '🧥👖👞', occasion: 'Meeting', rating: 5 },
    '2025-08-19': { outfit: '👚👗👠', occasion: 'Date', rating: 5, planned: true },
    '2025-08-20': { outfit: '👕👖👟', occasion: 'Weekend', rating: 0, planned: true },
    '2025-08-22': { outfit: '👗👠💎', occasion: 'Party', rating: 0, planned: true }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getOutfitForDate = (date: Date) => {
    return outfitData[formatDateKey(date) as keyof typeof outfitData];
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isPast = (date: Date) => {
    const today = new Date();
    return date < today;
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="px-4 pt-6 pb-24 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl text-gray-800 mb-2">Outfit Calendar</h1>
        <p className="text-gray-600">Plan and track your daily looks</p>
      </div>

      {/* Calendar Header */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('prev')}
            className="border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            <ChevronLeft size={16} />
          </Button>
          
          <h2 className="text-xl text-gray-800">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('next')}
            className="border-purple-200 text-purple-600 hover:bg-purple-50"
          >
            <ChevronRight size={16} />
          </Button>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map(day => (
            <div key={day} className="text-center text-xs text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {getDaysInMonth(currentDate).map((date, index) => {
            if (!date) {
              return <div key={index} className="aspect-square" />;
            }

            const outfit = getOutfitForDate(date);
            const isSelected = selectedDate?.toDateString() === date.toDateString();

            return (
              <button
                key={date.toDateString()}
                onClick={() => setSelectedDate(date)}
                className={`aspect-square p-1 rounded-lg text-sm smooth-transition ${
                  isSelected
                    ? 'bg-purple-500 text-white'
                    : isToday(date)
                    ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-300'
                    : outfit
                    ? isPast(date)
                      ? 'bg-green-50 text-green-700 hover:bg-green-100'
                      : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex flex-col items-center">
                  <span className="text-xs mb-1">{date.getDate()}</span>
                  {outfit && (
                    <div className="text-xs">
                      {outfit.outfit.slice(0, 2)}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Selected Date Details */}
      {selectedDate && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg text-gray-800">
              {selectedDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </h3>
            {isToday(selectedDate) && (
              <Badge className="bg-purple-100 text-purple-700">Today</Badge>
            )}
          </div>

          {(() => {
            const outfit = getOutfitForDate(selectedDate);
            
            if (outfit) {
              return (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 text-center">
                    <div className="text-3xl mb-2">{outfit.outfit}</div>
                    <p className="text-sm text-gray-600 mb-2">{outfit.occasion}</p>
                    {outfit.planned ? (
                      <Badge className="bg-blue-100 text-blue-700">Planned</Badge>
                    ) : (
                      <div className="flex items-center justify-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={`text-lg ${i < outfit.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                            ⭐
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50">
                      <Eye size={14} className="mr-2" />
                      View Details
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 border-purple-200 text-purple-600 hover:bg-purple-50">
                      <Edit size={14} className="mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              );
            } else {
              return (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Plus className="text-purple-600" size={24} />
                  </div>
                  <p className="text-gray-600 mb-4">No outfit planned for this day</p>
                  <Button className="bg-purple-500 hover:bg-purple-600 text-white">
                    <Plus size={16} className="mr-2" />
                    Plan Outfit
                  </Button>
                </div>
              );
            }
          })()}
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl text-green-600 mb-1">12</div>
          <p className="text-xs text-gray-600">Outfits Worn</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl text-blue-600 mb-1">5</div>
          <p className="text-xs text-gray-600">Planned Ahead</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl text-purple-600 mb-1">4.8</div>
          <p className="text-xs text-gray-600">Avg Rating</p>
        </Card>
      </div>

      {/* Upcoming Outfits */}
      <Card className="p-4">
        <h3 className="text-lg text-gray-800 mb-4">Upcoming Outfits</h3>
        <div className="space-y-3">
          {Object.entries(outfitData)
            .filter(([date, outfit]) => outfit.planned && new Date(date) > new Date())
            .slice(0, 3)
            .map(([date, outfit]) => (
              <div key={date} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{outfit.outfit.slice(0, 3)}</span>
                  <div>
                    <p className="text-sm text-gray-800">{outfit.occasion}</p>
                    <p className="text-xs text-gray-600">
                      {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-blue-200 text-blue-600 hover:bg-blue-100">
                  <Edit size={12} />
                </Button>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}