import React from 'react';
import { PinVerification } from './auth/PinVerification';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLocked = false; // Demo - always show children

  return (
    <div className="min-h-screen bg-gray-50 transition-colors">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Secure Vault
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => console.log('Logout clicked')}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {isLocked ? <PinVerification /> : children}
      </main>
    </div>
  );
};