import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export const LoginForm: React.FC = () => {
  const [masterPassword, setMasterPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(masterPassword);
    if (!success) {
      setError('Login failed. Try any non-empty password.');
      setMasterPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Secure Vault
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to access your password vault
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-800 mb-2">
            🚀 Demo Mode - Test Credentials
          </h3>
          <div className="text-sm text-blue-700 space-y-1">
            <div><strong>Master Password:</strong> Any password (try "demo123")</div>
            <div><strong>OTP (if prompted):</strong> 123456</div>
            <div><strong>Unlock PIN:</strong> 123456</div>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="masterPassword" className="block text-sm font-medium text-gray-700">
              Master Password
            </label>
            <input
              id="masterPassword"
              name="masterPassword"
              type="password"
              required
              value={masterPassword}
              onChange={(e) => setMasterPassword(e.target.value)}
              className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter any password for demo"
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};