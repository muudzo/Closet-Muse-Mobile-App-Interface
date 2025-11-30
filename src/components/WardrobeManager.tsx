import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Plus,
  Search,
  Filter,
  Upload,
  Heart,
  Trash2,
  Edit,
  Camera,
  X,
} from 'lucide-react';
import { useApp, WardrobeItem, generateId } from '../contexts/AppContext';
import { toast } from 'sonner';

export default function WardrobeManager() {
  const { state, dispatch } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingItem, setEditingItem] = useState<WardrobeItem | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newItem, setNewItem] = useState<Partial<WardrobeItem>>({
    name: '',
    category: 'tops',
    color: '',
    brand: '',
    style: 'casual',
    favorite: false,
    timesWorn: 0,
    notes: '',
  });

  const categories = [
    { id: 'all', label: 'All Items', icon: '👗', count: state.wardrobe.length },
    {
      id: 'tops',
      label: 'Tops',
      icon: '👚',
      count: state.wardrobe.filter((item) => item.category === 'tops').length,
    },
    {
      id: 'dresses',
      label: 'Dresses',
      icon: '👗',
      count: state.wardrobe.filter((item) => item.category === 'dresses')
        .length,
    },
    {
      id: 'bottoms',
      label: 'Bottoms',
      icon: '👖',
      count: state.wardrobe.filter((item) => item.category === 'bottoms')
        .length,
    },
    {
      id: 'shoes',
      label: 'Shoes',
      icon: '👠',
      count: state.wardrobe.filter((item) => item.category === 'shoes').length,
    },
    {
      id: 'accessories',
      label: 'Accessories',
      icon: '👑',
      count: state.wardrobe.filter((item) => item.category === 'accessories')
        .length,
    },
    {
      id: 'perfumes',
      label: 'Perfumes',
      icon: '🌸',
      count: state.wardrobe.filter((item) => item.category === 'perfumes')
        .length,
    },
  ];

  const filteredItems = state.wardrobe
    .filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.color.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'brand':
          return a.brand.localeCompare(b.brand);
        case 'color':
          return a.color.localeCompare(b.color);
        case 'timesWorn':
          return b.timesWorn - a.timesWorn;
        case 'favorite':
          return b.favorite === a.favorite ? 0 : b.favorite ? 1 : -1;
        default:
          return 0;
      }
    });

  const handleAddItem = () => {
    if (
      !newItem.name ||
      !newItem.category ||
      !newItem.color ||
      !newItem.brand
    ) {
      toast.error('Please fill in all required fields');
      return;
    }

    const item: WardrobeItem = {
      id: generateId(),
      name: newItem.name,
      category: newItem.category as WardrobeItem['category'],
      color: newItem.color,
      brand: newItem.brand,
      style: newItem.style as WardrobeItem['style'],
      favorite: newItem.favorite || false,
      timesWorn: 0,
      notes: newItem.notes,
    };

    dispatch({ type: 'ADD_ITEM', payload: item });
    toast.success(`${item.name} added to your wardrobe!`);

    setNewItem({
      name: '',
      category: 'tops',
      color: '',
      brand: '',
      style: 'casual',
      favorite: false,
      timesWorn: 0,
      notes: '',
    });
    setShowAddDialog(false);
  };

  const handleEditItem = (item: WardrobeItem) => {
    setEditingItem(item);
    setNewItem(item);
    setShowAddDialog(true);
  };

  const handleUpdateItem = () => {
    if (!editingItem || !newItem.name || !newItem.color || !newItem.brand) {
      toast.error('Please fill in all required fields');
      return;
    }

    const updatedItem: WardrobeItem = {
      ...editingItem,
      name: newItem.name,
      color: newItem.color,
      brand: newItem.brand,
      style: newItem.style as WardrobeItem['style'],
      notes: newItem.notes,
    };

    dispatch({ type: 'UPDATE_ITEM', payload: updatedItem });
    toast.success(`${updatedItem.name} updated!`);

    setEditingItem(null);
    setNewItem({
      name: '',
      category: 'tops',
      color: '',
      brand: '',
      style: 'casual',
      favorite: false,
      timesWorn: 0,
      notes: '',
    });
    setShowAddDialog(false);
  };

  const handleDeleteItem = (itemId: string) => {
    const item = state.wardrobe.find((i) => i.id === itemId);
    if (item) {
      dispatch({ type: 'DELETE_ITEM', payload: itemId });
      toast.success(`${item.name} removed from wardrobe`);
    }
  };

  const toggleFavorite = (itemId: string) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: itemId });
    const item = state.wardrobe.find((i) => i.id === itemId);
    toast.success(
      `${item?.name} ${item?.favorite ? 'removed from' : 'added to'} favorites`
    );
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // In a real app, you would upload these images to a cloud service
      toast.success(`${files.length} image(s) selected for upload`);
      // For now, we'll just show a success message
    }
  };

  const getItemEmoji = (category: WardrobeItem['category']) => {
    const emojiMap = {
      tops: '👚',
      bottoms: '👖',
      dresses: '👗',
      shoes: '👠',
      accessories: '💎',
      perfumes: '🌸',
    };
    return emojiMap[category];
  };

  const resetDialog = () => {
    setEditingItem(null);
    setNewItem({
      name: '',
      category: 'tops',
      color: '',
      brand: '',
      style: 'casual',
      favorite: false,
      timesWorn: 0,
      notes: '',
    });
    setShowAddDialog(false);
  };

  return (
    <div className="px-4 pt-6 pb-24 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-gray-800">My Wardrobe</h1>
          <p className="text-gray-600">Organize your fashion collection</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white rounded-full w-12 h-12 p-0">
              <Plus size={20} />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Item Name*</Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g., Silk Blouse"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category*</Label>
                  <Select
                    value={newItem.category}
                    onValueChange={(value) =>
                      setNewItem((prev) => ({
                        ...prev,
                        category: value as WardrobeItem['category'],
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tops">Tops</SelectItem>
                      <SelectItem value="bottoms">Bottoms</SelectItem>
                      <SelectItem value="dresses">Dresses</SelectItem>
                      <SelectItem value="shoes">Shoes</SelectItem>
                      <SelectItem value="accessories">Accessories</SelectItem>
                      <SelectItem value="perfumes">Perfumes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="style">Style</Label>
                  <Select
                    value={newItem.style}
                    onValueChange={(value) =>
                      setNewItem((prev) => ({
                        ...prev,
                        style: value as WardrobeItem['style'],
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="elegant">Elegant</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="sporty">Sporty</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="color">Color*</Label>
                  <Input
                    id="color"
                    value={newItem.color}
                    onChange={(e) =>
                      setNewItem((prev) => ({ ...prev, color: e.target.value }))
                    }
                    placeholder="e.g., Blush Pink"
                  />
                </div>

                <div>
                  <Label htmlFor="brand">Brand*</Label>
                  <Input
                    id="brand"
                    value={newItem.brand}
                    onChange={(e) =>
                      setNewItem((prev) => ({ ...prev, brand: e.target.value }))
                    }
                    placeholder="e.g., Zara"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newItem.notes}
                  onChange={(e) =>
                    setNewItem((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  placeholder="Any additional details..."
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="favorite"
                  checked={newItem.favorite}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      favorite: e.target.checked,
                    }))
                  }
                  className="rounded"
                />
                <Label htmlFor="favorite">Add to favorites</Label>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={editingItem ? handleUpdateItem : handleAddItem}
                  className="flex-1 bg-purple-500 hover:bg-purple-600 text-white"
                >
                  {editingItem ? 'Update Item' : 'Add Item'}
                </Button>
                <Button
                  variant="outline"
                  onClick={resetDialog}
                  className="border-gray-200"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex space-x-3">
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={16}
          />
          <Input
            placeholder="Search your items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200 focus:border-purple-300"
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="brand">Brand</SelectItem>
            <SelectItem value="color">Color</SelectItem>
            <SelectItem value="timesWorn">Most Worn</SelectItem>
            <SelectItem value="favorite">Favorites</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Category Tabs */}
      <div className="overflow-x-auto">
        <div className="flex space-x-3 pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 flex flex-col items-center p-3 rounded-lg border smooth-transition ${
                selectedCategory === category.id
                  ? 'bg-purple-100 border-purple-300 text-purple-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-2xl mb-1">{category.icon}</span>
              <span className="text-xs font-medium">{category.label}</span>
              <Badge variant="secondary" className="mt-1 text-xs">
                {category.count}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Upload Area */}
      <Card className="p-6 border-2 border-dashed border-purple-200 bg-purple-50/30">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
            <Camera className="text-purple-600" size={24} />
          </div>
          <h3 className="text-lg text-gray-800 mb-2">Add New Items</h3>
          <p className="text-gray-600 mb-4">
            Upload photos of your clothes to get AI-powered styling suggestions
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <Button
            className="bg-purple-500 hover:bg-purple-600 text-white"
            onClick={() => fileInputRef.current?.click()}
          >
            Choose Photos
          </Button>
        </div>
      </Card>

      {/* Items Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg text-gray-800">
            {selectedCategory === 'all'
              ? 'All Items'
              : categories.find((c) => c.id === selectedCategory)?.label}
          </h3>
          <span className="text-sm text-gray-600">
            {filteredItems.length} items
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            {state.wardrobe.length === 0 ? (
              <div>
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-4xl">👗</span>
                </div>
                <h3 className="text-xl text-gray-800 mb-3">
                  Build Your Digital Wardrobe
                </h3>
                <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                  Start by adding your favorite pieces to get personalized
                  outfit recommendations and style insights
                </p>
                <Button
                  onClick={() => setShowAddDialog(true)}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-3"
                >
                  <Plus size={20} className="mr-2" />
                  Add Your First Item
                </Button>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 mb-4">
                  No items found in this category
                </p>
                <Button
                  onClick={() => setShowAddDialog(true)}
                  className="bg-purple-500 hover:bg-purple-600 text-white"
                >
                  <Plus size={16} className="mr-2" />
                  Add New Item
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="p-4 hover:shadow-lg smooth-transition"
              >
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-4xl">
                      {getItemEmoji(item.category)}
                    </span>
                  </div>
                  <button
                    onClick={() => toggleFavorite(item.id)}
                    className={`absolute top-2 right-2 p-1 rounded-full smooth-transition ${
                      item.favorite
                        ? 'bg-red-100 text-red-500'
                        : 'bg-white text-gray-400 hover:text-red-400'
                    }`}
                  >
                    <Heart
                      size={14}
                      fill={item.favorite ? 'currentColor' : 'none'}
                    />
                  </button>
                  {item.timesWorn > 0 && (
                    <div className="absolute top-2 left-2 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                      {item.timesWorn}x
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm text-gray-800 truncate">
                    {item.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-purple-600">
                      {item.color}
                    </span>
                    <span className="text-xs text-gray-500">{item.brand}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary" className="text-xs">
                      {item.style}
                    </Badge>
                    {item.lastWorn && (
                      <span className="text-xs text-gray-400">
                        Last: {item.lastWorn.toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2 mt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs border-purple-200 text-purple-600 hover:bg-purple-50"
                    onClick={() => handleEditItem(item)}
                  >
                    <Edit size={12} className="mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs border-red-200 text-red-600 hover:bg-red-50"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <h3 className="text-lg text-gray-800 mb-3">Wardrobe Insights</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl text-purple-600 mb-1">
              {state.wardrobe.length}
            </p>
            <p className="text-xs text-gray-600">Total Items</p>
          </div>
          <div>
            <p className="text-2xl text-pink-600 mb-1">
              {state.wardrobe.filter((item) => item.favorite).length}
            </p>
            <p className="text-xs text-gray-600">Favorites</p>
          </div>
          <div>
            <p className="text-2xl text-teal-600 mb-1">
              {Math.round(
                state.wardrobe.reduce((acc, item) => acc + item.timesWorn, 0) /
                  state.wardrobe.length
              ) || 0}
            </p>
            <p className="text-xs text-gray-600">Avg Worn</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
