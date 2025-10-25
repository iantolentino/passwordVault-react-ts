import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';

export const ThemeToggle: React.FC = () => {
  const themes = [
    { value: 'light' as const, label: 'Light', icon: Sun },
    { value: 'dark' as const, label: 'Dark', icon: Moon },
    { value: 'system' as const, label: 'System', icon: Monitor },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
      {themes.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          onClick={() => console.log('Theme changed to:', value)}
          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            value === 'light'
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          title={label}
        >
          <Icon className="h-4 w-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
};