'use client';

import Link from 'next/link';

export const Header = () => {
  return (
    <header className="border-b border-gray-700">
      <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-accent-orange hover:opacity-80">
          ChaiseHUB
        </Link>
        <div className="flex gap-8 items-center">
          <Link href="/produits" className="text-gray-300 hover:text-accent-orange">
            Produits
          </Link>

          {/* Account Icon */}
          <Link
            href="/auth"
            className="ml-4 p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Mon compte"
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
