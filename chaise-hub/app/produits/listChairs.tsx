'use client';

import { useState } from 'react';
import { Chair } from '../services/chairService';
import { ProductCard } from '../components/ProductCard';
import { HeaderLight } from '../components/HeaderLight';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/authContext';
import { addToCart } from '../services/cartService';

export const ListChairs = ({ chairs }: { chairs: Chair[] }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleAddToCart = async (chair: Chair) => {
    if (loading) return; // évite un faux négatif pendant le chargement initial

    if (!user) {
      router.push('/login');
      return;
    }

    try {
      await addToCart(chair.id, 1);
      // ici tu peux mettre à jour ton state panier global / toast de confirmation
    } catch (err) {
      console.error(err);
    }
  };

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
    <div className="min-h-screen from-blue-50 to-indigo-50">
      <HeaderLight theme="light" />

      {/* Page Title */}
      <section className="bg-gradient-to-r from-blue-100 to-indigo-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-black mb-2">Tous nos produits</h1>
          <p className="text-gray-400">{filteredChairs.length} chaise(s) disponible(s)</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-1">
          <div className="sticky top-6 space-y-6">
            {/* Category Filter */}
            <div>
            <h3 className="font-bold text-lg text-black mb-4">Catégories</h3>
            <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat
                        ? 'bg-accent-orange text-white font-semibold'
                        : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h3 className="font-bold text-lg text-black mb-4">Prix Maximum</h3>
              <div className="space-y-3">
                <input
                  type="range"
                  min="50"
                  max="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full cursor-pointer"
                />
                <p className="text-gray-700 font-semibold">Jusqu'à {priceRange}€</p>
              </div>
            </div>

            {/* Sort Filter */}
            <div>
              <h3 className="font-bold text-lg text-black mb-4">Trier par</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-400 bg-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange"
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
                <ProductCard key={chair.id} chair={chair} onAddToCart={handleAddToCart}/>
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2025 ChaiseHUB. Créé par Jean et Marc avec passion pour Mr Jalabert</p>
        </div>
      </footer>
    </div>
  );
}
