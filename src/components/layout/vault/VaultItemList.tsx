import React, { useState, useMemo } from 'react';
import { VaultItem } from '../../../types/vault';
import { VaultItemCard } from './VaultItemCard';
import { Search, Plus, Filter } from 'lucide-react';

interface VaultItemListProps {
  items: VaultItem[];
  onAddItem: () => void;
  onEditItem: (item: VaultItem) => void;
}

export const VaultItemList: React.FC<VaultItemListProps> = ({
  items,
  onAddItem,
  onEditItem
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const categories = useMemo(() => {
    return Array.from(new Set(items.map(item => item.category)));
  }, [items]);

  const allTags = useMemo(() => {
    return Array.from(new Set(items.flatMap(item => item.tags)));
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = searchQuery === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => item.tags.includes(tag));

      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [items, searchQuery, selectedCategory, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Controls */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex-1 w-full sm:max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search vault items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <button
            onClick={onAddItem}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="h-4 w-4" />
            Add Item
          </button>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-wrap gap-4">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Tag Filters */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center">
        <p className="text-gray-600 dark:text-gray-400">
          {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
        </p>
        
        {selectedTags.length > 0 && (
          <button
            onClick={() => setSelectedTags([])}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
          >
            Clear tags
          </button>
        )}
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No items found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {items.length === 0 
              ? "Get started by adding your first vault item."
              : "Try adjusting your search or filters."
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <VaultItemCard
              key={item.id}
              item={item}
              onEdit={() => onEditItem(item)}
            />
          ))}
        </div>
      )}
    </div>
  );
};