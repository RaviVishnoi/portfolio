import React, { createContext, useContext, useEffect, useState } from 'react';

export type TimePeriod = 'morning' | 'afternoon' | 'evening' | 'night';
export type ThemeMode = 'auto' | TimePeriod;

interface TimeThemeContextType {
  mode: ThemeMode;
  activePeriod: TimePeriod;
  setMode: (mode: ThemeMode) => void;
}

const TimeThemeContext = createContext<TimeThemeContextType | undefined>(undefined);

const STORAGE_KEY = 'rv-time-theme-mode';

function getLocalTimePeriod(): TimePeriod {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 20) return 'evening';
  return 'night';
}

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'auto';
  const stored = window.localStorage.getItem(STORAGE_KEY) as ThemeMode | null;
  if (stored && ['auto', 'morning', 'afternoon', 'evening', 'night'].includes(stored)) {
    return stored;
  }
  return 'auto';
}

export function TimeThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('auto');
  const [activePeriod, setActivePeriod] = useState<TimePeriod>('night');
  const [mounted, setMounted] = useState(false);

  // Initialize on mount
  useEffect(() => {
    const initialMode = getInitialMode();
    setMode(initialMode);
    
    const initialPeriod = initialMode === 'auto' ? getLocalTimePeriod() : initialMode;
    setActivePeriod(initialPeriod);
    document.documentElement.setAttribute('data-theme', initialPeriod);
    
    setMounted(true);
  }, []);

  // Sync state to DOM and Storage
  useEffect(() => {
    if (!mounted) return;
    
    const period = mode === 'auto' ? getLocalTimePeriod() : mode;
    setActivePeriod(period);
    document.documentElement.setAttribute('data-theme', period);
    window.localStorage.setItem(STORAGE_KEY, mode);
  }, [mode, mounted]);

  // If in auto mode, check time periodically (every minute)
  useEffect(() => {
    if (mode !== 'auto') return;

    const intervalId = setInterval(() => {
      const currentPeriod = getLocalTimePeriod();
      if (currentPeriod !== activePeriod) {
        setActivePeriod(currentPeriod);
        document.documentElement.setAttribute('data-theme', currentPeriod);
      }
    }, 60000);

    return () => clearInterval(intervalId);
  }, [mode, activePeriod]);

  return (
    <TimeThemeContext.Provider value={{ mode, activePeriod, setMode }}>
      {children}
    </TimeThemeContext.Provider>
  );
}

export function useTimeTheme() {
  const context = useContext(TimeThemeContext);
  if (context === undefined) {
    throw new Error('useTimeTheme must be used within a TimeThemeProvider');
  }
  return context;
}
