import { ProductCard } from './components/ProductCard';
import { getAllChairs } from './services/chairService';
import { HeaderLight } from './components/HeaderLight';

export default async function Home() {
  const chairs = await getAllChairs();
  
  // Récupérer les 3 meilleures chaises par rating
  const topChairs = chairs
    .sort((a: any, b: any) => b.rating - a.rating)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-linear-to-r from-blue-50 to-indigo-50 text-foreground">
      <HeaderLight theme="light" />

      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold text-accent-orange mb-6">Bienvenue chez ChaiseHUB</h1>
        <p className="text-2xl text-mist-800 mb-8">Les meilleures chaises pour votre confort</p>
        <div className="text-6xl mb-8">🪑</div>
      </section>

      <section className="bg-linear-to-r from-blue-50 to-indigo-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-accent-orange">Notre Histoire</h2>
          <div className="mt-12 bg-blue-50 rounded-lg p-8 shadow-md">
            <p className="text-lg text-mist-700 text-center mb-4">
              C'est en 2025 que deux amis passionnés, <strong>Jean</strong> et <strong>Marc</strong>, 
              ont eu une idée révolutionnaire : créer un site offrant les meilleures chaises du marché 
              avec un service client incomparable.
            </p>
            <p className="text-lg text-gray-700 text-center">
              Leur mission ? Transformer chaque moment assis en une expérience de confort premium. 
              Chez ChaiseHUB, nous croyons que tout le monde mérite une bonne chaise.
            </p>
          </div>
        </div>
      </section>
      
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-4 text-accent-orange">Nos Meilleures Chaises</h2>
        <p className="text-center text-mist-800 mb-12">Sélection premium de nos produits les plus appréciés</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {topChairs.map((chair) => (
            <ProductCard key={chair.id} chair={chair} />
          ))}
        </div>
      </section>

      <section className="bg-accent-orange text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Découvrez Tous Nos Produits</h2>
          <p className="text-xl mb-8 text-accent-orange-100">Parcourez notre collection complète de chaises pour tous les budgets</p>
          <a href="/produits" className="inline-block bg-white border-2 border-white text-accent-orange px-8 py-4 rounded-lg font-bold text-lg hover:bg-accent-orange-dark hover:text-white hover:cursor-pointer duration-500 transition-colors">
            Voir tous les produits
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>&copy; 2025 ChaiseHUB. Créé par Jean et Marc avec amour</p>
        </div>
      </footer>
    </div>
  );
}
