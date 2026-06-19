'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface HeaderProps {
  theme?: 'dark' | 'light';
}

export const HeaderLight = ({ theme = 'light' }: HeaderProps) => {
  const isDark = theme === 'dark';
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  return (
    <header className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-accent-orange hover:opacity-80">
          ChaiseHUB
        </Link>
        <div className="flex gap-8 items-center">
          <Link href="/" className={`${isDark ? 'text-gray-300' : 'text-gray-900'} hover:text-accent-orange`}>
            Accueil
          </Link>
          <Link href="/produits" className={`${isDark ? 'text-gray-300' : 'text-gray-900'} hover:text-accent-orange`}>
            Produits
          </Link>
          <Link href="#" className={`${isDark ? 'text-gray-300' : 'text-gray-900'} hover:text-accent-orange`}>
            À propos
          </Link>

          {/* Account Icon */}
          <Link
            href={isLoggedIn ? '/compte' : '/auth'}
            className={`ml-4 p-2 hover:rounded-lg transition-colors ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
            title={isLoggedIn ? 'Mon compte' : 'Connexion'}
          >
            <svg
              className="w-6 h-6 text-accent-orange"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </Link>
        </div>
      </nav>
    </header>
  );
};
