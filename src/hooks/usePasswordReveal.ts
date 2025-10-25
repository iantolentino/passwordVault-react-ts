import { useState, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const usePasswordReveal = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const { verifyPin } = useAuth();

  const revealPassword = useCallback(async (): Promise<boolean> => {
    // In a real app, this would show a PIN verification modal
    // For now, we'll simulate PIN verification
    const success = await verifyPin('123456'); // Replace with actual PIN prompt
    
    if (success) {
      setIsRevealed(true);
      // Auto hide after 30 seconds
      setTimeout(() => {
        setIsRevealed(false);
      }, 30000);
      return true;
    }
    
    return false;
  }, [verifyPin]);

  const copyToClipboard = useCallback(async (text: string, type: 'username' | 'password') => {
    try {
      await navigator.clipboard.writeText(text);
      
      // Show success feedback (you could use a toast here)
      console.log(`${type} copied to clipboard`);
      
      // Auto clear clipboard after 30 seconds for passwords
      if (type === 'password') {
        setTimeout(async () => {
          try {
            await navigator.clipboard.writeText('');
            console.log('Clipboard cleared');
          } catch (error) {
            console.error('Failed to clear clipboard:', error);
          }
        }, 30000);
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  }, []);

  return {
    revealPassword,
    isRevealed,
    copyToClipboard
  };
};