'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9 rounded-full bg-slate-200/20" />;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative p-2 rounded-full text-slate-300 hover:text-white dark:text-slate-300 dark:hover:text-white hover:bg-white/10 dark:hover:bg-slate-800/60 transition-colors focus:outline-none"
      aria-label="Toggle Theme"
      title="Toggle Dark/Light Mode"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-[#F59A16] transition-transform duration-300 rotate-0 hover:rotate-90" />
      ) : (
        <Moon className="w-5 h-5 text-slate-700 dark:text-slate-200 transition-transform duration-300" />
      )}
    </button>
  );
}
