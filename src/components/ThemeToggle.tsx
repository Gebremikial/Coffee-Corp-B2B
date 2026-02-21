'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  if (!mounted) return <div className="h-10" />; // Placeholder to prevent layout shift

  return (
    <button 
      onClick={() => {
        const newDark = !darkMode;
        setDarkMode(newDark);
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', newDark ? 'dark' : 'light');
      }}
      className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-slate-800 transition-all text-slate-400 hover:text-white"
    >
      <span>{darkMode ? '☀️' : '🌙'}</span>
      <span className="font-medium text-sm">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
    </button>
  );
}