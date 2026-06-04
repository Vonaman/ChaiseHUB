'use client';

import { useState } from 'react';
import { Chair } from '../services/chairService';

export const ListChairs = ({ chairs }: { chairs: Chair[] }) => {
  const categories = ["Tous", "Ergonomique", "Gaming", "Design", "Bureau", "Cuisine", "Relaxation", "Classique", "Enfant"];
  
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [priceRange, setPriceRange] = useState(500);
  const [sortBy, setSortBy] = useState("name");

  const filteredChairs = chairs
    .filter(chair => {
      const categoryMatch = selectedCategory === "Tous" || chair.category === selectedCategory;
      const priceMatch = chair.price <= priceRange;
      return categoryMatch && priceMatch;
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-black">
      {/* Header / Navigation */}
      <header className="border-b border-gray-700">
        <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <a href="/" className="text-3xl font-bold text-accent-orange hover:opacity-80">ChaiseHUB</a>
          <div className="flex gap-8">
            <a href="/" className="text-gray-300 hover:text-accent-orange">Accueil</a>
            <a href="/produits" className="text-gray-300 hover:text-accent-orange font-semibold text-accent-orange">Produits</a>
            <a href="#" className="text-gray-300 hover:text-accent-orange">À propos</a>
          </div>
        </nav>
      </header>

      {/* Page Title */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-white mb-2">Tous nos produits</h1>
          <p className="text-gray-400">{filteredChairs.length} chaise(s) disponible(s)</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* Category Filter */}
            <div>
            <h3 className="font-bold text-lg text-white mb-4">Catégories</h3>
            <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat
                        ? 'bg-accent-orange text-white font-semibold'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="font-bold text-lg text-white mb-4">Prix Maximum</h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min="50"
                  max="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full cursor-pointer"
                />
                <p className="text-gray-300 font-semibold">Jusqu'à {priceRange}€</p>
              </div>
            </div>

            {/* Sort Filter */}
            <div>
              <h3 className="font-bold text-lg text-white mb-4">Trier par</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
              >
                <option value="name">Nom (A-Z)</option>
                <option value="price-asc">Prix (Bas → Haut)</option>
                <option value="price-desc">Prix (Haut → Bas)</option>
                <option value="rating">Meilleure note</option>
              </select>
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setSelectedCategory("Tous");
                setPriceRange(500);
                setSortBy("name");
              }}
              className="w-full bg-accent-orange text-white py-2 rounded-lg font-semibold hover:bg-accent-orange-dark transition-colors"
            >
              Réinitialiser Filtres
            </button>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="lg:col-span-3">
          {filteredChairs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-xl text-gray-600">Aucun produit ne correspond à vos critères</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredChairs.map((chair) => (
                <div
                  key={chair.id}
                  className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className="h-48 bg-gradient-to-br from-accent-orange-dark to-accent-orange flex items-center justify-center relative">
                    <span className="text-7xl">{chair.image}</span>
                    <div className="absolute top-3 right-3 bg-accent-orange text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {chair.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{chair.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{chair.description}</p>

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-3xl font-bold text-accent-orange">{chair.price}€</span>
                      <div className="flex items-center bg-accent-orange-dark px-3 py-1 rounded-full">
                        <span className="text-yellow-500 text-lg">⭐</span>
                        <span className="ml-1 text-white font-semibold">{chair.rating}</span>
                      </div>
                    </div>

                    <button className="w-full bg-accent-orange text-white py-3 rounded-lg font-semibold hover:bg-accent-orange-dark transition-colors mb-2">
                      Ajouter au panier
                    </button>
                    <a href={`/produits/${chair.id}`} className="block w-full border-2 border-accent-orange text-accent-orange text-center py-2 rounded-lg font-semibold hover:bg-accent-orange hover:text-white transition-colors">
                      Détails
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2025 ChaiseHUB. Créé par Jean et Marc avec ❤️</p>
        </div>
      </footer>
    </div>
  );
}
