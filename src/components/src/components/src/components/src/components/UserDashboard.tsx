
import React, { useState } from 'react';
import { Calendar, Clock, User, Star, Download, MessageSquare, Video, Phone } from 'lucide-react';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingBookings = [
    {
      id: '1',
      translatorName: 'Amina Belkacem',
      specialty: 'Traduction Juridique',
      date: '2024-06-05',
      time: '14:00',
      duration: 60,
      type: 'video',
      status: 'confirmed',
      price: 35
    },
    {
      id: '2',
      translatorName: 'Karim Mesmoudi',
      specialty: 'Traduction Médicale',
      date: '2024-06-07',
      time: '10:00',
      duration: 90,
      type: 'audio',
      status: 'pending',
      price: 60
    }
  ];

  const pastBookings = [
    {
      id: '3',
      translatorName: 'Fatima Zahra Hadj',
      specialty: 'Documents Administratifs',
      date: '2024-05-28',
      time: '16:00',
      duration: 45,
      type: 'chat',
      status: 'completed',
      price: 18.75,
      rating: 5
    },
    {
      id: '4',
      translatorName: 'Youcef Benali',
      specialty: 'Traduction Business',
      date: '2024-05-25',
      time: '11:00',
      duration: 120,
      type: 'video',
      status: 'completed',
      price: 90,
      rating: 4
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'audio': return <Phone className="w-4 h-4" />;
      case 'chat': return <MessageSquare className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  return (
    <section id="dashboard" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Mon Tableau de Bord
            </h2>
            <p className="text-xl text-gray-600">
              Gérez vos réservations et suivez l'historique de vos séances de traduction.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Séances Total</p>
                  <p className="text-3xl font-bold text-gray-800">12</p>
                </div>
                <Calendar className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Temps Total</p>
                  <p className="text-3xl font-bold text-gray-800">18h</p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Note Moyenne</p>
                  <p className="text-3xl font-bold text-gray-800">4.8</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">Économisé</p>
                  <p className="text-3xl font-bold text-gray-800">45%</p>
                </div>
                <User className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                    activeTab === 'upcoming'
                      ? 'bg-emerald-50 text-emerald-600 border-b-2 border-emerald-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Réservations à venir ({upcomingBookings.length})
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`flex-1 px-6 py-4 text-center font-medium transition-colors ${
                    activeTab === 'past'
                      ? 'bg-emerald-50 text-emerald-600 border-b-2 border-emerald-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Historique ({pastBookings.length})
                </button>
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'upcoming' && (
                <div className="space-y-4">
                  {upcomingBookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                            {getTypeIcon(booking.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{booking.translatorName}</h3>
                            <p className="text-gray-600">{booking.specialty}</p>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <Calendar className="w-4 h-4 mr-1" />
                              {booking.date} à {booking.time}
                              <Clock className="w-4 h-4 ml-3 mr-1" />
                              {booking.duration} min
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status === 'confirmed' ? 'Confirmé' : 'En attente'}
                          </span>
                          <p className="text-xl font-bold text-gray-800 mt-2">{booking.price}€</p>
                          <div className="flex gap-2 mt-3">
                            <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm">
                              Rejoindre
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                              Modifier
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'past' && (
                <div className="space-y-4">
                  {pastBookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            {getTypeIcon(booking.type)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{booking.translatorName}</h3>
                            <p className="text-gray-600">{booking.specialty}</p>
                            <div className="flex items-center mt-1 text-sm text-gray-500">
                              <Calendar className="w-4 h-4 mr-1" />
                              {booking.date} à {booking.time}
                              <Clock className="w-4 h-4 ml-3 mr-1" />
                              {booking.duration} min
                            </div>
                            {booking.rating && (
                              <div className="flex items-center mt-2">
                                <span className="text-sm text-gray-600 mr-2">Votre note:</span>
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < booking.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                            Terminé
                          </span>
                          <p className="text-xl font-bold text-gray-800 mt-2">{booking.price}€</p>
                          <div className="flex gap-2 mt-3">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                              <Download className="w-4 h-4 mr-1 inline" />
                              Facture
                            </button>
                            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                              Réserver à nouveau
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
