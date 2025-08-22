import React, { useEffect, useState } from 'react';
import '../styles/themeSwitcher.css';

export const ThemeSwitcher: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
    document.body.classList.toggle('dark', prefersDark);
    document.body.classList.toggle('light', !prefersDark);
  }, []);

  const toggleTheme = () => {
    setDarkMode(prev => {
      const newMode = !prev;
      document.body.classList.toggle('dark', newMode);
      document.body.classList.toggle('light', !newMode);
      return newMode;
    });
  };

  return (
    <button className="themeSwitcher" onClick={toggleTheme}>
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
};
