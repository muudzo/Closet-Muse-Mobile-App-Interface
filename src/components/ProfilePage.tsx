import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Settings, Crown, Heart, Share2, Award, TrendingUp, Calendar } from 'lucide-react';

export default function ProfilePage() {
  const achievements = [
    { icon: '🎯', name: 'Style Master', description: 'Created 50 outfits' },
    { icon: '⭐', name: 'Fashion Star', description: 'High ratings for 30 days' },
    { icon: '🌟', name: 'Trendsetter', description: 'Early adopter of trends' }
  ];

  const stats = [
    { label: 'Outfits Created', value: '127', icon: '👗' },
    { label: 'Items in Wardrobe', value: '45', icon: '👚' },
    { label: 'Favorite Looks', value: '23', icon: '❤️' },
    { label: 'Days Styled', value: '89', icon: '📅' }
  ];

  return (
    <div className="px-4 pt-6 pb-24 space-y-6">
      {/* Profile Header */}
      <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl text-white">👩‍💼</span>
        </div>
        <h1 className="text-2xl text-gray-800 mb-2">Bella Rodriguez</h1>
        <p className="text-gray-600 mb-4">Fashion Enthusiast</p>
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Badge className="bg-purple-100 text-purple-700">
            <Crown size={12} className="mr-1" />
            Premium Member
          </Badge>
          <Badge className="bg-pink-100 text-pink-700">Level 8</Badge>
        </div>
        <Button className="bg-purple-500 hover:bg-purple-600 text-white">
          <Settings size={16} className="mr-2" />
          Edit Profile
        </Button>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4 text-center">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-2xl text-purple-600 mb-1">{stat.value}</div>
            <p className="text-xs text-gray-600">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Style Analytics */}
      <Card className="p-4">
        <h3 className="text-lg text-gray-800 mb-4">Style Analytics</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Most Worn Color</span>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-pink-400 rounded-full"></div>
              <span className="text-sm text-gray-800">Blush Pink</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Favorite Style</span>
            <span className="text-sm text-gray-800">Elegant Chic</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Confidence Boost</span>
            <div className="flex items-center space-x-1">
              <TrendingUp className="text-green-500" size={16} />
              <span className="text-sm text-green-600">+15% this month</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Achievements */}
      <Card className="p-4">
        <h3 className="text-lg text-gray-800 mb-4">Achievements</h3>
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
              <div className="text-2xl">{achievement.icon}</div>
              <div className="flex-1">
                <h4 className="text-sm text-gray-800">{achievement.name}</h4>
                <p className="text-xs text-gray-600">{achievement.description}</p>
              </div>
              <Award className="text-purple-500" size={20} />
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-4">
        <h3 className="text-lg text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-lg">👗</span>
              <div>
                <p className="text-sm text-gray-800">Created "Date Night" outfit</p>
                <p className="text-xs text-gray-600">2 hours ago</p>
              </div>
            </div>
            <Heart className="text-red-500" size={16} />
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-lg">📷</span>
              <div>
                <p className="text-sm text-gray-800">Added silk blouse to wardrobe</p>
                <p className="text-xs text-gray-600">1 day ago</p>
              </div>
            </div>
            <Share2 className="text-blue-500" size={16} />
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className="text-lg">⭐</span>
              <div>
                <p className="text-sm text-gray-800">Rated yesterday's outfit</p>
                <p className="text-xs text-gray-600">2 days ago</p>
              </div>
            </div>
            <Calendar className="text-purple-500" size={16} />
          </div>
        </div>
      </Card>

      {/* Settings */}
      <Card className="p-4">
        <h3 className="text-lg text-gray-800 mb-4">Settings</h3>
        <div className="space-y-3">
          <Button variant="outline" className="w-full justify-start border-purple-200 text-purple-600 hover:bg-purple-50">
            Notification Preferences
          </Button>
          <Button variant="outline" className="w-full justify-start border-purple-200 text-purple-600 hover:bg-purple-50">
            Privacy Settings
          </Button>
          <Button variant="outline" className="w-full justify-start border-purple-200 text-purple-600 hover:bg-purple-50">
            Style Preferences
          </Button>
          <Button variant="outline" className="w-full justify-start border-purple-200 text-purple-600 hover:bg-purple-50">
            Help & Support
          </Button>
        </div>
      </Card>
    </div>
  );
}