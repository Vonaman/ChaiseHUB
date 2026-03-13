'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function ProductPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);

  const allChairs = [
    {
      id: 1,
      name: "Chaise Ergonomique Premium",
      price: 299,
      rating: 4.8,
      image: "🪑",
      description: "Confort maximal pour vos longues journées",
      category: "Ergonomique",
      fullDescription: "La chaise ergonomique premium est conçue pour offrir un confort ultime lors de vos longues journées de travail. Avec son soutien lombaire ajustable et ses accoudoirs ergonomiques, elle garantit une posture parfaite et réduit la fatigue.",
      features: [
        "Soutien lombaire ajustable",
        "Accoudoirs ergonomiques",
        "Siège en mesh respirant",
        "Roulettes silencieuses",
        "Hauteur ajustable (15cm)",
        "Garantie 5 ans"
      ],
      specs: {
        "Dimensions": "65 x 65 x 110-125 cm",
        "Poids": "18 kg",
        "Matériau": "Mesh + Acier",
        "Couleur": "Noir",
        "Rotation": "360°",
        "Poids max": "150 kg"
      },
      reviews: 234
    },
    {
      id: 2,
      name: "Chaise Design Moderne",
      price: 199,
      rating: 4.6,
      image: "🪑",
      description: "Élégance et praticité réunies",
      category: "Design",
      fullDescription: "Combinant élégance et fonctionnalité, cette chaise design moderne s'adapte à tous les intérieurs. Son design épuré et ses lignes minimalistes en font un excellent choix pour les bureaux modernes.",
      features: [
        "Design scandinave",
        "Siège rembourré confortable",
        "Pieds en bois naturel",
        "Coloris multiples",
        "Légère et transportable",
        "Facile à nettoyer"
      ],
      specs: {
        "Dimensions": "55 x 60 x 85 cm",
        "Poids": "12 kg",
        "Matériau": "Bois + Tissu",
        "Couleur": "Gris",
        "Style": "Scandinave",
        "Poids max": "120 kg"
      },
      reviews: 156
    },
    {
      id: 3,
      name: "Chaise Gaming Ultimate",
      price: 349,
      rating: 4.9,
      image: "🪑",
      description: "Performance et style pour les gamers",
      category: "Gaming",
      fullDescription: "La chaise gaming ultime offre le meilleur rapport entre performance et style. Avec son soutien lombaire intégré et ses accoudoirs ajustables, elle vous permettra de jouer des heures sans fatigue.",
      features: [
        "Soutien lombaire intégré",
        "Accoudoirs 4D ajustables",
        "Appui-tête réglable",
        "Siège en PU résistant",
        "Inclinaison 180°",
        "Base renforcée"
      ],
      specs: {
        "Dimensions": "70 x 70 x 120-135 cm",
        "Poids": "22 kg",
        "Matériau": "PU + Acier",
        "Couleur": "Noir/Rouge",
        "Inclinaison": "180°",
        "Poids max": "160 kg"
      },
      reviews: 312
    },
    {
      id: 4,
      name: "Chaise Classique Bois",
      price: 149,
      rating: 4.4,
      image: "🪑",
      description: "Intemporelle et robuste",
      category: "Classique",
      fullDescription: "Une chaise classique intemporelle, parfaite pour les amateurs de styles traditionnels. Construite avec du bois massif et un rembourrage de qualité, elle allie durabilité et confort.",
      features: [
        "Bois massif de qualité",
        "Rembourrage épais",
        "Design intemporel",
        "Très robuste",
        "Facile à restaurer",
        "Style traditionnel"
      ],
      specs: {
        "Dimensions": "50 x 50 x 90 cm",
        "Poids": "15 kg",
        "Matériau": "Bois massif + Daim",
        "Couleur": "Chêne naturel",
        "Style": "Classique",
        "Poids max": "130 kg"
      },
      reviews: 89
    },
    {
      id: 5,
      name: "Chaise de Bureau Executive",
      price: 399,
      rating: 4.7,
      image: "🪑",
      description: "Pour les professionnels exigeants",
      category: "Bureau",
      fullDescription: "Destinée aux dirigeants et professionnels exigeants, cette chaise de bureau executive allie luxe et fonctionnalité. Avec son design élégant et ses matériaux haut de gamme, elle transforme votre espace de travail.",
      features: [
        "Cuir véritable",
        "Soutien lombaire premium",
        "Accoudoirs cuir",
        "Base chromée",
        "Hauteur ajustable",
        "Garantie 7 ans"
      ],
      specs: {
        "Dimensions": "68 x 68 x 115-130 cm",
        "Poids": "25 kg",
        "Matériau": "Cuir véritable + Acier chromé",
        "Couleur": "Noir élégant",
        "Rotation": "360°",
        "Poids max": "160 kg"
      },
      reviews: 198
    },
    {
      id: 6,
      name: "Chaise Scandinave",
      price: 179,
      rating: 4.5,
      image: "🪑",
      description: "Minimaliste et fonctionnelle",
      category: "Design",
      fullDescription: "Inspirée du design scandinave, cette chaise combine minimalisme et fonctionnalité. Parfaite pour les espaces petits et modernes, elle apporte une touche nordique à votre intérieur.",
      features: [
        "Design minimaliste",
        "Pieds en bois clair",
        "Siège confortable",
        "Légère",
        "Empilable",
        "Écologique"
      ],
      specs: {
        "Dimensions": "52 x 52 x 80 cm",
        "Poids": "10 kg",
        "Matériau": "Bois + Textile",
        "Couleur": "Blanc/Bois",
        "Style": "Scandinave",
        "Poids max": "110 kg"
      },
      reviews: 127
    },
    {
      id: 7,
      name: "Chaise Gaming RGB",
      price: 389,
      rating: 4.8,
      image: "🪑",
      description: "Avec LED intégrées",
      category: "Gaming",
      fullDescription: "Cette chaise gaming RGB combine performance et esthétique avec ses LED intégrées. Parfaite pour créer l'ambiance gaming ultime dans votre setup.",
      features: [
        "LED RGB intégrées",
        "Contrôle RGB via USB",
        "Soutien lombaire intégré",
        "Appui-tête en mousse",
        "Accoudoirs ajustables",
        "Coussin lombaire amovible"
      ],
      specs: {
        "Dimensions": "72 x 72 x 125-140 cm",
        "Poids": "24 kg",
        "Matériau": "PU + Acier",
        "Couleur": "Noir avec RGB",
        "LED": "16.8M de couleurs",
        "Poids max": "160 kg"
      },
      reviews: 267
    },
    {
      id: 8,
      name: "Chaise Médicale",
      price: 449,
      rating: 4.9,
      image: "🪑",
      description: "Approuvée par les professionnels",
      category: "Ergonomique",
      fullDescription: "Approuvée par les professionnels de santé, cette chaise médicale garantit une posture parfaite et réduit les risques de problèmes de dos chroniques.",
      features: [
        "Approuvée médicalement",
        "Soutien lombaire certifié",
        "Accoudoirs médicaux",
        "Hauteur précise",
        "Rotation lisse",
        "Norme ergonomique ISO"
      ],
      specs: {
        "Dimensions": "70 x 70 x 115-130 cm",
        "Poids": "20 kg",
        "Matériau": "Mesh + Acier",
        "Couleur": "Blanc",
        "Certification": "ISO 9001",
        "Poids max": "150 kg"
      },
      reviews: 201
    },
    {
      id: 9,
      name: "Chaise de Cuisine",
      price: 89,
      rating: 4.2,
      image: "🪑",
      description: "Pratique et élégante",
      category: "Cuisine",
      fullDescription: "Chaise pratique pour la cuisine, combinant style et facilité de nettoyage. Parfaite pour les familles qui cherchent un meuble durable et abordable.",
      features: [
        "Facile à nettoyer",
        "Design simple",
        "Pieds en métal",
        "Siège rembourré",
        "Empilable",
        "Bon rapport qualité-prix"
      ],
      specs: {
        "Dimensions": "48 x 48 x 85 cm",
        "Poids": "8 kg",
        "Matériau": "Bois + Métal",
        "Couleur": "Gris/Noir",
        "Style": "Contemporain",
        "Poids max": "100 kg"
      },
      reviews: 342
    },
    {
      id: 10,
      name: "Chaise Haute Gaming",
      price: 329,
      rating: 4.6,
      image: "🪑",
      description: "Design agressif pour gamers",
      category: "Gaming",
      fullDescription: "Avec son design agressif et sporty, cette chaise haute gaming est parfaite pour les gamers qui veulent un style unique. Offre un soutien exceptionnel.",
      features: [
        "Design agressif sporty",
        "Soutien latéral",
        "Appui-tête intégré",
        "Ceinture de maintien",
        "Accoudoirs renforcés",
        "Base large"
      ],
      specs: {
        "Dimensions": "75 x 75 x 130-145 cm",
        "Poids": "23 kg",
        "Matériau": "PU + Acier",
        "Couleur": "Noir/Gris",
        "Inclinaison": "145°",
        "Poids max": "160 kg"
      },
      reviews: 189
    },
    {
      id: 11,
      name: "Chaise Lounge Relax",
      price: 259,
      rating: 4.7,
      image: "🪑",
      description: "Inclinable et confortable",
      category: "Relaxation",
      fullDescription: "La chaise lounge relax offre un confort ultime avec son dossier entièrement inclinable. Idéale pour se détendre après une longue journée.",
      features: [
        "Dossier inclinable 180°",
        "Repose-pieds ajustable",
        "Rembourrage moelleux",
        "Design ergonomique",
        "Siège large",
        "Très confortable"
      ],
      specs: {
        "Dimensions": "80 x 80 x 100-180 cm",
        "Poids": "19 kg",
        "Matériau": "Tissu + Acier",
        "Couleur": "Gris clair",
        "Inclinaison": "180°",
        "Poids max": "140 kg"
      },
      reviews: 224
    },
    {
      id: 12,
      name: "Chaise Visiteur",
      price: 129,
      rating: 4.3,
      image: "🪑",
      description: "Parfaite pour les bureaux",
      category: "Bureau",
      fullDescription: "Chaise visiteur professionnelle et élégante, parfaite pour accueillir vos visiteurs en toute élégance. Design intemporel et durable.",
      features: [
        "Design professionnel",
        "Coussin rembourré",
        "Pieds en métal",
        "Facile à déplacer",
        "Empilable",
        "Entretien facile"
      ],
      specs: {
        "Dimensions": "56 x 56 x 88 cm",
        "Poids": "11 kg",
        "Matériau": "Tissu + Acier",
        "Couleur": "Noir",
        "Style": "Professionnel",
        "Poids max": "120 kg"
      },
      reviews: 156
    },
    {
      id: 13,
      name: "Chaise Transparente",
      price: 169,
      rating: 4.4,
      image: "🪑",
      description: "Design ultra-moderne",
      category: "Design",
      fullDescription: "Chaise transparente au design ultra-moderne, parfaite pour les intérieurs contemporains. Légère et élégante, elle crée une sensation d'espace.",
      features: [
        "Polycarbonate transparent",
        "Design moderne",
        "Très légère",
        "Empilable",
        "Résistante UV",
        "Lavable"
      ],
      specs: {
        "Dimensions": "54 x 54 x 82 cm",
        "Poids": "6 kg",
        "Matériau": "Polycarbonate",
        "Couleur": "Transparent",
        "Style": "Contemporain",
        "Poids max": "110 kg"
      },
      reviews: 98
    },
    {
      id: 14,
      name: "Chaise de Réunion",
      price: 219,
      rating: 4.5,
      image: "🪑",
      description: "Parfaite pour les réunions",
      category: "Bureau",
      fullDescription: "Chaise de réunion confortable et professionnelle, conçue pour des sessions longues. Parfaite pour les salles de conférence modernes.",
      features: [
        "Confort longue durée",
        "Design professionnel",
        "Roulettes silencieuses",
        "Hauteur ajustable",
        "Accoudoirs",
        "Garantie 3 ans"
      ],
      specs: {
        "Dimensions": "62 x 62 x 105-120 cm",
        "Poids": "16 kg",
        "Matériau": "Tissu + Acier",
        "Couleur": "Gris",
        "Rotation": "360°",
        "Poids max": "130 kg"
      },
      reviews: 134
    },
    {
      id: 15,
      name: "Chaise Enfant",
      price: 79,
      rating: 4.6,
      image: "🪑",
      description: "Sécurisée et amusante",
      category: "Enfant",
      fullDescription: "Chaise enfant sécurisée avec design amusant. Parfaite pour les petit(e)s à partir de 3 ans, elle combine sécurité et amusement.",
      features: [
        "Conforme aux normes de sécurité",
        "Design coloré amusant",
        "Hauteur adaptée enfants",
        "Siège rembourré",
        "Pieds antidérapants",
        "Léger et maniable"
      ],
      specs: {
        "Dimensions": "40 x 40 x 70 cm",
        "Poids": "5 kg",
        "Matériau": "Bois + Tissu",
        "Couleur": "Rose/Bleu",
        "Âge min": "3 ans",
        "Poids max": "60 kg"
      },
      reviews: 276
    }
  ];

  const product = allChairs.find(chair => chair.id === productId);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  if (!product) {
    return (
      <div className="min-h-screen bg-black">
        <header className="border-b border-gray-700">
          <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
            <a href="/" className="text-3xl font-bold text-orange-600 hover:opacity-80">ChaiseHUB</a>
            <div className="flex gap-8">
              <a href="/" className="text-gray-300 hover:text-orange-600">Accueil</a>
              <a href="/produits" className="text-gray-300 hover:text-orange-600 font-semibold text-orange-600">Produits</a>
              <a href="#" className="text-gray-300 hover:text-orange-600">À propos</a>
            </div>
          </nav>
        </header>
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
    <div className="min-h-screen bg-black">
      {/* Header / Navigation */}
      <header className="border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <a href="/" className="text-3xl font-bold text-blue-600 hover:opacity-80">ChaiseHUB</a>
          <div className="flex gap-8">
            <a href="/" className="text-gray-700 hover:text-blue-600">Accueil</a>
            <a href="/produits" className="text-gray-700 hover:text-blue-600 font-semibold text-blue-600">Produits</a>
            <a href="#" className="text-gray-700 hover:text-blue-600">À propos</a>
          </div>
        </nav>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4 text-gray-400">
        <a href="/produits" className="hover:text-orange-600">Produits</a>
        <span className="mx-2">/</span>
        <span className="text-gray-100 font-semibold">{product.name}</span>
      </div>

      {/* Main Product Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex flex-col items-center">
            <div className="w-full h-96 bg-gradient-to-br from-orange-900 to-orange-800 rounded-lg flex items-center justify-center mb-6">
              <span className="text-9xl">{product.image}</span>
            </div>
            <div className="flex gap-4 w-full">
              <div className="w-1/4 h-20 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200">
                <span className="text-4xl">{product.image}</span>
              </div>
              <div className="w-1/4 h-20 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200">
                <span className="text-4xl">{product.image}</span>
              </div>
              <div className="w-1/4 h-20 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200">
                <span className="text-4xl">{product.image}</span>
              </div>
              <div className="w-1/4 h-20 bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-200">
                <span className="text-4xl">{product.image}</span>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {product.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center">
                <span className="text-yellow-500 text-2xl">⭐</span>
                <span className="ml-2 text-xl font-semibold text-white">{product.rating}</span>
                <span className="ml-2 text-gray-400">({product.reviews} avis)</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-gray-700">
              <p className="text-5xl font-bold text-orange-600 mb-2">{product.price}€</p>
              <p className="text-gray-400">Livraison gratuite à partir de 50€</p>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-300 mb-8">{product.fullDescription}</p>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border border-gray-700 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-xl text-gray-400 hover:bg-gray-800"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center py-3 border-0 outline-none bg-gray-800 text-white"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-xl text-gray-400 hover:bg-gray-800"
                >
                  +
                </button>
              </div>
              <button className="flex-1 bg-orange-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-orange-700 transition-colors">
                Ajouter au panier
              </button>
            </div>

            {/* Buy Now Button */}
            <button className="w-full border-2 border-orange-600 text-orange-600 py-3 rounded-lg font-bold text-lg hover:bg-orange-600 hover:text-white transition-colors mb-8">
              Acheter maintenant
            </button>

            {/* Key Features */}
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="font-bold text-lg text-white mb-4">Points Clés</h3>
              <ul className="space-y-2">
                {product.features.slice(0, 4).map((feature, index) => (
                  <li key={index} className="text-gray-300 flex items-center">
                    <span className="text-orange-600 mr-3 text-lg">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 border-t border-gray-700">
        <div className="flex gap-8 border-b border-gray-700 mb-8">
          {['description', 'caracteristiques', 'avis'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 font-semibold border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab === 'description' ? 'Description' : tab === 'caracteristiques' ? 'Caractéristiques' : 'Avis Clients'}
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

          {activeTab === 'avis' && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Avis Clients</h3>
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
                <div>
                  <p className="text-4xl font-bold text-blue-600">{product.rating}</p>
                  <p className="text-gray-600">sur 5</p>
                </div>
                <div>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-500 text-2xl' : 'text-gray-300 text-2xl'}>
                        ⭐
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-600">{product.reviews} avis vérifiés</p>
                </div>
              </div>
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border border-gray-200 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-bold text-gray-900">Client Satisfait {i}</p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, j) => (
                          <span key={j} className={j < (5 - i) ? 'text-yellow-500 text-lg' : 'text-gray-300 text-lg'}>
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
          )}
        </div>
      </section>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-12 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Produits Similaires</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {similarProducts.map((similar) => (
              <a
                key={similar.id}
                href={`/produits/${similar.id}`}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="h-40 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <span className="text-6xl">{similar.image}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{similar.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{similar.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">{similar.price}€</span>
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
      <footer className="bg-gray-900 text-gray-400 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2025 ChaiseHUB. Créé par Jean et Marc avec ❤️</p>
        </div>
      </footer>
    </div>
  );
}
