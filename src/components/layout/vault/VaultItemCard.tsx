import React, { useState } from 'react';
import { VaultItem } from '../../../types/vault';
import { Eye, EyeOff, Edit, Copy, Globe, Tag } from 'lucide-react';
import { usePasswordReveal } from '../../../hooks/usePasswordReveal';

interface VaultItemCardProps {
  item: VaultItem;
  onEdit: () => void;
}

export const VaultItemCard: React.FC<VaultItemCardProps> = ({ item, onEdit }) => {
  const [isRevealing, setIsRevealing] = useState(false);
  const { revealPassword, isRevealed, copyToClipboard } = usePasswordReveal();

  const handleReveal = async () => {
    const success = await revealPassword();
    if (success) {
      setIsRevealing(true);
      setTimeout(() => setIsRevealing(false), 30000); // Auto hide after 30 seconds
    }
  };

  const handleCopy = (text: string, type: 'username' | 'password') => {
    copyToClipboard(text, type);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
            {item.title}
          </h3>
          {item.url && (
            <div className="flex items-center gap-1 mt-1 text-sm text-gray-500 dark:text-gray-400">
              <Globe className="h-3 w-3" />
              <span className="truncate">{item.url}</span>
            </div>
          )}
        </div>
        <button
          onClick={onEdit}
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <Edit className="h-4 w-4" />
        </button>
      </div>

      {/* Username */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Username
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={item.username}
            readOnly
            className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-gray-900 dark:text-white text-sm"
          />
          <button
            onClick={() => handleCopy(item.username, 'username')}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Copy username"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Password
        </label>
        <div className="flex items-center gap-2">
          <input
            type={isRevealing && isRevealed ? "text" : "password"}
            value={isRevealing && isRevealed ? item.password : "••••••••"}
            readOnly
            className="flex-1 px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md text-gray-900 dark:text-white text-sm font-mono"
          />
          <div className="flex gap-1">
            <button
              onClick={handleReveal}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title={isRevealing ? "Hide password" : "Reveal password"}
            >
              {isRevealing && isRevealed ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => handleCopy(item.password, 'password')}
              className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              title="Copy password"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Tags */}
      {item.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-1 mb-2">
            <Tag className="h-3 w-3 text-gray-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {item.tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      {item.notes && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Notes
          </label>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {item.notes}
          </p>
        </div>
      )}

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
        <span>Updated {item.updatedAt.toLocaleDateString()}</span>
        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
          {item.category}
        </span>
      </div>
    </div>
  );
};