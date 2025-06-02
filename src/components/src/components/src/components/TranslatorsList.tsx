
import React, { useState } from 'react';
import { Search, Filter, Globe } from 'lucide-react';
import TranslatorCard from './TranslatorCard';
import BookingModal from './BookingModal';

const TranslatorsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedTranslator, setSelectedTranslator] = useState(null);

  const translators = [
    {
      id: '1',
      name: 'Amina Belkacem',
      specialty: 'Traduction Juridique',
      rating: 4.9,
      pricePerHour: 35,
      languages: ['Français', 'Arabe', 'Anglais'],
      image: '/placeholder.svg',
      location: 'Alger, Algérie',
      availability: 'Disponible maintenant',
      completedSessions: 156
    },
    {
      id: '2',
      name: 'Karim Mesmoudi',
      specialty: 'Traduction Médicale',
      rating: 4.8,
      pricePerHour: 40,
      languages: ['Français', 'Arabe', 'Espagnol'],
      image: '/placeholder.svg',
      location: 'Oran, Algérie',
      availability: 'Disponible dans 30min',
      completedSessions: 203
    },
    {
      id: '3',
      name: 'Fatima Zahra Hadj',
      specialty: 'Documents Administratifs',
      rating: 4.7,
      pricePerHour: 25,
      languages: ['Français', 'Arabe', 'Italien'],
      image: '/placeholder.svg',
      location: 'Constantine, Algérie',
      availability: 'Disponible maintenant',
      completedSessions: 98
    },
    {
      id: '4',
      name: 'Youcef Benali',
      specialty: 'Traduction Business',
      rating: 4.9,
      pricePerHour: 45,
      languages: ['Français', 'Arabe', 'Anglais', 'Allemand'],
      image: '/placeholder.svg',
      location: 'Annaba, Algérie',
      availability: 'Disponible maintenant',
      completedSessions: 312
    },
    {
      id: '5',
      name: 'Samira Boudiaf',
      specialty: 'Traduction Juridique',
      rating: 4.8,
      pricePerHour: 38,
      languages: ['Français', 'Arabe', 'Portugais'],
      image: '/placeholder.svg',
      location: 'Sétif, Algérie',
      availability: 'Disponible dans 1h',
      completedSessions: 89
    },
    {
      id: '6',
      name: 'Omar Kaddour',
      specialty: 'Traduction Technique',
      rating: 4.6,
      pricePerHour: 32,
      languages: ['Français', 'Arabe', 'Anglais'],
      image: '/placeholder.svg',
      location: 'Batna, Algérie',
      availability: 'Disponible maintenant',
      completedSessions: 145
    }
  ];

  const specialties = ['Traduction Juridique', 'Traduction Médicale', 'Documents Administratifs', 'Traduction Business', 'Traduction Technique'];
  const languages = ['Français', 'Arabe', 'Anglais', 'Espagnol', 'Italien', 'Allemand', 'Portugais'];

  const filteredTranslators = translators.filter(translator => {
    const matchesSearch = translator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         translator.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || translator.specialty === selectedSpecialty;
    const matchesLanguage = !selectedLanguage || translator.languages.includes(selectedLanguage);
    
    return matchesSearch && matchesSpecialty && matchesLanguage;
  });

  const handleBookTranslator = (translator) => {
    setSelectedTranslator(translator);
    setIsBookingModalOpen(true);
  };

  return (
    <section id="traducteurs" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Globe className="text-emerald-600 w-12 h-12" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Nos Traducteurs Experts
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez notre équipe de traducteurs professionnels algériens, 
            spécialisés dans différents domaines et disponibles 24h/24.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un traducteur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Toutes les spécialités</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Globe className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="">Toutes les langues</option>
                {languages.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </div>

            <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors font-medium">
              Rechercher
            </button>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-8">
          <p className="text-gray-600">
            <span className="font-semibold">{filteredTranslators.length}</span> traducteur(s) trouvé(s)
          </p>
        </div>

        {/* Translators Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTranslators.map((translator) => (
            <TranslatorCard
              key={translator.id}
              translator={translator}
              onBook={() => handleBookTranslator(translator)}
            />
          ))}
        </div>

        {filteredTranslators.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucun traducteur ne correspond à vos critères de recherche.</p>
          </div>
        )}
      </div>

      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        translator={selectedTranslator}
      />
    </section>
  );
};

export default TranslatorsList;
