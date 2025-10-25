import React from 'react';
import { Settings, Lock, Shield, User } from 'lucide-react';
import { ThemeToggle } from '../layout/ThemeToggle';

export const SettingsPanel: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Settings className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Settings
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your vault security and preferences
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center gap-3 p-6 border-b border-gray-200 dark:border-gray-700">
            <Shield className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Security
            </h2>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="sm:flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Auto-lock after
                </label>
              </div>
              <div className="sm:w-48">
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="1">1 minute</option>
                  <option value="5">5 minutes</option>
                  <option value="10">10 minutes</option>
                  <option value="30">30 minutes</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex items-center gap-3 p-6 border-b border-gray-200 dark:border-gray-700">
            <User className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Appearance
            </h2>
          </div>

          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="sm:flex-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Theme
                </label>
              </div>
              <div className="sm:w-48">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="h-5 w-5 text-red-600 dark:text-red-400" />
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-200">
            Danger Zone
          </h2>
        </div>
        
        <div className="space-y-4">
          <p className="text-sm text-red-700 dark:text-red-300">
            These actions are irreversible. Please proceed with caution.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => console.log('Lock vault')}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Lock Vault
            </button>
            
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to log out?')) {
                  console.log('Logout');
                }
              }}
              className="px-4 py-2 border border-red-600 text-red-600 dark:text-red-400 hover:bg-red-600 hover:text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};