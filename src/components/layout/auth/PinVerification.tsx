import React, { useState } from 'react';

export const PinVerification: React.FC = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Demo PIN verification
    if (pin === '123456') {
      console.log('PIN verified successfully');
      // In a real app, this would unlock the vault
    } else {
      setError('Invalid PIN');
      setPin('');
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Enter PIN
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter your 6-digit PIN to continue
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-center text-2xl tracking-widest"
              placeholder="••••••"
              maxLength={6}
              pattern="\d{6}"
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Unlock Vault
          </button>
        </form>
      </div>
    </div>
  );
};