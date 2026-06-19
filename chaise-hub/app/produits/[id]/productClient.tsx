'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Chair } from '../../services/chairService';
import { HeaderLight } from '../../components/HeaderLight';

export default function ProductClient({ product, allChairs }: { product: Chair, allChairs: Chair[] }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <HeaderLight theme="light" />
        <div className="flex items-center justify-center min-h-96">
          <p className="text-2xl text-gray-600">Produit non trouvé</p>
        </div>
      </div>
    );
  }

  const similarProducts = allChairs
    .filter(chair => chair.category === product.category && chair.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <HeaderLight theme="light" />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4 text-gray-900">
        <a href="/produits" className="hover:text-accent-orange">Produits</a>
        <span className="mx-2">/</span>
        <span className="text-gray-600">{product.name}</span>
      </div>

      {/* Main Product Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex flex-col items-center">
            <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
              {/* <span className="text-9xl">{product.image}</span> */}
              <span className="text-9xl">🪑</span>
            </div>
            <div className="flex gap-4 w-full">
              <div className="w-1/4 h-20 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200">
                <span className="text-4xl">🪑</span>
              </div>
              <div className="w-1/4 h-20 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200">
                <span className="text-4xl">🪑</span>
              </div>
              <div className="w-1/4 h-20 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200">
                <span className="text-4xl">🪑</span>
              </div>
              <div className="w-1/4 h-20 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200">
                <span className="text-4xl">🪑</span>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-accent-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <span className="text-yellow-500 text-2xl">⭐</span>
                <span className="ml-2 text-xl font-semibold text-gray-900">{product.rating}</span>
                <span className="ml-2 text-gray-600">({product.reviews} avis)</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-gray-300">
              <p className="text-5xl font-bold text-accent-orange mb-2">{product.price}€</p>
              <p className="text-gray-600">Livraison gratuite à partir de 50€</p>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-700 mb-8">{product.fullDescription}</p>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-xl text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center py-3 border-0 outline-none bg-white text-gray-900"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-xl text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button className="flex-1 bg-accent-orange text-white py-3 rounded-lg font-bold text-lg hover:bg-accent-orange-dark transition-colors">
                Ajouter au panier
              </button>
            </div>

            {/* Buy Now Button */}
            <button className="w-full border-2 border-accent-orange text-accent-orange py-3 rounded-lg font-bold text-lg hover:bg-accent-orange hover:text-white transition-colors mb-8">
              Acheter maintenant
            </button>

            {/* Key Features */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Points Clés</h3>
              <ul className="space-y-2">
                {product.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="text-gray-700 flex items-center">
                    <span className="text-accent-orange mr-3 text-lg">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-gray-300">
        <div className="flex gap-8 border-b border-gray-300 mb-8">
          {['description', 'caracteristiques', 'avis'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 font-semibold border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-accent-orange text-accent-orange'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab === 'description' ? 'Description' : tab === 'caracteristiques' ? 'Caractéristiques' : ''}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === 'description' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Description Complète</h3>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">{product.fullDescription}</p>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Caractéristiques Principales</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-gray-700 flex items-center">
                    <span className="text-blue-600 mr-3 text-lg">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'caracteristiques' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Spécifications Techniques</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="border border-gray-200 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm font-semibold">{key}</p>
                    <p className="text-gray-900 text-lg font-bold">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* {activeTab === 'avis' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Avis Clients</h3>
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-300">
                <div>
                  <p className="text-4xl font-bold text-accent-orange">{product.rating}</p>
                  <p className="text-gray-600">sur 5</p>
                </div>
                <div>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-500 text-2xl' : 'text-gray-400 text-2xl'}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600">{product.reviews} avis vérifiés</p>
                </div>
              </div>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border border-gray-300 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-gray-900">Client Satisfait {i}</p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => (
                          <span key={j} className={j < (5 - i) ? 'text-yellow-500 text-lg' : 'text-gray-400 text-lg'}>
                            ⭐
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">Excellent produit, livraison rapide et bien emballée. Je recommande vivement ChaiseHUB !</p>
                  </div>
                ))}
              </div>
            </div>
          )} */}
        </div>
      </section>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-12 border-t border-gray-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Produits Similaires</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {similarProducts.map((similar) => (
              <a
                key={similar.id}
                href={`/produits/${similar.id}`}
                className="bg-white border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="h-40 bg-gradient-to-br from-accent-orange-dark to-accent-orange flex items-center justify-center">
                  <span className="text-6xl">🪑</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{similar.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{similar.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-accent-orange">{similar.price}€</span>
                    <div className="flex items-center">
                      <span className="text-yellow-500">⭐</span>
                      <span className="ml-1 text-gray-700 font-semibold">{similar.rating}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 py-8 mt-16 border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2025 ChaiseHUB. Créé par Jean et Marc avec ❤️</p>
        </div>
      </footer>
    </div>
  );
}
