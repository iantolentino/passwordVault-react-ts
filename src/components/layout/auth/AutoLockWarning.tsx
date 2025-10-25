import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

export const AutoLockWarning: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Session Timeout Warning
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your session will lock due to inactivity
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <Clock className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Locking in: 30 seconds
          </span>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => console.log('Keep signed in')}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Keep Me Signed In
          </button>
          <button
            onClick={() => console.log('Lock now')}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Lock Now
          </button>
        </div>
      </div>
    </div>
  );
};