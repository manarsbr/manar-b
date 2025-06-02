
import React, { useState } from 'react';
import { X, Calendar, Clock, User, Star, Video, MessageSquare, Phone } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  translator: {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    pricePerHour: number;
    languages: string[];
    image: string;
  } | null;
}

const BookingModal = ({ isOpen, onClose, translator }: BookingModalProps) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('30');
  const [sessionType, setSessionType] = useState('video');
  const [description, setDescription] = useState('');

  if (!isOpen || !translator) return null;

  const handleBooking = () => {
    console.log('Booking submitted:', {
      translator: translator.id,
      date: selectedDate,
      time: selectedTime,
      duration,
      sessionType,
      description
    });
    // Ici on ajouterait la logique de réservation
    onClose();
    alert('Réservation confirmée ! Vous recevrez un email de confirmation.');
  };

  const totalPrice = (parseInt(duration) / 60) * translator.pricePerHour;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Réserver une séance</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Translator Info */}
          <div className="flex items-center mb-6 p-4 bg-gray-50 rounded-2xl">
            <img src={translator.image} alt={translator.name} className="w-16 h-16 rounded-full mr-4" />
            <div>
              <h3 className="text-xl font-semibold">{translator.name}</h3>
              <p className="text-gray-600">{translator.specialty}</p>
              <div className="flex items-center mt-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm">{translator.rating}/5</span>
                <span className="ml-3 text-emerald-600 font-semibold">{translator.pricePerHour}€/h</span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Heure</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <select
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Sélectionner l'heure</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Durée (minutes)</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              >
                <option value="30">30 minutes</option>
                <option value="60">1 heure</option>
                <option value="90">1h30</option>
                <option value="120">2 heures</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Type de séance</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSessionType('video')}
                  className={`flex-1 p-3 rounded-xl border flex items-center justify-center ${
                    sessionType === 'video' ? 'bg-emerald-100 border-emerald-500' : 'border-gray-300'
                  }`}
                >
                  <Video className="w-5 h-5 mr-2" />
                  Vidéo
                </button>
                <button
                  onClick={() => setSessionType('audio')}
                  className={`flex-1 p-3 rounded-xl border flex items-center justify-center ${
                    sessionType === 'audio' ? 'bg-emerald-100 border-emerald-500' : 'border-gray-300'
                  }`}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Audio
                </button>
                <button
                  onClick={() => setSessionType('chat')}
                  className={`flex-1 p-3 rounded-xl border flex items-center justify-center ${
                    sessionType === 'chat' ? 'bg-emerald-100 border-emerald-500' : 'border-gray-300'
                  }`}
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chat
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Description du besoin</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez brièvement votre besoin de traduction..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              rows={3}
            />
          </div>

          {/* Price Summary */}
          <div className="mt-6 p-4 bg-emerald-50 rounded-2xl">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold text-emerald-600">{totalPrice.toFixed(2)}€</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {duration} minutes à {translator.pricePerHour}€/h
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime}
              className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Confirmer la réservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
