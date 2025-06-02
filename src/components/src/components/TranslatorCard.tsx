
import React from 'react';
import { Star, MessageSquare, Video, Phone, MapPin, Clock } from 'lucide-react';

interface TranslatorCardProps {
  translator: {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    pricePerHour: number;
    languages: string[];
    image: string;
    location: string;
    availability: string;
    completedSessions: number;
  };
  onBook: () => void;
}

const TranslatorCard = ({ translator, onBook }: TranslatorCardProps) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <img
              src={translator.image}
              alt={translator.name}
              className="w-16 h-16 rounded-full mr-4 border-4 border-white shadow-lg"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
                {translator.name}
              </h3>
              <p className="text-emerald-600 font-medium">{translator.specialty}</p>
              <div className="flex items-center mt-1">
                <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                <span className="text-sm text-gray-600">{translator.location}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-600">{translator.pricePerHour}€</div>
            <div className="text-sm text-gray-500">par heure</div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="ml-1 font-semibold">{translator.rating}</span>
            <span className="text-gray-500 ml-1">({translator.completedSessions} séances)</span>
          </div>
          <div className="flex items-center text-green-600">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">{translator.availability}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {translator.languages.map((lang, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Video className="w-4 h-4 text-green-600" />
            </div>
            <div className="p-2 bg-blue-100 rounded-lg">
              <Phone className="w-4 h-4 text-blue-600" />
            </div>
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageSquare className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <button
            onClick={onBook}
            className="px-6 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors font-medium"
          >
            Réserver
          </button>
        </div>
      </div>
    </div>
  );
};

export default TranslatorCard;
