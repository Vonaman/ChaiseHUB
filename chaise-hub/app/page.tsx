export default function Home() {
  const topChairs = [
    {
      id: 1,
      name: "Chaise Ergonomique Premium",
      price: "299€",
      rating: 4.8,
      image: "🪑",
      description: "Confort maximal pour vos longues journées"
    },
    {
      id: 2,
      name: "Chaise Design Moderne",
      price: "199€",
      rating: 4.6,
      image: "🪑",
      description: "Élégance et praticité réunies"
    },
    {
      id: 3,
      name: "Chaise Gaming Ultimate",
      price: "349€",
      rating: 4.9,
      image: "🪑",
      description: "Performance et style pour les gamers"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header / Navigation */}
      <header className="border-b border-gray-700">
        <nav className="max-w-6xl mx-auto px-6 py-6 flex justify-between items-center">
          <div className="text-3xl font-bold text-orange-600">ChaiseHUB</div>
          <div className="flex gap-8">
            <a href="/" className="text-gray-300 hover:text-orange-600">Accueil</a>
            <a href="/produits" className="text-gray-300 hover:text-orange-600">Produits</a>
            <a href="#" className="text-gray-300 hover:text-orange-600">À propos</a>
          </div>
        </nav>
      </header>

      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">Bienvenue chez ChaiseHUB</h1>
        <p className="text-2xl text-gray-400 mb-8">Les meilleures chaises pour votre confort</p>
        <div className="text-6xl mb-8">🪑</div>
      </section>

      <section className="bg-linear-to-r from-blue-50 to-indigo-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12 text-white">Notre Histoire</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <div className="text-8xl mb-4">👨‍💼</div>
              <h3 className="text-2xl font-bold text-white mb-2">Jean</h3>
              <p className="text-gray-400">Expert en ergonomie et design</p>
            </div>
            <div className="text-center">
              <div className="text-8xl mb-4">👨‍💻</div>
              <h3 className="text-2xl font-bold text-white mb-2">Marc</h3>
              <p className="text-gray-400">Passionné par l'innovation</p>
            </div>
          </div>
          <div className="mt-12 bg-gray-800 rounded-lg p-8 shadow-md">
            <p className="text-lg text-gray-300 text-center mb-4">
              C'est en 2025 que deux amis passionnés, <strong>Jean</strong> et <strong>Marc</strong>, 
              ont eu une idée révolutionnaire : créer un site offrant les meilleures chaises du marché 
              avec un service client incomparable.
            </p>
            <p className="text-lg text-gray-300 text-center">
              Leur mission ? Transformer chaque moment assis en une expérience de confort premium. 
              Chez ChaiseHUB, nous croyons que tout le monde mérite une bonne chaise.
            </p>
          </div>
        </div>
      </section>
      
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">Nos Meilleures Chaises</h2>
        <p className="text-center text-gray-400 mb-12">Sélection premium de nos produits les plus appréciés</p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {topChairs.map((chair) => (
            <div 
              key={chair.id} 
              className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-40 bg-gradient-to-br from-orange-900 to-orange-800 flex items-center justify-center">
                <span className="text-6xl">{chair.image}</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{chair.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{chair.description}</p>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-orange-600">{chair.price}€</span>
                  <div className="flex items-center">
                    <span className="text-yellow-500">⭐</span>
                    <span className="ml-1 text-gray-300 font-semibold">{chair.rating}</span>
                  </div>
                </div>
                
                <button className="w-full bg-orange-600 text-white py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-orange-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Découvrez Tous Nos Produits</h2>
          <p className="text-xl mb-8 text-orange-100">Parcourez notre collection complète de chaises pour tous les budgets</p>
          <a href="/produits" className="inline-block bg-white border-2 border-white text-orange-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-orange-700 hover:text-white hover:cursor-pointer duration-500 transition-colors">
            Voir tous les produits
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>&copy; 2025 ChaiseHUB. Créé par Jean et Marc avec ❤️</p>
        </div>
      </footer>
    </div>
  );
}
