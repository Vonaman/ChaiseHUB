'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { HeaderLight } from '../components/HeaderLight';

interface User {
  id: number;
  username: string;
  email: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export default function ComptePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer l'utilisateur du localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Erreur lors du parsing de l\'utilisateur:', error);
        router.push('/auth');
      }
    } else {
      router.push('/auth');
    }

    // Récupérer le panier du localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error('Erreur lors du parsing du panier:', error);
      }
    }

    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    router.push('/');
  };

  const removeFromCart = (itemId: number) => {
    const updated = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    const updated = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity } : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Chargement...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderLight theme="light" />

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Section Profil */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Bonjour <span className="text-accent-orange">{user.username}</span>
              </h1>
              <p className="text-gray-600">Votre email: {user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Déconnexion
            </button>
          </div>
        </section>

        {/* Section Panier */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Mon Panier</h2>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">Votre panier est vide</p>
              <a
                href="/produits"
                className="inline-block px-6 py-2 bg-accent-orange text-white rounded-lg hover:bg-orange-600 transition"
              >
                Continuer vos achats
              </a>
            </div>
          ) : (
            <div>
              {/* Liste des articles */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">{item.price}€</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                      <div className="w-20 text-right font-semibold">
                        {(item.price * item.quantity).toFixed(2)}€
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Résumé */}
              <div className="border-t-2 pt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">Total:</span>
                <span className="text-2xl font-bold text-accent-orange">{totalPrice.toFixed(2)}€</span>
              </div>

              {/* Bouton Passer la commande */}
              <button className="w-full mt-6 px-6 py-3 bg-accent-orange text-white font-semibold rounded-lg hover:bg-orange-600 transition">
                Passer la commande
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
