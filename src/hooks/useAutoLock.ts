import { useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface AutoLockOptions {
  autoLockMinutes: number;
  warningSeconds: number;
}

export const useAutoLock = (options: AutoLockOptions = { autoLockMinutes: 5, warningSeconds: 30 }) => {
  const { lock, isAuthenticated, isLocked } = useAuth();
  const [showWarning, setShowWarning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const warningTimer = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const resetTimers = useCallback(() => {
    lastActivityRef.current = Date.now();
    setShowWarning(false);
    setTimeRemaining(0);
    
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    if (warningTimer.current) clearTimeout(warningTimer.current);

    if (isAuthenticated && !isLocked) {
      const warningTime = (options.autoLockMinutes * 60 - options.warningSeconds) * 1000;
      warningTimer.current = setTimeout(() => {
        setShowWarning(true);
        setTimeRemaining(options.warningSeconds);
        
        const countdownInterval = setInterval(() => {
          setTimeRemaining(prev => {
            if (prev <= 1) {
              clearInterval(countdownInterval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
        
      }, warningTime);

      inactivityTimer.current = setTimeout(() => {
        lock();
        setShowWarning(false);
      }, options.autoLockMinutes * 60 * 1000);
    }
  }, [isAuthenticated, isLocked, lock, options]);

  const handleUserActivity = useCallback(() => {
    if (isAuthenticated && !isLocked) {
      resetTimers();
    }
  }, [isAuthenticated, isLocked, resetTimers]);

  const keepSignedIn = useCallback(() => {
    resetTimers();
    setShowWarning(false);
  }, [resetTimers]);

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, { passive: true });
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity);
      });
      
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
      if (warningTimer.current) clearTimeout(warningTimer.current);
    };
  }, [handleUserActivity]);

  useEffect(() => {
    resetTimers();
  }, [resetTimers]);

  return {
    showWarning,
    timeRemaining,
    keepSignedIn
  };
};