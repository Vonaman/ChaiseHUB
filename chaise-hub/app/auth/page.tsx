'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAccount, registerAccount } from '../services/accountService';
import { HeaderLight } from '../components/HeaderLight';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await loginAccount({
        email: formData.email,
        passwordHash: formData.password,
      });

      // Sauvegarder l'utilisateur dans localStorage
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email,
      }));

      setSuccess('Connexion réussie ! Redirection...');
      setTimeout(() => {
        router.push('/compte');
      }, 1500);
    } catch (err) {
      setError('Email ou mot de passe incorrect');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }

    try {
      const user = await registerAccount({
        username: formData.username,
        email: formData.email,
        passwordHash: formData.password,
      });

      // Sauvegarder l'utilisateur dans localStorage
      localStorage.setItem('user', JSON.stringify({
        id: user.id,
        username: user.username,
        email: user.email,
      }));

      setSuccess('Inscription réussie ! Redirection...');
      setTimeout(() => {
        router.push('/compte');
      }, 1500);
    } catch (err) {
      setError('Erreur lors de l\'inscription. Cet email existe peut-être déjà.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = isLogin ? handleLogin : handleRegister;

  return (
    <div className="min-h-screen bg-white">
      <HeaderLight theme="light" />

      {/* Auth Container */}
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Connexion' : 'Inscription'}
            </h1>
            <p className="text-gray-600">
              {isLogin
                ? 'Connectez-vous à votre compte ChaiseHUB'
                : 'Créez votre compte ChaiseHUB'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Registration-only fields */}
            {!isLogin && (
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-900 mb-2">
                  Nom d'utilisateur
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange text-gray-900"
                  placeholder="Votre nom d'utilisateur"
                />
              </div>
            )}

            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange text-gray-900"
                placeholder="votre@email.com"
              />
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange text-gray-900"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password field (registration only) */}
            {!isLogin && (
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-900 mb-2">
                  Confirmer le mot de passe
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-orange text-gray-900"
                  placeholder="••••••••"
                />
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Success message */}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-sm">
                {success}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-accent-orange text-white py-3 rounded-lg font-bold hover:bg-accent-orange-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Chargement...' : isLogin ? 'Se connecter' : "S'inscrire"}
            </button>
          </form>

          {/* Toggle login/register */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? "Vous n'avez pas de compte ?" : 'Vous avez déjà un compte ?'}
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setSuccess('');
                  setFormData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                  });
                }}
                className="ml-2 text-accent-orange font-bold hover:underline"
              >
                {isLogin ? "S'inscrire" : 'Se connecter'}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 text-gray-600 py-8 border-t border-gray-300">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>&copy; 2025 ChaiseHUB. Créé par Jean et Marc avec ❤️</p>
        </div>
      </footer>
    </div>
  );
}
