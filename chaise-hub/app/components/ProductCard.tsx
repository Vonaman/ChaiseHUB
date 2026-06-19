'use client';

import Link from 'next/link';
import { Chair } from '../services/chairService';

interface ProductCardProps {
  chair: Chair;
  onAddToCart?: (chair: Chair) => void;
}

export const ProductCard = ({ chair, onAddToCart }: ProductCardProps) => {
  return (
    <div className="bg-gray-100 border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
      {/* Image Container */}
      <div className="h-48 bg-gradient-to-br from-accent-orange-dark to-accent-orange flex items-center justify-center relative">
        {/* <span className="text-7xl">{chair.image}</span> */}
        {/* Emoji Chaise */}
        <span className="text-7xl">🪑</span>
        {chair.category && (
          <div className="absolute top-3 right-3 bg-accent-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
            {chair.category}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Name */}
        <h3 className="text-xl font-bold text-black mb-2">{chair.name}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{chair.description}</p>

        {/* Price & Rating */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-3xl font-bold text-accent-orange">{chair.price}€</span>
          <div className="flex items-center bg-accent-orange-dark px-3 py-1 rounded-full">
            <span className="text-yellow-500 text-lg">⭐</span>
            <span className="ml-1 text-white font-semibold">{chair.rating}</span>
          </div>
        </div>

        {/* Buttons */}
        <button
          onClick={() => onAddToCart?.(chair)}
          className="w-full bg-accent-orange text-white py-3 rounded-lg font-semibold hover:bg-accent-orange-dark transition-colors mb-2"
        >
          Ajouter au panier
        </button>
        <Link
          href={`/produits/${chair.id}`}
          className="block w-full border-2 border-accent-orange text-accent-orange text-center py-2 rounded-lg font-semibold hover:bg-accent-orange hover:text-white transition-colors"
        >
          Détails
        </Link>
      </div>
    </div>
  );
};
